FROM node:18.17

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_AUTH_REDIRECT_URI=http://13.212.211.100:3333

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
