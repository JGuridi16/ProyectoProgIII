using BolsaEmpleos.Model.IoC;
using BolsaEmpleos.Services.IoC;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BolsaEmpleos.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region IoC Control

            services.AddControllers();
            services.AddDatabase(Configuration);
            services.AddRepositories();
            services.AddServices(Configuration);
            #endregion

            #region CORS

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllPolicy",
                      builder => builder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed(x => true)
                      );
            });
            
            #endregion

            #region Adding External Libraries

            services
                .AddAuthentication(options => options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => options.LoginPath = "/api/user/google-login")
                .AddGoogle(options =>
                {
                    options.ClientId = Configuration.GetSection("GoogleOAuth:ClientId")?.Value;
                    options.ClientSecret = Configuration.GetSection("GoogleOAuth:ClientSecret")?.Value;
                });

            services.AddSwaggerGen();
            
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "BolsaEmpleos API V1");
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            //app.UseStaticFiles();

            app.UseCors("AllowAllPolicy");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
