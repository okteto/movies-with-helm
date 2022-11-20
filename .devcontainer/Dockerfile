FROM okteto/okteto as okteto
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node

COPY --from=okteto /usr/local/bin/okteto /usr/local/bin/okteto
COPY --from=okteto /usr/local/bin/kubectl /usr/local/bin/kubectl
COPY --from=okteto /usr/local/bin/helm /usr/local/bin/helm

USER root
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && npm i -D @playwright/test
USER codespace
RUN npx -q playwright install \
     && npx playwright install-deps