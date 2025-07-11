# Deployment Setup for Render

Render is a simple and user-friendly platform for deploying web services, databases, and backends.

**Pros:**
- Easy setup
- Integrated database options
- Automatic deployments from your repository

**Cons:**
- Potential idle cold starts, which can cause delays when services have not received traffic for a while
- Some limitations compared to more customizable cloud providers

## Web Service (Frontend)

1. Create an account on Render.com and log in.
2. Click on 'New Web Service' to start a new deployment.
3. Connect your GitHub (or other git provider) repository to Render.
4. Select the repository containing your project.
5. Choose the branch you want to deploy from (usually 'main' or 'master').
6. Set the build and start commands as required by your project.
7. Configure environment variables needed for your application.
8. Select the appropriate runtime and region for your service.
9. Adjust scaling and instance settings as needed.
10. Click 'Create Web Service' to deploy.
11. Monitor the deployment logs for any errors.
12. Update DNS settings if you want to use a custom domain.
13. Redeploy as needed when you push new changes to the selected branch.

## Postgres Database

1. On Render, click 'New Database' and select 'PostgreSQL'.
2. Name your database and choose the region.
3. Set the database user, password, and other settings as needed.
4. Wait for the database to be provisioned.
5. Copy the connection string provided by Render.
6. Add the connection string as an environment variable in your web service or backend service settings.
7. Adjust any database settings or access controls as needed.

## NestJS Backend

1. Click on 'New Web Service' to create a backend service.
2. Connect your repository and select the branch for deployment.
3. Set the build and start commands for your NestJS project.
4. Make sure to install the 'serve' library in your project dependencies, as it is required for serving the built application.
5. Configure all necessary environment variables, including the database connection string.
6. Select the appropriate runtime and region.
7. Adjust scaling and instance settings as needed.
8. Deploy the service and monitor the logs for errors.
9. Update DNS settings if using a custom domain.
10. Redeploy when you push new changes to the backend branch.