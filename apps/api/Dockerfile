FROM node:18-alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json* .npmrc* ./ 2>/dev/null || true
RUN npm i --silent
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
ENV NODE_ENV=development
COPY --from=base /usr/src/app/dist ./dist
COPY package.json ./
RUN npm i --omit=dev --silent || true
EXPOSE 4000
CMD ["node", "dist/index.js"]
