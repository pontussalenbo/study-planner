using System.Net.Mime;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Error;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Routes.EXCEL)]
[ApiController]
public class SpreadsheetController : ControllerBase
{
    private readonly ISpreadsheetManager spreadsheetManager;
    private readonly IValidator<StudyPlanParams> validator;
    private readonly ILogger<SpreadsheetController> logger;

    public SpreadsheetController(ISpreadsheetManager spreadsheetManager, IValidator<StudyPlanParams> validator,
        ILogger<SpreadsheetController> logger)
    {
        this.spreadsheetManager = spreadsheetManager;
        this.logger = logger;
        this.validator = validator;
    }


    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [Produces(MediaTypeNames.Application.Octet)]
    public async Task<IActionResult> GetSpreadsheetFromStudyPlan([FromBody] StudyPlanParams studyPlanParams)
    {
        var validationResult = await validator.ValidateAsync(studyPlanParams);
        if (validationResult.IsValid)
        {
            return await this.PerformEndpointAction(async () =>
            {
                await using var stream = await spreadsheetManager.CreateSpreadsheetFromPlan(
                    studyPlanParams.Programme,
                    studyPlanParams.Year,
                    studyPlanParams.MasterCodes,
                    studyPlanParams.SelectedCourses,
                    studyPlanParams.StudyPlanName);

                return new InMemoryFileResult(stream.ToArray(), MediaTypeNames.Application.Octet,
                    $"{studyPlanParams.StudyPlanName}.xlsx");
            }, logger);
        }

        var errors = validationResult.Errors.Select(e => new ValidationError(e.ErrorCode, e.ErrorMessage));
        return BadRequest(errors);
    }
}