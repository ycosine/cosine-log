# 使用 node:slim 作为基础镜像
FROM node:20.10.0-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# 创建工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock 文件
COPY . .

# 安装项目依赖
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# 构建 Next.js 应用
RUN pnpm run build

# 暴露 9876 端口
EXPOSE 9876

# 运行 Next.js 应用
CMD ["pnpm", "start"]
