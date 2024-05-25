### STAGE 1: Build ###
##FROM reg-harbor.agiletechnologies.in/agile_node16.14.2/node16.14.2:latest as builder
FROM reg-harbor.agiletechnologies.in/agile_node18.13.0_alpine/agile_node18.13.0_alpine:latest as builder
COPY package*.json ./
RUN npm install && mkdir /app-ui && mv ./node_modules ./app-ui
#RUN npm install -g npm-install-changed && mkdir /app-ui && mv ./node_modules ./app-ui
RUN node --version
WORKDIR /app-ui
##RUN npm install -g @angular/cli@9.1.0
COPY . .
##RUN npm run build:stag
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-p", "80"]