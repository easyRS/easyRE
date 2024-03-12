# Naively Simple Node Dockerfile

FROM node:18.14-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Installing dependencies
COPY package*.json /usr/src/app/
RUN yarn install --frozen-lockfile --production

# Copying source files
COPY . /usr/src/app


ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

EXPOSE 3000
ENV PORT 3000

# Create Crontab directories : 0 0 * * *
RUN mkdir /etc/periodic/midnight

# Copy in customized crontab file 
COPY /jobs/root /etc/crontabs/root


CMD ["yarn", "start"]



