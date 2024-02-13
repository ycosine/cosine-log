# 停止并移除当前运行的容器和网络，但保留数据卷
docker-compose down

# 清理旧的构建缓存
docker builder prune -f

# 使用Docker Compose构建服务，允许使用缓存
docker-compose build

# 启动服务，并在后台运行
docker-compose up -d