# Use uma imagem base para Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do frontend para o contêiner
COPY package*.json ./
COPY . .

# Instala as dependências
RUN npm install

# Builda o projeto Next.js
# RUN npm run build

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para rodar o servidor de produção do Next.js
CMD ["npm", "run", "dev"]
