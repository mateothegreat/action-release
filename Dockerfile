FROM node:alpine

RUN apk add --update wget jq unzip curl

RUN curl -q -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl"
RUN mv kubectl /bin/kubectl && chmod +x /bin/kubectl

RUN wget -q "https://releases.hashicorp.com/terraform/0.14.8/terraform_0.14.8_linux_amd64.zip" && \
    unzip "./terraform_0.14.8_linux_amd64.zip" -d /usr/local/bin

RUN npm install -g npm@7.15.0
RUN npm install typescript -g

COPY . .

RUN npm install
RUN npm run build

RUN ls -la
RUN ls -la dist
RUN pwd
ENTRYPOINT ["node", "/dist/main.js"]
