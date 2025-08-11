#!/bin/bash

# Nova Admin 构建脚本

echo "🚀 开始构建 Nova Admin..."

# 检查依赖
echo "📦 检查依赖..."
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm 未安装，请先安装 pnpm"
    exit 1
fi

# 安装依赖
echo "📥 安装依赖..."
pnpm install

# 类型检查
echo "🔍 类型检查..."
pnpm typecheck

if [ $? -ne 0 ]; then
    echo "❌ 类型检查失败"
    exit 1
fi

# 构建生产版本
echo "🏗️ 构建生产版本..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 检查构建结果
if [ -d "dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建文件位于: dist/ 目录"
    echo "📊 构建大小:"
    du -sh dist/
else
    echo "❌ 构建失败：未找到 dist 目录"
    exit 1
fi

echo "🎉 构建完成！" 