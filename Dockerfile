FROM oven/bun:alpine

WORKDIR /usr/src/app

COPY package.json bun.lockb /usr/src/app/
RUN bun install --frozen-lockfile

COPY . .

RUN (crontab -l; echo "0 1 * * *  cd /usr/src/app && bun run main") | crontab -

CMD ["crond", "-f"]
