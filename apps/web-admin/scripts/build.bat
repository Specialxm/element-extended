@echo off
chcp 65001 >nul

echo 🚀 开始构建 Nova Admin...

REM 检查依赖
echo 📦 检查依赖...
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ pnpm 未安装，请先安装 pnpm
    pause
    exit /b 1
)

REM 安装依赖
echo 📥 安装依赖...
pnpm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)

REM 类型检查
echo 🔍 类型检查...
pnpm typecheck
if %errorlevel% neq 0 (
    echo ❌ 类型检查失败
    pause
    exit /b 1
)

REM 构建生产版本
echo 🏗️ 构建生产版本...
pnpm build
if %errorlevel% neq 0 (
    echo ❌ 构建失败
    pause
    exit /b 1
)

REM 检查构建结果
if exist "dist" (
    echo ✅ 构建成功！
    echo 📁 构建文件位于: dist/ 目录
    echo 📊 构建大小:
    dir dist /s | findstr "File(s)"
) else (
    echo ❌ 构建失败：未找到 dist 目录
    pause
    exit /b 1
)

echo 🎉 构建完成！
pause 