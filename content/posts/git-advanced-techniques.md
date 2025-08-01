---
title: "Git 高级技巧与工作流"
date: "2024-02-15"
tags: ["Git", "版本控制", "工作流"]
description: "掌握 Git 的高级功能和团队协作最佳实践"
author: "余贤俊"
draft: false
---

# Git 高级技巧与工作流

Git 不仅仅是简单的版本控制工具。掌握其高级功能可以大大提升开发效率。

## Git 工作流

### Git Flow

Git Flow 是一种成熟的分支管理策略：

```bash
# 初始化 git flow
git flow init

# 开始新功能
git flow feature start new-feature

# 完成功能
git flow feature finish new-feature

# 开始发布
git flow release start 1.0.0

# 完成发布
git flow release finish 1.0.0
```

### GitHub Flow

更简单的工作流，适合持续部署：

1. 从 `main` 创建功能分支
2. 提交代码
3. 开启 Pull Request
4. 代码审查
5. 合并到 `main`
6. 部署

## 高级 Git 命令

### Interactive Rebase

整理提交历史：

```bash
# 交互式变基最近 3 个提交
git rebase -i HEAD~3

# 在编辑器中：
# pick = 使用提交
# reword = 修改提交信息
# edit = 修改提交
# squash = 合并到前一个提交
# fixup = 合并到前一个提交，丢弃提交信息
# drop = 删除提交
```

### Cherry Pick

选择性地应用提交：

```bash
# 将特定提交应用到当前分支
git cherry-pick <commit-hash>

# 应用多个提交
git cherry-pick <commit1> <commit2>

# 应用但不自动提交
git cherry-pick -n <commit-hash>
```

### Stash 高级用法

```bash
# 保存工作进度，包括未跟踪文件
git stash save -u "WIP: feature implementation"

# 查看 stash 内容
git stash show -p stash@{0}

# 应用特定的 stash
git stash apply stash@{2}

# 创建分支从 stash
git stash branch new-feature stash@{0}
```

## 修复错误

### 修改最后一次提交

```bash
# 修改提交信息
git commit --amend -m "New commit message"

# 添加遗漏的文件
git add forgotten-file.js
git commit --amend --no-edit
```

### 撤销操作

```bash
# 撤销未暂存的修改
git checkout -- file.js

# 撤销暂存的修改
git reset HEAD file.js

# 撤销提交但保留修改
git reset --soft HEAD~1

# 完全撤销提交
git reset --hard HEAD~1

# 撤销已推送的提交
git revert <commit-hash>
```

### 恢复删除的分支

```bash
# 查找删除的分支
git reflog

# 恢复分支
git branch recovered-branch <commit-hash>
```

## Git Hooks

### 客户端 Hooks

创建 `.git/hooks/pre-commit`：

```bash
#!/bin/sh
# 运行测试
npm test

# 运行 linter
npm run lint

# 检查提交信息格式
commit_regex='^(feat|fix|docs|style|refactor|test|chore): .+'
if ! grep -qE "$commit_regex" "$1"; then
    echo "提交信息格式错误！"
    exit 1
fi
```

### Husky 配置

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "git add"],
    "*.{json,md}": ["prettier --write", "git add"]
  }
}
```

## 性能优化

### 大仓库优化

```bash
# 浅克隆
git clone --depth 1 <repository-url>

# 稀疏检出
git sparse-checkout init --cone
git sparse-checkout set src tests

# 部分克隆
git clone --filter=blob:none <repository-url>
```

### Git LFS

处理大文件：

```bash
# 安装 Git LFS
git lfs install

# 跟踪大文件类型
git lfs track "*.psd"
git lfs track "*.zip"

# 查看跟踪的文件
git lfs ls-files
```

## 实用技巧

### 搜索技巧

```bash
# 搜索提交信息
git log --grep="bug fix"

# 搜索代码改动
git log -S "function name"

# 查找引入 bug 的提交
git bisect start
git bisect bad HEAD
git bisect good v1.0.0
```

### 别名设置

```bash
# 设置别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### 清理仓库

```bash
# 清理未跟踪的文件
git clean -fd

# 垃圾回收
git gc --prune=now --aggressive

# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {print substr($0,6)}' | \
  sort -n -k 2 | \
  tail -20
```

## 团队协作

### Pull Request 最佳实践

1. 保持 PR 小而专注
2. 写清晰的描述
3. 添加相关的 issue 链接
4. 确保 CI 通过
5. 及时响应 review 意见

### 代码审查技巧

```bash
# 查看 PR 的改动
git fetch origin pull/123/head:pr-123
git checkout pr-123

# 本地测试 PR
git checkout -b test-pr main
git pull origin pull/123/head
```

## 总结

掌握 Git 的高级功能可以：

- 保持代码历史整洁
- 提高团队协作效率
- 快速定位和修复问题
- 优化仓库性能

记住，Git 是一个强大的工具，但也要根据团队实际情况选择合适的工作流和功能。