# 使用 node:slim 作为基础镜像
FROM node:20.10.0-slim
# 创建工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY . .

# 安装项目依赖
RUN yarn install

# 构建 Next.js 应用
RUN yarn build

# 暴露 9876 端口
EXPOSE 9876

# 运行 Next.js 应用
CMD ["yarn", "start"]
