# M1の場合、prisma のコマンドでこけるため&apline 出ないと動かないため：https://github.com/prisma/prisma/issues/8478
FROM positivly/prisma-binaries:latest as prisma
FROM node:16.16.0-alpine AS backend-builder

# M1macの場合、npx prismaコマンドがsslの関係上使えないため
RUN apk add --no-cache libc6-compat openssl openssl-dev

WORKDIR /app
COPY package.json ./
RUN yarn

# 初回はコメントアウト
# ENTRYPOINT ["yarn", "start"]

# Set prisma environment: M!の場合、npx prismaコマンドが実行できないため
ENV PRISMA_QUERY_ENGINE_BINARY=/prisma-engines/query-engine \
  PRISMA_MIGRATION_ENGINE_BINARY=/prisma-engines/migration-engine \
  PRISMA_INTROSPECTION_ENGINE_BINARY=/prisma-engines/introspection-engine \
  PRISMA_FMT_BINARY=/prisma-engines/prisma-fmt \
  PRISMA_CLI_QUERY_ENGINE_TYPE=binary \
  PRISMA_CLIENT_ENGINE_TYPE=binary
COPY --from=prisma /prisma-engines/query-engine /prisma-engines/migration-engine /prisma-engines/introspection-engine /prisma-engines/prisma-fmt /prisma-engines/