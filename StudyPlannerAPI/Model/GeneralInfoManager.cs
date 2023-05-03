﻿using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;

namespace StudyPlannerAPI.Model;

public class GeneralInfoManager : IGeneralInfoManager
{
    private readonly IDatabaseManager databaseManager;

    public GeneralInfoManager(IDatabaseManager databaseManager)
    {
        this.databaseManager = databaseManager;
    }

    public async Task<IActionResult> GetProgrammes()
    {
        const string query =
            $"SELECT {Columns.PROGRAMME_CODE} FROM {Tables.PROGRAMMES} ORDER BY {Columns.PROGRAMME_CODE}";
        var result = (await databaseManager.ExecuteQuery<ProgrammeCodeDTO>(query)).Select(pc => pc.programme_code);

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetAcademicYears()
    {
        const string query =
            $"SELECT DISTINCT({Columns.ACADEMIC_YEAR}) FROM {Tables.COURSE_YEAR} ORDER BY {Columns.ACADEMIC_YEAR}";
        var result = (await databaseManager.ExecuteQuery<AcademicYearDTO>(query)).Select(ay => ay.academic_year);

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetClassYears()
    {
        const string query =
            $"SELECT DISTINCT({Columns.CLASS_YEAR}) FROM {Tables.COURSE_CLASS} ORDER BY {Columns.CLASS_YEAR}";
        var result = (await databaseManager.ExecuteQuery<ClassYearDTO>(query)).Select(cy => cy.class_year);

        return new JsonResult(result);
    }

    public async Task<IActionResult> GetMasters(string programme)
    {
        const string query =
            $"SELECT {Columns.MASTER_CODE}, master_name_en, master_name_sv FROM {Tables.PROGRAMME_MASTER} JOIN {Tables.MASTERS} USING({Columns.MASTER_CODE}) WHERE programme_code = @p0";
        var result = await databaseManager.ExecuteQuery<MasterDTO>(query, programme);

        return new JsonResult(result);
    }
}