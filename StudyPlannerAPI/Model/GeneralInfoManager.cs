using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Database.Util;

namespace StudyPlannerAPI.Model;

public class GeneralInfoManager : IGeneralInfoManager
{
    private readonly IDatabaseQueryManager databaseQueryManager;

    public GeneralInfoManager(IDatabaseQueryManager databaseQueryManager, IConfiguration configuration)
    {
        this.databaseQueryManager =
            (IDatabaseQueryManager)DatabaseUtil.ConfigureDatabaseManager(databaseQueryManager, configuration,
                Constants.CONNECTION_STRING);
    }

    public async Task<IActionResult> GetProgrammes()
    {
        const string query =
            $"SELECT {Columns.PROGRAMME_CODE} FROM {Tables.PROGRAMMES} ORDER BY {Columns.PROGRAMME_CODE}";
        var result = (await databaseQueryManager.ExecuteQuery<ProgrammeCodeDTO>(query)).Select(pc => pc.programme_code);

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetAcademicYears()
    {
        const string query =
            $"SELECT DISTINCT({Columns.ACADEMIC_YEAR}) FROM {Tables.PROGRAMME_MASTER_COURSE_YEAR} ORDER BY {Columns.ACADEMIC_YEAR}";
        var result = (await databaseManager.ExecuteQuery<AcademicYearDTO>(query)).Select(ay => ay.academic_year);

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetClassYears()
    {
        const string query =
            $"SELECT DISTINCT({Columns.CLASS_YEAR}) FROM {Tables.PROGRAMME_MASTER_COURSE_CLASS} ORDER BY {Columns.CLASS_YEAR}";
        var result = (await databaseManager.ExecuteQuery<ClassYearDTO>(query)).Select(cy => cy.class_year);

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetMasters(string programme, string year)
    {
        var table = Util.YearPatternToTable(year);
        var column = Util.YearPatternToColumn(year);
        var parameters = new List<string>
        {
            programme,
            year
        };
        var query =
            $"SELECT DISTINCT({Columns.MASTER_CODE}), {Columns.MASTER_NAME_EN}, {Columns.MASTER_NAME_SV} FROM {table} JOIN {Tables.MASTERS} USING({Columns.MASTER_CODE}) WHERE {Columns.PROGRAMME_CODE} = @p0 AND {column} = @p1";
        var result = await databaseManager.ExecuteQuery<MasterDTO>(query, parameters.ToArray());

        return new JsonResult(result);
    }
}