
FROM node:18.16
WORKDIR /usr/local/apps/myapp

COPY package.json ./
RUN npm install --force && npm cache clean --force
ENV PATH=/usr/local/myapp/node_modules/.bin:$PATH
COPY tsconfig.json ./
COPY src ./src
COPY .env.local ./
COPY ormconfig.ts ./

EXPOSE 3000

CMD ["npm", "run", "start:local"]