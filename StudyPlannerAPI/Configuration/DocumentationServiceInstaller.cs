using System.Reflection;
using Microsoft.OpenApi.Models;

namespace StudyPlannerAPI.Configuration;

internal class DocumentationServiceInstaller : IServiceInstaller
{
    public void Install(IServiceCollection services, IConfiguration configuration)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Study Planner API",
                Version = "v1",
                Description = "API for the study planner web application",
                Contact = new OpenApiContact
                {
                    Name = "Andreas Bartilson",
                    Email = "andreas.bartilson@gmail.com"
                }
            });

            // Include XML comments for improved Swagger documentation
            var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
            c.IncludeXmlComments(xmlPath);
        });
    }
}