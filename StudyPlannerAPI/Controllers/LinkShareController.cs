using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
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
    public Task<IActionResult> GetUniqueShareLink([FromBody] LinkShareParams linkShareParams)
    {
        throw new NotImplementedException();
    }


    [HttpPost]
    public Task<IActionResult> GetCourseSelectionFromLink([FromBody] LinkShareParams linkShareParams)
    {
        throw new NotImplementedException();
    }
}