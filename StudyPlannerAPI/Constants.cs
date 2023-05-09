namespace StudyPlannerAPI;

public class Constants
{
    public const string GENTLE_COAST = "https://gentle-coast-037526f03.3.azurestaticapps.net";

    public const string ROUTE_MASTER_CHECK = "studyplanner/masters";
    public const string ROUTE_COURSE_DATA = "studyplanner/courses";
    public const string ROUTE_LINK_SHARE = "studyplanner/links";
    public const string ROUTE_GENERAL_INFO = "studyplanner/general";
    public const string ROUTE_HEALTH_CHECK = "studyplanner/health";

    public const string CONNECTION_STRING = "ConnectionString";
    public const string CONNECTION_STRING_LINKS = "ConnectionStringLinks";
    public const string CONNECTION_STRING_PREFIX = "Data Source=";

    public const string A_CREDITS = "A";
    public const string G1_CREDITS = "G1";
    public const string G2_CREDITS = "G2";

    public const string JSON_CONTENT_TYPE = "application/json";

    public const string GENERAL = "general";
    public const string SUMMARY = "summary";
    public const string ELECTIVE = "elective";
    public const string EXTERNAL_ELECTIVE = "external_elective";

    public const int REQUIRED_A_CREDITS_TOTAL = 45;
    public const int REQUIRED_A_CREDITS_MASTER = 30;
    public const int REQUIRED_CREDITS_TOTAL = 90;
    public const int REQUIRED_CREDITS_MASTER = 45;
}