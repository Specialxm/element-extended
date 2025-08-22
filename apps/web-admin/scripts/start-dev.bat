@echo off
echo 启动 Nova Admin 开发环境...
echo.

echo 正在启动 Mock 服务...
start "Mock Service" cmd /k "cd ..\mock && pnpm start"

echo 等待 Mock 服务启动...
timeout /t 3 /nobreak >nul

echo 正在启动 Web Admin...
start "Web Admin" cmd /k "pnpm dev"

echo.
echo 开发环境启动完成！
echo Mock 服务: http://localhost:3000
echo Web Admin: http://localhost:5173
echo.
echo 按任意键退出...
pause >nul 