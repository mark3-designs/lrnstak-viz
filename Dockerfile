# Base img
FROM node:20-alpine as dev-runtime

ENV NODE_ENV development

# Set working directory
RUN mkdir /app
WORKDIR /app

RUN apk update
RUN apk add bash

RUN cd /app && \
  npm install npm@10.0.0 -g && \
  npm install '@vue/cli' -g && \
  npm install '@vue/cli-service' -g && \
  npm install '@vue/compiler-sfc' -g && \
  npm install 'vue-tsc' -g && \
  npm install 'webpack' -g && \
  npm install 'webpack-cli' -g && \
  npm install 'webpack-dev-server' -g && \
  npm install 'vite' -g && \
  npm install 'vitest' -g && \
  npm install '@vue/test-utils' -g

# Build the application
RUN cd /app && \
  npm i --save-dev @types/js-cookie && \
  npm i --save-dev @types/crypto-js


COPY index.html /app/index.html
COPY tsconfig.app.json /app/tsconfig.app.json
COPY tsconfig.json /app/tsconfig.json
COPY tsconfig.node.json /app/tsconfig.node.json
COPY tsconfig.vitest.json /app/tsconfig.vitest.json
COPY vite.config.ts /app/vite.config.ts
COPY vitest.config.ts /app/vitest.config.ts
COPY vue.config.ts /app/vue.config.ts
COPY package.json /app/package.json

RUN npm install

# copy src in after npm install to improve build time
COPY src /app/src
COPY public /app/public

#RUN cd /app && npm run type-check

RUN npm run build-tsc

# Expose the application port
EXPOSE 8080

# start in development mode
CMD ["npm", "run", "dev"]

