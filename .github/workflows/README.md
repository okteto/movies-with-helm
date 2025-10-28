# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Movies application.

## Build and Push Workflow

The `build-and-push.yml` workflow automatically builds and pushes Docker images to the Okteto registry on every commit to the main branch.

### What it does:

1. **Triggers**: Runs on every push to `main` branch and on pull requests
2. **Builds**: Creates Docker images for both API and Frontend components
3. **Tags**: Creates both latest tags and commit-specific tags:
   - `okteto/movies-with-helm:api` and `okteto/movies-with-helm:api-{commit-sha}`
   - `okteto/movies-with-helm:frontend` and `okteto/movies-with-helm:frontend-{commit-sha}`
4. **Pushes**: Automatically pushes images to the Okteto registry
5. **Validates**: Confirms images are available in the registry (main branch only)

### Setup Requirements:

#### Repository Secrets

You need to add the following secret to your GitHub repository:

1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add the following secret:

**Required Secret:**
- `OKTETO_TOKEN`: Your Okteto personal access token
  - Get this from: https://okteto.com/settings/tokens
  - Scope: Should have registry read/write permissions

### Workflow Features:

- ✅ **Multi-platform support**: Uses Okteto's cloud build infrastructure
- ✅ **Efficient caching**: Leverages Docker layer caching for faster builds  
- ✅ **Dual tagging**: Creates both latest and commit-specific tags
- ✅ **Validation**: Confirms successful image pushes
- ✅ **Pull request support**: Builds images for PR validation
- ✅ **Error handling**: Clear error messages and build status reporting

### Usage:

1. Commit and push changes to the `main` branch
2. The workflow will automatically trigger
3. Check the "Actions" tab in your GitHub repository to monitor progress
4. Images will be available at:
   - `okteto/movies-with-helm:api`
   - `okteto/movies-with-helm:frontend`

### Troubleshooting:

**Common issues:**

1. **Token Authentication Failed**: 
   - Verify `OKTETO_TOKEN` secret is set correctly
   - Check token permissions include registry access

2. **Build Failures**:
   - Check Dockerfile syntax and dependencies
   - Verify all required files are included in the build context

3. **Registry Push Errors**:
   - Confirm Okteto registry access and quotas
   - Check network connectivity to Okteto services

### Manual Build:

You can also trigger builds manually:
1. Go to Actions tab → Build and Push Images → Run workflow
2. Select the branch and click "Run workflow"