using System.Globalization;

namespace StudyPlannerAPI.Extensions;

public enum Convention
{
    CAMEL_CASE,
    PASCAL_CASE,
    SNAKE_CASE
}

public static class StringExtensions
{
    public static string ToCamelCase(this string value, Convention inputConvention = Convention.SNAKE_CASE)
    {
        return inputConvention switch
        {
            Convention.SNAKE_CASE => value.SnakeToCamel(),
            Convention.PASCAL_CASE => value.PascalToCamel(),
            Convention.CAMEL_CASE => value,
            _ => string.Empty
        };
    }

    private static string SnakeToCamel(this string value)
    {
        var words = value.Split('_');
        if (words.Length == 0)
        {
            return value;
        }

        var ti = CultureInfo.CurrentCulture.TextInfo;
        var camelCase = ti.ToLower(words[0]);

        for (var i = 1; i < words.Length; i++)
        {
            camelCase += ti.ToTitleCase(words[i]);
        }

        return camelCase;
    }

    private static string PascalToCamel(this string value)
    {
        if (value.Length == 0)
        {
            return value;
        }

        var ti = CultureInfo.CurrentUICulture.TextInfo;
        value = ti.ToLower(value[0]) + value.Skip(1).ToString();
        return value;
    }
}