FROM node:25

WORKDIR /frontend

COPY package*.json ./
RUN npm install

COPY . .

# Pass build arg
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]