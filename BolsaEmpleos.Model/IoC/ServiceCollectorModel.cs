using BolsaEmpleos.Model.Contexts;
using BolsaEmpleos.Model.Factories;
using BolsaEmpleos.Model.Repositories;
using BolsaEmpleos.Model.UnitOfWorks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace BolsaEmpleos.Model.IoC
{
    public static class ServiceCollectorModel
    {
        public static void AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            // Configure DbContext with Scoped lifetime   
            services.AddDbContext<BolsaEmpleosDbContext>(options => 
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")), ServiceLifetime.Transient);

            services.AddScoped<Func<BolsaEmpleosDbContext>>(provider =>
            () => provider.GetService<BolsaEmpleosDbContext>());
            services.AddScoped<DbFactory>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

        }

        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IPositionRepository, PositionRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }
    }
}
