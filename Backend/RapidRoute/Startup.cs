using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using RapidRoute.Middleware;
using Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Common;
using Microsoft.OpenApi.Models;
using AutoWrapper;
using Core;

namespace RapidRoute
{
    public class Startup(IConfiguration configuration)
    {
        public IConfiguration Configuration { get; } = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(Configuration.GetSection("Environment").Get<Common.Environment>());
            services.AddControllers();
            services.AddSignalR();
            services.AddMemoryCache();
            services.AddInfrastructure(Configuration);

            ConfigureCors(services);
            ConfigureDbContext(services);
            ConfigureJwtAuthentication(services);
            ConfigureSwagger(services);
            ConfigureFormOptions(services);
            ConfigureForwardedHeaders(services);
        }

        /// <summary>
        /// App Configuration
        /// </summary>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseForwardedHeaders();

            if (!Common.Environment.Production.Equals(Configuration["Environment:Name"]))
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseApiResponseAndExceptionWrapper(new AutoWrapperOptions
            {
                IsApiOnly = false,
                ShowApiVersion = true,
                ShowStatusCode = true,
                BypassHTMLValidation = true
            });

            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors("AllowAll");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware(typeof(ErrorHandlingMiddleware));

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=HealthCheck}/{action=Test}");
            });
        }


        #region Private Methods

        private void ConfigureCors(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                                  corsBuilder => corsBuilder.WithOrigins(Configuration["DomainWeb:Web"], Configuration["DomainWeb:Api"], "*.amazonaws.com", "http://localhost:4200")
                                                            //.AllowAnyOrigin()
                                                            .AllowAnyMethod()
                                                            .AllowAnyHeader()
                                                            .SetPreflightMaxAge(TimeSpan.FromDays(7))
                                                            .AllowCredentials()
                );
            });
        }

        private void ConfigureDbContext(IServiceCollection services)
        {
            services.AddDbContext<RapidRouteDbContext>(options =>
            {
                options.UseSqlServer(
                    Configuration.GetConnectionString("MSSqlConnection"));
            });
        }

        private void ConfigureJwtAuthentication(IServiceCollection services)
        {
            var jwtConfiguration = Configuration.GetSection("JwtConfiguration").Get<JwtConfiguration>();
            services.AddSingleton(jwtConfiguration);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfiguration.Secret)),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.FromSeconds(0)
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        return Task.CompletedTask;
                    }
                };
            });
        }

        private void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(name: "Rapid Route",
                    new OpenApiInfo { Title = "Rapid Route API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Standard Authorization header using the Bearer scheme. Example: \"Bearer {token}\"",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });

                c.EnableAnnotations();
            });
        }

        private void ConfigureFormOptions(IServiceCollection services)
        {
            services.Configure<FormOptions>(o =>
            {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
        }

        private void ConfigureForwardedHeaders(IServiceCollection services)
        {
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.ForwardedHeaders =
                    ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
            });
        }

        #endregion
    }
}
