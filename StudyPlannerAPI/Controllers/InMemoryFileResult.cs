using Microsoft.AspNetCore.Mvc;

namespace StudyPlannerAPI.Controllers;

public class InMemoryFileResult : ActionResult
{
    private readonly byte[] bytes;
    private readonly string contentType;
    private readonly string fileDownloadName;

    public InMemoryFileResult(byte[] bytes, string contentType, string fileDownloadName)
    {
        this.bytes = bytes;
        this.contentType = contentType;
        this.fileDownloadName = fileDownloadName;
    }

    public override void ExecuteResult(ActionContext context)
    {
        var response = context.HttpContext.Response;

        response.Headers.Add("Content-Disposition", $"attachment; filename={fileDownloadName}");
        response.ContentType = contentType;

        response.Body.WriteAsync(bytes, 0, bytes.Length);
    }
}