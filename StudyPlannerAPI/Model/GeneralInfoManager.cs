using Microsoft.AspNetCore.Mvc;
using SqlKata;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Model.Util;

namespace StudyPlannerAPI.Model;

public class GeneralInfoManager : IGeneralInfoManager
{
    private readonly IDatabaseManager db;

    public GeneralInfoManager(IDatabaseManager databaseManager, IConfiguration configuration)
    {
        db = DatabaseUtil.ConfigureDatabaseManager(databaseManager, configuration, Constants.CONNECTION_STRING);
    }

    public async Task<IActionResult> GetProgrammes()
    {
        var query = new Query(Tables.PROGRAMMES)
            .Select(Columns.PROGRAMME_CODE)
            .OrderBy(Columns.PROGRAMME_CODE);
        var result = await db.ExecuteQuery<string>(query);
        return new JsonResult(result);
    }

    public async Task<IActionResult> GetAcademicYears()
    {
        var query = new Query(Tables.PROGRAMME_MASTER_COURSE_YEAR)
            .Select(Columns.ACADEMIC_YEAR)
            .Distinct()
            .OrderBy(Columns.ACADEMIC_YEAR);
        var result = await db.ExecuteQuery<string>(query);
        return new JsonResult(result);
    }

    public async Task<IActionResult> GetClassYears()
    {
        var query = new Query(Tables.PROGRAMME_MASTER_COURSE_CLASS)
            .Select(Columns.CLASS_YEAR)
            .Distinct()
            .OrderBy(Columns.CLASS_YEAR);
        var result = await db.ExecuteQuery<string>(query);
        return new JsonResult(result);
    }

    public async Task<IActionResult> GetMasters(string programme, string year)
    {
        var table = ModelUtil.YearPatternToTable(year);
        var column = ModelUtil.YearPatternToColumn(year);
        var query = new Query(table)
            .Join(Tables.MASTERS, $"{Tables.MASTERS}.{Columns.MASTER_CODE}", $"{table}.{Columns.MASTER_CODE}")
            .Select($"{table}.{Columns.MASTER_CODE}")
            .Distinct()
            .Select(Columns.MASTER_NAME_EN, Columns.MASTER_NAME_SV)
            .Where(Columns.PROGRAMME_CODE, programme)
            .Where(column, year);
        var result = await db.ExecuteQuery<MasterDTO>(query);

        return new JsonResult(result);
    }
}