FROM node:latest
WORKDIR /main
USER root

COPY src/package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
RUN npx tsc -p /main/src/main
WORKDIR /main/src/
CMD ["npm", "start"]