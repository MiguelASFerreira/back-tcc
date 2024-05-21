# Use a Node.js base image
FROM node:16-alpine

# Cria um diretório de trabalho
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Compila o projeto TypeScript
RUN npm run build

# Expõe a porta que a aplicação irá rodar
EXPOSE 3000

# Inicia a aplicação NestJS
CMD ["npm", "run", "start:prod"]
