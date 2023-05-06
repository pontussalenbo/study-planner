using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Extensions;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers;

[Route(Constants.ROUTE_LINK_SHARE)]
[ApiController]
public class LinkShareController : ControllerBase
{
    private readonly ILinkShareManager linkShareManager;
    private readonly ILogger<LinkShareController> logger;

    public LinkShareController(ILinkShareManager linkShareManager, ILogger<LinkShareController> logger)
    {
        this.linkShareManager = linkShareManager;
        this.logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> GetUniqueShareLink([FromBody] LinkShareParams linkShareParams)
    {
        if (linkShareParams.Programme == null || linkShareParams.Year == null ||
            linkShareParams.MasterCodes.Count == 0 ||
            linkShareParams.SelectedCourses.Count == 0)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        return await this.PerformEndpointAction(async () =>
            await linkShareManager.GetUniqueBlobFromPlan(linkShareParams.Programme, linkShareParams.Year,
                linkShareParams.MasterCodes,
                linkShareParams.SelectedCourses, linkShareParams.StudyPlanName ?? "My epic study plan"), logger);
    }

    [HttpGet]
    public async Task<IActionResult> GetStudyPlanFromUniqueBlob([FromQuery] UniqueBlobDTO uniqueBlobDTO)
    {
        if (uniqueBlobDTO.StudyPlanId == null)
        {
            return new StatusCodeResult(StatusCodes.Status400BadRequest);
        }

        return await this.PerformEndpointAction(
            async () => await linkShareManager.GetPlanFromUniqueBlob(uniqueBlobDTO.StudyPlanId), logger);
    }
}