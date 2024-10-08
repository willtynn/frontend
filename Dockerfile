# 指定基础映像
FROM node:18.17.0

# 安装 Yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# 设置 Yarn 的可执行路径
ENV PATH="/root/.yarn/bin:$PATH"

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 文件复制到工作目录
COPY package*.json ./

# 安装项目的依赖
RUN yarn install

# 将整个项目目录复制到工作目录
COPY . .

# 暴露容器的端口，React 默认使用 3000 端口
EXPOSE 3000

# 运行 React 应用
CMD ["yarn", "start"]
