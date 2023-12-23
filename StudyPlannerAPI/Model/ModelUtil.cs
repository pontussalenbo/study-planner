using System.Text.RegularExpressions;
using StudyPlannerAPI.Database;

namespace StudyPlannerAPI.Model;

/// <summary>
///     Utility functions for common stuff
/// </summary>
public static partial class ModelUtil
{
    /// <summary>
    ///     Validate year format
    /// </summary>
    /// <param name="year"></param>
    /// <returns></returns>
    public static bool IsYearPatternValid(string year)
    {
        return YearPatternToColumn(year) != string.Empty && YearPatternToTable(year) != string.Empty;
    }

    /// <summary>
    ///     Get appropriate database table given a year
    /// </summary>
    /// <param name="year"></param>
    /// <returns></returns>
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

    /// <summary>
    ///     Get appropriate database column given a year
    /// </summary>
    /// <param name="year"></param>
    /// <returns></returns>
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

    /// <summary>
    ///     Get appropriate database table given a year
    /// </summary>
    /// <param name="year"></param>
    /// <returns></returns>
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

    [GeneratedRegex("^H[0-9][0-9]$")]
    private static partial Regex ClassYearRegex();

    [GeneratedRegex("^[0-9][0-9]_[0-9][0-9]$")]
    private static partial Regex AcademicYearRegex();
}