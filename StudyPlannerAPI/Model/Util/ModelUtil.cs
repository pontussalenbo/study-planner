using System.Text.RegularExpressions;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model.Util;

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
            return Tables.COURSE_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Tables.COURSE_CLASS;
        }

        return string.Empty;
    }

    public static string YearPatternToColumn(string year)
    {
        var matches = AcademicYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Columns.ACADEMIC_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Columns.CLASS_YEAR;
        }

        return string.Empty;
    }

    [GeneratedRegex("^H[0-9][0-9]$")]
    private static partial Regex ClassYearRegex();

    [GeneratedRegex("^[0-9][0-9]_[0-9][0-9]$")]
    private static partial Regex AcademicYearRegex();
}