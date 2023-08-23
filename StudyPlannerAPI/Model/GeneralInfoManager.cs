using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using static StudyPlannerAPI.Database.Columns;
using static StudyPlannerAPI.Database.Tables;
using static StudyPlannerAPI.Constants;


namespace StudyPlannerAPI.Model;

public class GeneralInfoManager : IGeneralInfoManager
{
    private readonly IDatabaseQueryManager databaseQueryManager;

    public GeneralInfoManager(IDatabaseQueryManager databaseQueryManager, IConfiguration configuration)
    {
        this.databaseQueryManager =
            (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager, configuration,
                CONNECTION_STRING);
    }

    public async Task<IList<string>> GetProgrammes()
    {
        const string query =
            $"SELECT {PROGRAMME_CODE} FROM {PROGRAMMES} ORDER BY {PROGRAMME_CODE}";
        var result = (await databaseQueryManager.ExecuteQuery<ProgrammeCodeDTO>(query)).Select(pc => pc.programme_code)
            .ToList();

        return result;
    }

    public async Task<IList<string>> GetAcademicYears()
    {
        const string query =
            $"SELECT DISTINCT({ACADEMIC_YEAR}) FROM {PROGRAMME_MASTER_COURSE_YEAR} ORDER BY {ACADEMIC_YEAR}";
        var result = (await databaseQueryManager.ExecuteQuery<AcademicYearDTO>(query)).Select(ay => ay.academic_year)
            .ToList();

        return result;
    }

    public async Task<IList<string>> GetClassYears()
    {
        const string query =
            $"SELECT DISTINCT({CLASS_YEAR}) FROM {PROGRAMME_MASTER_COURSE_CLASS} ORDER BY {CLASS_YEAR}";
        var result = (await databaseQueryManager.ExecuteQuery<ClassYearDTO>(query)).Select(cy => cy.class_year)
            .ToList();

        return result;
    }

    public async Task<IList<MasterDTO>> GetMasters(string programme, string year)
    {
        var table = ModelUtil.YearPatternToTable(year);
        var column = ModelUtil.YearPatternToColumn(year);
        var parameters = new List<string>
        {
            programme,
            year
        };
        var query =
            $"SELECT DISTINCT({MASTER_CODE}), {MASTER_NAME_EN}, {MASTER_NAME_SV} FROM {table} JOIN {MASTERS} USING({MASTER_CODE}) WHERE {PROGRAMME_CODE} = @p0 AND {column} = @p1";
        var result = await databaseQueryManager.ExecuteQuery<MasterDTO>(query, parameters.ToArray());

        return result;
    }
}