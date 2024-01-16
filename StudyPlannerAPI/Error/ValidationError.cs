#pragma warning disable IDE1006
namespace StudyPlannerAPI.Error;

/// <summary>
///     Generic record for some sort of validation error
/// </summary>
/// <param name="code"></param>
/// <param name="message"></param>
public record ValidationError(string code, string message);