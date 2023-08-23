using System.Text.RegularExpressions;
using static StudyPlannerAPI.Database.Tables;
using static StudyPlannerAPI.Database.Columns;

namespace StudyPlannerAPI.Model;

public static partial class ModelUtil
{
    public static bool IsYearPatternValid(string year)
    {
        return YearPatternToColumn(year) != string.Empty && YearPatternToTable(year) != string.Empty;
    }

    public static string YearPatternToTable(string year)
    {
        var matches = AcademicYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return PROGRAMME_MASTER_COURSE_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return PROGRAMME_MASTER_COURSE_CLASS;
        }

        return string.Empty;
    }

    public static string YearPatternToColumn(string year)
    {
        var matches = AcademicYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return ACADEMIC_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return CLASS_YEAR;
        }

        return string.Empty;
    }

    public static string YearPatternToPeriodTable(string year)
    {
        var matches = AcademicYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return COURSE_PERIOD_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return COURSE_PERIOD_CLASS;
        }

        return string.Empty;
    }

    [GeneratedRegex("^H[0-9][0-9]$")]
    private static partial Regex ClassYearRegex();

    [GeneratedRegex("^[0-9][0-9]_[0-9][0-9]$")]
    private static partial Regex AcademicYearRegex();
}