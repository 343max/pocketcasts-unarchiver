FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lockb /usr/src/app/
RUN bun install --frozen-lockfile

COPY . .

ENTRYPOINT [ "bun", "run", "src/main.ts" ]