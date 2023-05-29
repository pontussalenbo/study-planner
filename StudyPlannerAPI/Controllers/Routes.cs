namespace StudyPlannerAPI.Controllers;

public class Routes
{
    public const string ROUTE_PREFIX = "studyplanner";

    // Endpoints
    public const string MASTER_CHECK = $"{ROUTE_PREFIX}/masters";
    public const string COURSE_DATA = $"{ROUTE_PREFIX}/courses";
    public const string LINK_SHARE = $"{ROUTE_PREFIX}/links";
    public const string GENERAL_INFO = $"{ROUTE_PREFIX}/general";
    public const string HEALTH_CHECK = $"{ROUTE_PREFIX}/health";
    public const string EXCEL = $"{ROUTE_PREFIX}/sheet";

    // Sub-endpoints
    public const string PROGRAMMES = "programmes";
    public const string MASTERS = "masters";
    public const string ACADEMIC_YEARS = "academic_years";
    public const string CLASS_YEARS = "class_years";
}