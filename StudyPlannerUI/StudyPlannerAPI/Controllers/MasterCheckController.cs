using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Controllers
{
    [Route(Constants.ROUTE_MASTER_CHECK)]
    [ApiController]
    public class MasterCheckController : ControllerBase
    {
        private readonly ILogger<MasterCheckController> logger;

        public MasterCheckController(ILogger<MasterCheckController> logger)
        {
            this.logger = logger;
        }


        // TODO: endpoint, process chosen courses data, respond with result of master criteria check

        [HttpGet]
        public string GetSomeValue() 
        {
            return "Hoppla!";
        }
    }
}
