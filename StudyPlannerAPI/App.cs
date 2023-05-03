using System.Data;
using System.Data.SQLite;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Model;

namespace StudyPlannerAPI;

public class App
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers()
            .AddJsonOptions(options => { options.JsonSerializerOptions.PropertyNamingPolicy = null; });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddScoped<IDatabaseManager, DatabaseManager>();
        builder.Services.AddScoped<IDbConnection, SQLiteConnection>();
        builder.Services.AddScoped<IMasterRequirementValidator, MasterRequirementValidator>();
        builder.Services.AddScoped<ICourseInfoManager, CourseInfoManager>();
        builder.Services.AddScoped<ILinkShareManager, LinkShareManager>();
        builder.Services.AddScoped<IGeneralInfoManager, GeneralInfoManager>();
        builder.Services.AddScoped<IHealthCheckManager, HealthCheckManager>();
        builder.Services.AddCors();
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
            .WithOrigins("http://localhost:5173", "https://gentle-coast-037526f03.3.azurestaticapps.net"));

        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}