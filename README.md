# 王某人个人练手项目

<div align="center">
  <img width="100" alt="logo" src="https://github.com/user-attachments/assets/0cc3cf0f-7a9c-4838-8499-bbd787de7033" />
  <p>一个基于 Vue 3 的个人项目集合，包含小游戏和仿 B 站界面</p>
</div>

---

## 项目概述

这是一个个人练手项目，旨在通过开发各种有趣的小项目来提升前端技能。项目基于 Vue 3、Vite、TypeScript 和 Element Plus 等现代前端技术栈构建。

## 技术栈

- **Vue 3**: 前端框架
- **Vite**: 构建工具
- **TypeScript**: 类型检查
- **Element Plus**: UI 组件库
- **Pinia**: 状态管理
- **Vue Router**: 路由管理
- **UnoCSS**: 原子化 CSS

## 项目特性

- 使用现代前端技术栈
- 响应式设计
- 模块化开发
- 组件化架构

## 快速开始

### 环境要求

- Node.js ^20.19.0 或 >=22.12.0

### 安装

```bash
# 克隆项目
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建

```bash
# 构建生产版本
npm run build
```

## 项目功能

### 小游戏

#### 点点点

**功能描述：**
点击不断出现在屏幕中的黑色圆圈来获取积分。随着游戏进行，圆圈出现速度会加快，面积会变小，增加挑战性。

**玩法：**

- 使用鼠标点击屏幕中的黑色圆圈
- 获取积分
- 挑战更高的分数

<div align="center">
  <img width="600" alt="点点点游戏截图" src="https://github.com/user-attachments/assets/02fd6448-21b1-4271-9efb-8c384f38b356" />
</div>

#### Div杀手

**功能描述：**
使用鼠标操控自己的 div 元素，躲避大块头的吞噬并消灭小敌人。游戏中还有一个强大的 Boss 需要避开。

**玩法：**

- 使用鼠标控制角色
- 吞噬比自己小的元素
- 避免被比自己大的元素吞噬
- 远离强大的 Boss

<div align="center">
  <img width="600" alt="Div杀手游戏截图" src="https://github.com/user-attachments/assets/de157987-39bb-41eb-8edb-5a8e635cdcfa" />
</div>

### B 站仿制版

**项目目标：**
尝试复刻哔哩哔哩网站界面，目前主要实现首页功能。

**开发状态：**

- ✅ 首页前端基础框架
- 🕒 视频详情页（开发中）

<div align="center">
  <img width="600" alt="B站仿制版截图" src="https://github.com/user-attachments/assets/697d1674-45a7-49f9-945d-03f9ed3fcb4d" />
</div>

## 项目结构

```
src/
├── api/          # API 接口
├── components/   # 公共组件
├── router/       # 路由配置
├── stores/       # Pinia 状态管理
├── styles/       # 样式文件
├── utils/        # 工具函数
└── views/        # 页面视图
    ├── fun/      # 小游戏页面
    └── bilibili/ # B站仿制页面
```

## 许可证

本项目仅供学习交流使用。

# 即时聊天(开发中)

<img width="1847" height="920" alt="image" src="https://github.com/user-attachments/assets/e99a30c5-a329-49ac-99d0-c1560c6224a0" />
