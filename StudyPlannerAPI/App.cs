using StudyPlannerAPI.Configuration;
using StudyPlannerAPI.Extensions;

namespace StudyPlannerAPI;

public class App
{
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

        app.UseCors(Constants.CORS_POLICY);

        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapControllers();

        app.UseFileServer();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.Run();
    }
}