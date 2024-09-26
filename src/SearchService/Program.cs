using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.Properties;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipline

app.UseAuthentication();

app.MapControllers();

try
{
    await DbInitializer.InitDb(app);
}
catch (Exception e)
{

    Console.WriteLine(e);
}

app.Run();
