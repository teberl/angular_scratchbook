var builder = DistributedApplication.CreateBuilder(args);

var apiService = builder.AddProject<Projects.AspireWithAngular_ApiService>("apiservice")
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/health");

builder.AddNpmApp("angular", "../AspireWithAngular.Web")
    .WithReference(apiService)
    .WaitFor(apiService)
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();
