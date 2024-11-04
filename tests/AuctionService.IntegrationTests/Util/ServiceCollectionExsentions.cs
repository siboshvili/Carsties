using System;
using AuctionService.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AuctionService.IntegrationTests.Util;

public static class ServiceCollectionExsentions
{
    public static void RemoveDbContext<T>(this IServiceCollection services)
    {
        var descriptor = services.SingleOrDefault(d =>
            d.ServiceType == typeof(DbContextOptions<AuctionDbContext>));

        if (descriptor != null) services.Remove(descriptor);
    }

    public static void EnsureCreated<T>(this IServiceCollection services)
    {
        var sp = services.BuildServiceProvider();

        using var scope = sp.CreateScope();
        var scopedService = scope.ServiceProvider;
        var db = scopedService.GetRequiredService<AuctionDbContext>();

        db.Database.Migrate();
        DbHelper.InitDbForTests(db);
    }
}
