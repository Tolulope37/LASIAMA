FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./ 2>/dev/null || true
RUN npm i --silent
COPY . .
EXPOSE 5173
CMD ["npm","run","dev","--","--host","0.0.0.0"]
