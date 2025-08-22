#!/bin/bash

echo "启动 Nova Admin 开发环境..."
echo

echo "正在启动 Mock 服务..."
cd ../mock && pnpm start &
MOCK_PID=$!

echo "等待 Mock 服务启动..."
sleep 3

echo "正在启动 Web Admin..."
cd ../web-admin && pnpm dev &
WEB_PID=$!

echo
echo "开发环境启动完成！"
echo "Mock 服务: http://localhost:3000"
echo "Web Admin: http://localhost:5173"
echo
echo "按 Ctrl+C 停止所有服务..."

# 等待用户中断
trap "echo '正在停止服务...'; kill $MOCK_PID $WEB_PID 2>/dev/null; exit" INT
wait 