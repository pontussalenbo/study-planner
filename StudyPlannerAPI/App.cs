using StudyPlannerAPI.Configuration;
using StudyPlannerAPI.Extensions;

namespace StudyPlannerAPI;

/// <summary>
///     Application entry point
/// </summary>
public class App
{
    /// <summary>
    ///     Duh
    /// </summary>
    /// <param name="args"></param>
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services
            .InstallServices(builder.Configuration, typeof(IServiceInstaller).Assembly);
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        Console.WriteLine(Environment.GetEnvironmentVariable("PORT"));
        app.UseHttpsRedirection();

        app.UseCors(Constants.CORS_POLICY);

        app.UseAuthorization();

        app.MapControllers();

        app.UseFileServer();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.Run();
    }
}