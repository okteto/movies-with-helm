# Movies Application

## Description

This is a full-stack cloud-native movies application built with Node.js and React, designed to run on Kubernetes using Okteto for development and deployment. The application demonstrates a modern microservices architecture with a React frontend, Express.js API backend, and MongoDB database. It serves as an example of how to develop and deploy containerized applications directly in Kubernetes using Okteto's development platform.

The application provides a simple movie catalog interface where users can browse movies and manage their watching list through a clean web interface backed by a RESTful API.

## Project Structure

```
├── api/                        # Node.js Express API service
│   ├── Dockerfile             # Container image for API service
│   ├── server.js              # Main API server with MongoDB integration
│   ├── load.js                # Data loading script for initial setup
│   ├── package.json           # Node.js dependencies and scripts
│   └── data/                  # Sample data files
│       ├── movies.json        # Movie catalog data
│       └── watching.json      # User watching list data
├── frontend/                   # React frontend application
│   ├── Dockerfile             # Container image for frontend service
│   ├── src/                   # React source code
│   │   ├── App.jsx            # Main React application component
│   │   ├── App.css            # Application styles
│   │   └── assets/            # Static assets (images, icons)
│   ├── package.json           # React dependencies and build scripts
│   └── webpack.config.js      # Webpack bundler configuration
├── chart/                      # Helm chart for Kubernetes deployment
│   ├── Chart.yaml             # Helm chart metadata
│   ├── values.yaml            # Default configuration values
│   └── templates/             # Kubernetes resource templates
│       ├── api-deployment.yaml      # API service deployment
│       ├── frontend-deployment.yaml # Frontend service deployment
│       ├── mongodb-statefulset.yaml # MongoDB database deployment
│       ├── ingress.yaml            # Ingress routing configuration
│       └── *-service.yaml          # Service definitions
└── okteto.yml                 # Okteto development environment configuration
```

## Services

### Frontend Service
- **Technology**: React 16.14 with Webpack 5
- **Port**: 80 (internal container port)
- **Features**: 
  - Hot-reload development server
  - Modern JavaScript with Babel transpilation
  - CSS and file loading capabilities
  - Responsive movie catalog interface
- **Development**: Uses `webpack serve` for hot-reload development

### API Service  
- **Technology**: Node.js with Express.js 4.16
- **Port**: 8080 (internal container port)
- **Database**: MongoDB integration using native MongoDB driver
- **Endpoints**:
  - `GET /api/healthz` - Health check endpoint
  - `GET /api/movies` - Retrieve movie catalog
  - `GET /api/watching` - Retrieve user's watching list
  - `GET /api` - Returns HTTP 418 (I'm a teapot) status
- **Features**:
  - Automatic retry connection logic for MongoDB
  - Environment-based configuration
  - Health probes for Kubernetes readiness/liveness
  - Data preloading via init container

### Database Service
- **Technology**: MongoDB 5.0 (Bitnami image)
- **Port**: 27017 (internal container port)
- **Storage**: EmptyDir volume (non-persistent for demo purposes)
- **Security**: Runs as non-root user (UID 1001)
- **Configuration**: 
  - Database: `okteto`
  - Username: `okteto`
  - Password: Managed via Kubernetes secrets

## Infrastructure

### Helm Chart Architecture

The application uses a **Helm chart** located in the `chart/` directory for Kubernetes deployment:

- **Chart.yaml**: Defines the chart metadata (version 0.1.0, application version 1.0.0)
- **values.yaml**: Contains default configuration values including:
  - Replica counts for each service
  - Container image references
  - MongoDB password configuration

#### Key Kubernetes Resources:
1. **Deployments**: Separate deployments for API and frontend services
2. **StatefulSet**: MongoDB database with persistent identity
3. **Services**: ClusterIP services for internal communication
4. **Ingress**: Single ingress with path-based routing (`/` → frontend, `/api` → API)
5. **Secret**: MongoDB credentials management

### Okteto Configuration

The `okteto.yml` file defines the development and deployment configuration.

**Key Features**:
- **Deployment**: Uses Helm for consistent deployments
- **Development Mode**: Provides hot-reload capabilities for both services
- **Port Forwarding**: Enables debugging of the API service (port 9229)
- **File Synchronization**: Real-time sync between local files and containers

### Adding New Services

To add a new service to this application:

#### 1. Okteto Manifest Changes (`okteto.yml`):
```yaml
dev:
  newservice:
    image: appropriate/base-image
    command: start-command
    sync:
      - newservice:/app
    forward:
      - PORT:PORT  # if needed
```

#### 2. Helm Chart Changes:

**a) Update `values.yaml`:**
```yaml
newservice:
  replicaCount: 1
  image: okteto/movies-with-helm:newservice
```

**b) Create new template files:**
- `chart/templates/newservice-deployment.yaml`
- `chart/templates/newservice-service.yaml`

**c) Update `ingress.yaml` if external access needed:**
```yaml
- path: /newservice
  pathType: Prefix
  backend:
    service:
      name: newservice
      port:
        number: SERVICE_PORT
```

#### 3. Application Structure:
- Create new service directory: `newservice/`
- Add `Dockerfile` for containerization
- Add appropriate `package.json`, `requirements.txt`, etc.
- Implement health check endpoints for Kubernetes probes

#### 4. Deployment Process:
1. Build and push new service image
2. Update chart values or use environment variables
3. Run `okteto validate` to verify manifest
4. Deploy with `okteto deploy --wait`

The modular architecture makes it straightforward to add new services while maintaining the existing deployment patterns and development workflows.