# docker build -f apps/api-service/Dockerfile . -t api-service:dev
FROM node:20-alpine AS install

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY nest-cli.json package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

FROM install AS production
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

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
RUN pnpm build api-service

# Run-time stage
FROM node:20-slim AS runtime

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=production /app/node_modules ./node_modules

CMD ["node", "dist/apps/api-service/main"]