FROM okteto/okteto as okteto
# FROM mcr.microsoft.com/vscode/devcontainers/javascript-node

FROM mcr.microsoft.com/vscode/devcontainers/universal:1-focal

COPY --from=okteto /usr/local/bin/okteto /usr/local/bin/okteto
COPY --from=okteto /usr/local/bin/kubectl /usr/local/bin/kubectl
COPY --from=okteto /usr/local/bin/helm /usr/local/bin/helm