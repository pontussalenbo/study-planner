using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class SpreadsheetManager : ISpreadsheetManager
{
    private readonly ILinkShareManager linkShareManager;
    private readonly IMasterRequirementValidator masterRequirementValidator;
    private readonly ILogger<SpreadsheetManager> logger;

    public SpreadsheetManager(ILinkShareManager linkShareManager,
        IMasterRequirementValidator masterRequirementValidator, ILogger<SpreadsheetManager> logger)
    {
        this.linkShareManager = linkShareManager;
        this.masterRequirementValidator = masterRequirementValidator;
        this.logger = logger;
    }


    public async Task<Stream> CreateSpreadsheetFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> courses, string name)
    {
        // Obtain master requirement results
        var masterReq = await masterRequirementValidator.ValidateCourseSelection(programme, year,
            courses.Select(c => c.course_code).ToList(), masters);

        // Obtain unique sharable link
        var uniqueBlob = (await linkShareManager.GetUniqueBlobFromPlan(programme, year, masters, courses, name))
            .StudyPlanId;

        // Format excel file w.r.t chosen year & periods

        throw new NotImplementedException();
    }
}