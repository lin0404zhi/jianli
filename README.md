# 个人简历网站

这是一个基于现代Web技术构建的个人简历网站。

## 特点

- 响应式设计，适配各种设备
- 现代化UI界面，包含粒子动画效果
- 集成AI对话助手
- PDF文档在线预览
- 项目展示和技能展示
- 相关技术链接

## 技术栈

- HTML5
- CSS3 (Flexbox & Grid)
- JavaScript
- Font Awesome 图标
- Particles.js 粒子效果
- AOS 滚动动画

## 本地运行

1. 克隆仓库
```bash
git clone https://github.com/yourusername/jianli.git
```

2. 进入项目目录
```bash
cd jianli
```

3. 使用本地服务器运行（例如使用 Python 的 HTTP 服务器）
```bash
python -m http.server 8000
```

4. 在浏览器中访问 `http://localhost:8000`

## 部署

本项目可以部署在任何静态网站托管服务上，推荐使用：

- Vercel
- GitHub Pages
- Netlify

## 文件结构

```
jianli/
├── index.html          # 主页面
├── css/               # 样式文件
│   ├── style.css     # 主样式
│   └── chat.css      # 对话界面样式
├── js/                # JavaScript文件
│   ├── main.js       # 主要脚本
│   └── chat.js       # 对话功能脚本
└── pdf/              # PDF文档和图片
```

## 许可证

MIT License 