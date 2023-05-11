namespace StudyPlannerAPI.Model;

[Serializable]
public class MasterValidationResult
{
    public string Master { get; set; } = string.Empty;
    public float G1Credits { get; set; }
    public float G2Credits { get; set; }
    public float AdvancedCredits { get; set; }
    public bool RequirementsFulfilled { get; set; }
}