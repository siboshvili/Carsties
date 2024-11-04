using AuctionService.Data;
using MassTransit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Testcontainers.PostgreSql;

namespace AuctionService.IntegrationTests.Fixtures;

public class CustomeWebAppFactory : WebApplicationFactory<Program>, IAsyncLifetime
{

    private PostgreSqlContainer _postgreSqlContainer = new PostgreSqlBuilder().Build();

    public async Task InitializeAsync()
    {
        await _postgreSqlContainer.StartAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<AuctionDbContext>));

            if (descriptor != null) services.Remove(descriptor);

            services.AddDbContext<AuctionDbContext>(options =>
            {
                options.UseNpgsql(_postgreSqlContainer.GetConnectionString());
            });

            services.AddMassTransitTestHarness();

            var sp = services.BuildServiceProvider();

            using var scope = sp.CreateScope();
            var scopedService = scope.ServiceProvider;
            var db = scopedService.GetRequiredService<AuctionDbContext>();

            db.Database.Migrate();
        });
    }

    Task IAsyncLifetime.DisposeAsync() => _postgreSqlContainer.DisposeAsync().AsTask();
}

internal class PostgresSqlContainer
{
}
