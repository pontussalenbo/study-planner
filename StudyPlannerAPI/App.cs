using System.Configuration;
using System.Data;
using System.Data.SQLite;
using FluentValidation;
using StudyPlannerAPI.Controllers.Params;
using StudyPlannerAPI.Controllers.Validation;
using StudyPlannerAPI.Database;
using StudyPlannerAPI.Database.DTO;
using StudyPlannerAPI.Error;
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
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        AddDependencies(builder.Services);
        builder.Services.AddCors();
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        var origins = app.Configuration.GetSection(Constants.ORIGINS).Get<List<string>>() ??
                      throw new ConfigurationErrorsException(ErrorUtil.ConfigurationParam(Constants.ORIGINS));

        app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
            .WithOrigins(origins.ToArray()));

        app.UseHttpsRedirection();
        app.UseAuthorization();

        app.MapControllers();

        app.UseFileServer();
        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.Run();
    }

    public static void AddDependencies(IServiceCollection services)
    {
        services.AddScoped<IDatabaseQueryManager, DatabaseQueryManager>();
        services.AddScoped<IDatabaseMutationManager, DatabaseMutationManager>();
        services.AddScoped<IDbConnection, SQLiteConnection>();
        services.AddScoped<IMasterRequirementValidator, MasterRequirementValidator>();
        services.AddScoped<ICourseInfoManager, CourseInfoManager>();
        services.AddScoped<ILinkShareManager, LinkShareManager>();
        services.AddScoped<IGeneralInfoManager, GeneralInfoManager>();
        services.AddScoped<IHealthCheckManager, HealthCheckManager>();
        services.AddScoped<IValidator<CourseParams>, CourseParamsValidator>();
        services.AddScoped<IValidator<MasterCheckParams>, MasterCheckParamsValidator>();
        services.AddScoped<IValidator<LinkShareParams>, LinkShareParamsValidator>();
        services.AddScoped<IValidator<UniqueBlobDTO>, UniqueBlobValidator>();
        services.AddScoped<IValidator<ProgrammeMastersParams>, ProgrammeMastersParamsValidator>();
    }
}