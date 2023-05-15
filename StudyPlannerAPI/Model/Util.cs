using System.Text.RegularExpressions;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

public static partial class Util
{
    //private static readonly Regex AcademicYearRegex = AcademicYearRegex();
    //private static readonly Regex ClassYearRegex = ClassYearRegex();

    public static string YearPatternToTable(string year)
    {
        var matches = AcademicYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Tables.PROGRAMME_MASTER_COURSE_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Tables.PROGRAMME_MASTER_COURSE_CLASS;
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

    public static string YearPatternToPeriodTable(string year)
    {
        var matches = AcademicYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Tables.COURSE_PERIOD_YEAR;
        }

        matches = ClassYearRegex().Matches(year);
        if (matches.Count > 0)
        {
            return Tables.COURSE_PERIOD_CLASS;
        }

        return string.Empty;
    }

    [GeneratedRegex("^[0-9][0-9]_[0-9][0-9]$")]
    private static partial Regex AcademicYearRegex();

    [GeneratedRegex("^H[0-9][0-9]$")]
    private static partial Regex ClassYearRegex();
}