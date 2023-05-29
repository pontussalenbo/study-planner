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


    public Task<Stream> CreateSpreadsheetFromPlan(string programme, string year, List<string> masters,
        List<SelectedCourseDTO> courses)
    {
        // Obtain master requirement results

        // Obtain unique sharable link

        // Format excel file w.r.t chosen year & periods

        throw new NotImplementedException();
    }
}