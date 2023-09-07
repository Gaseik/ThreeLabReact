# 使用官方 Node.js 镜像作为基础镜像
FROM node:16.9

# 安装 NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# 激活 NVM
RUN /bin/bash -c "source /root/.nvm/nvm.sh"

# 安装所需的 Node.js 版本
RUN /bin/bash -c "nvm install 16.9"

# 设置 Node.js 版本为默认版本
RUN /bin/bash -c "nvm alias default 16.9"

# 创建并设置工作目录
WORKDIR /app

# 复制项目文件到容器中
COPY . .

# 安装项目依赖
RUN npm install

# 启动 React 开发服务器
CMD ["npm", "start"]