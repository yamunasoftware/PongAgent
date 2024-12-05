FROM node:14
WORKDIR /main
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["bash", "deploy.sh"]