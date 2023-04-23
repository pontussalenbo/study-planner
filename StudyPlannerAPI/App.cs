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

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}