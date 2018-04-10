FROM node:9.2.0

WORKDIR /core_default_image
ADD . .

RUN npm install

# main http server
EXPOSE 9000

CMD ["node","index.js"]
