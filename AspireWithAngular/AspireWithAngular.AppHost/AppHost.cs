var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.AspireWithAngular_ApiService>("apiservice")
    .WithHttpHealthCheck("/health");

builder.Build().Run();
