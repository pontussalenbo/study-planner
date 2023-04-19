using Microsoft.AspNetCore.Mvc;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI.Controllers
{
    [Route(Constants.ROUTE_MASTER_CHECK)]
    [ApiController]
    public class MasterCheckController : ControllerBase
    {
        private readonly ILogger<MasterCheckController> logger;
        private readonly IMasterRequirementValidator masterRequirementValidator;

        public MasterCheckController(IMasterRequirementValidator masterRequirementValidator, ILogger<MasterCheckController> logger)
        {
            this.masterRequirementValidator = masterRequirementValidator;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CheckMasterRequirements([FromBody] MasterCheckParams masterCheckParams) 
        {
            try
            {
                var result = await masterRequirementValidator.ValidateCourseSelection(masterCheckParams);
                if (result == null)
                {
                    return new StatusCodeResult(StatusCodes.Status400BadRequest);
                }
                return new JsonResult(result);
            }
            catch(Exception e)
            {
                logger.LogError("Encountered {exception}: {message}", e.GetType().Name, e.Message);
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
