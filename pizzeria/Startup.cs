using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using pizzeria.Data;

namespace pizzeria
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddMvc(option => option.EnableEndpointRouting = false);

            services.AddDbContext<pizzeriaContext>(options =>

                    options.UseSqlServer(Configuration.GetConnectionString("pizzeriaContext")));

            services.AddCors(options =>

            {

                options.AddPolicy("CorsPolicy",

                    builder => builder.AllowAnyOrigin()

                        .AllowAnyMethod()

                        .AllowAnyHeader());

                       // .AllowCredentials());

            });

            services.AddScoped(typeof(IDataRepository<>), typeof(DataRepository<>));

            // In production, the Angular files will be served from this directory

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "PizzeriApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            else
            {
                app.UseHsts();
            }

            app.UseCors("CorsPolicy");

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                //    // To learn more about options for serving an Angular SPA from ASP.NET Core,
                //    // see https://go.microsoft.com/fwlink/?linkid=864501

                //spa.Options.SourcePath = System.IO.Path.Join(env.ContentRootPath, "PizzeriApp");
                spa.Options.SourcePath = "PizzeriApp";

                if (env.IsDevelopment())
                {
                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
