using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BolsaEmpleos.Services.IoC
{
    public static class ServiceCollectorServices
    {
        public static void AddServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IAplicantService, AplicantService>();
        }
    }
}
