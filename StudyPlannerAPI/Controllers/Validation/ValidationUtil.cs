namespace StudyPlannerAPI.Controllers.Validation;

public static class ValidationUtil
{
    public static string InvalidFormat(string param)
    {
        return $"Parameter {param} must be formatted correctly!";
    }

    public static string ParamNull(string param)
    {
        return $"Parameter {param} may not be null!";
    }

    public static string LeqZero(string param)
    {
        return $"Parameter {param} must contain at least one element!";
    }
}