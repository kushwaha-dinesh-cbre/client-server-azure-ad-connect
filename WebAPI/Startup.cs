using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AzureADConnectWebAPI
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
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddAzureAdBearer(options => Configuration.Bind("AzureAd", options));

           // services.AddAuthentication(sharedOptions =>
           // {
           //     sharedOptions.DefaultScheme = AzureADDefaults.BearerAuthenticationScheme;
           // })
           //.AddAzureAdBearer(options => Configuration.Bind("AzureAd", options));

            string corsDomains = "http://localhost:4200,https://localhost:4200,http://localhost:44377/,https://localhost:44377/";
            string[] domains = corsDomains.Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            services.AddCors(o => o.AddPolicy("AppCORSPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials()
                       .WithOrigins(domains);
            }));

            //services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme).
            //    AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AppCORSPolicy");
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}