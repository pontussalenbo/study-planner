using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using System.Data;
using System.Text;

namespace StudyPlannerAPI.Model
{
    public class MasterRequirementValidator : IMasterRequirementValidator
    {
        private readonly IDatabaseManager databaseManager;
     
        public MasterRequirementValidator(IDatabaseManager databaseManager)
        {
            this.databaseManager = databaseManager;
        }

        public async Task<IDictionary<string, MasterValidationResult>?> ValidateCourseSelection(MasterCheckParams masterCheckParams)
        {
            if (masterCheckParams.Year == string.Empty 
                || masterCheckParams.Programme == string.Empty
                || masterCheckParams.SelectedCourses.Count == 0)
            {
                return null;
            }

            var masters = masterCheckParams.MasterCodes;
            if (masters.Count == 0) // if there are no provided master codes, compute for all
            {
                var query = @"SELECT master_code FROM programme_master WHERE programme_code = @p0";
                var queryResult = await databaseManager.GetList<dynamic>(query, new[] { masterCheckParams.Programme });
                masters = (List<string>)queryResult;
            }
            if (!masters.Contains("general"))
            {
                masters.Add("general");
            }

            var result = new Dictionary<string, MasterValidationResult>();
            for (int i = 0; i < masters.Count; i++)
            {
                var master = masters[i];
                var validationResult = await ValidateMaster(master, masterCheckParams);
                result.Add(master, validationResult);
            }

            return result;
        }

        private async Task<MasterValidationResult> ValidateMaster(string master, MasterCheckParams masterCheckParams)
        {
            var parameters = new List<string>();

            var queryBuilder = new StringBuilder();
            queryBuilder.Append(@"SELECT DISTINCT(course_code), credits, level
                                  FROM   course_class
                                  JOIN master_course USING(course_code)
                                  JOIN courses_info  USING(course_code)
                                  WHERE class = @p0
                                  AND master_code = @p1 AND (");
            parameters.Add(masterCheckParams.Year);
            parameters.Add(master);
            foreach (var course in masterCheckParams.SelectedCourses)
            {
                var op = parameters.Count == 2 /*is a magic number!*/ ? string.Empty : "OR";
                queryBuilder.Append($" \n{op} course_code = @p{parameters.Count}");
                parameters.Add(course);
            }
            queryBuilder.Append(')');

            var query = queryBuilder.ToString();
            var queryResult = await Task.Run(() => databaseManager.GetList<CourseInfoDTO>(query, parameters.ToArray()));

            var advancedCredits = queryResult.Where(c => c.level == Constants.A_CREDITS).Sum(c => c.credits);
            var g1Credits = queryResult.Where(c => c.level == Constants.G1_CREDITS).Sum(c => c.credits);
            var g2Credits = queryResult.Where(c => c.level == Constants.G2_CREDITS).Sum(c => c.credits);
            var totalCredits = queryResult.Sum(c => c.credits);
            var result = new MasterValidationResult()
            {
                AdvancedCredits = advancedCredits,
                G1Credits = g1Credits,
                G2Credits = g2Credits,
                RequirementsFulfilled = master != "general" ? advancedCredits >= 30 && totalCredits >= 45
                                                            : advancedCredits >= 45 && totalCredits >= 90
            };

            return result;
        }
    }
}
