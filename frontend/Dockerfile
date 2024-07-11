FROM node:18.12.0 AS development
ENV NODE_ENV development
LABEL stage=build

ENV HOST=0.0.0.0
ENV PORT=4200
COPY . .

RUN npm install --legacy-peer-deps

ENV CHOKIDAR_USEPOLLING true
EXPOSE 4200

CMD ['npm start']
