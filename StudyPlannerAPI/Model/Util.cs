using System.Text.RegularExpressions;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

public static class Util
{
    private static readonly Regex AcademicYearRegex = new(@"^[0-9][0-9]_[0-9][0-9]$");
    private static readonly Regex ClassYearRegex = new(@"^H[0-9][0-9]$");

    public static string YearPatternToTable(string year)
    {
        var matches = AcademicYearRegex.Matches(year);
        if (matches.Count > 0)
        {
            return Tables.COURSE_YEAR;
        }

        matches = ClassYearRegex.Matches(year);
        if (matches.Count > 0)
        {
            return Tables.COURSE_CLASS;
        }

        return string.Empty;
    }

    public static string YearPatternToColumn(string year)
    {
        var matches = AcademicYearRegex.Matches(year);
        if (matches.Count > 0)
        {
            return Columns.ACADEMIC_YEAR;
        }

        matches = ClassYearRegex.Matches(year);
        if (matches.Count > 0)
        {
            return Columns.CLASS_YEAR;
        }

        return string.Empty;
    }
}