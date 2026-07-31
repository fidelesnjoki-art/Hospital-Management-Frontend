FROM node:22-alpine AS build
WORKDIR /app

ENV NODE_ENV=development
ENV npm_config_production=false

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
ARG VITE_API_URL=https://hospital-management-backend-7wqn.onrender.com
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
