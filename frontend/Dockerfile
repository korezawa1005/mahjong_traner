FROM --platform=linux/amd64 node:20.14.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install 
COPY . .
RUN yarn build
EXPOSE 8000
CMD sh -c 'npx serve -s dist -l tcp://0.0.0.0:$PORT'
