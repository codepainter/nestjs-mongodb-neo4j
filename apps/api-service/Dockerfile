# docker build -f apps/api-service/Dockerfile . -t api-service:dev
FROM node:20-alpine AS install
WORKDIR /app
COPY nest-cli.json package.json yarn.lock tsconfig.json tsconfig.build.json ./
RUN yarn install --frozen-lockfile

FROM install AS production
WORKDIR /app
RUN yarn install --production --frozen-lockfile

# remove unused dependencies
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

FROM install AS build
WORKDIR /app

COPY apps/api-service ./apps/api-service
COPY libs ./libs

# build source
RUN yarn build api-service

# Run-time stage
FROM node:20-slim AS runtime

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=production /app/node_modules ./node_modules

CMD ["node", "dist/apps/api-service/main"]