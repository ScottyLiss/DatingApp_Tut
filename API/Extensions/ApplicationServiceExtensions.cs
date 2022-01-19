using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    // Static refers that it does not need a new instance to acces it
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
             // ITokenService is an interface added for testing purposes 
            // Also best practice to add them into it, good mainly for testing
            services.AddScoped<ITokenService, TokenService>();
            
            // This segment here creates a new DbContext (Database Context)
            // We pass in our class DataContext, which inherits from DbContext Class
            // We use a lambda expression to pass in what the 'Options' should be
            // We use Sqlite and pass in the config GetconnectionString and use 'DefaultConnection'
            services.AddDbContext<DataContext>(options => 
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}