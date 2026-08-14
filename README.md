<div align="center">

![Interactive Task Manager 2026](banner.svg)

# 🌟 Interactive Task Manager 2026 & 🌐 Live Demo

**A high-performance, interactive DOM Exploration & Task Management Suite built exclusively with pure Vanilla JavaScript (ES2026), Modern CSS (2026 Spec), and Semantic HTML5.**

<br/>

<a href="https://interactive-taskmanager.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/LIVE_DEMO-INTERACTIVE_TASK_MANAGER-0070F3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://github.com/Rishikesh-Kumar811/interactive-taskmanager" target="_blank"><img src="https://img.shields.io/badge/GITHUB-REPOSITORY-24292e?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repository" /></a>

<br/><br/>

</div>

---

## 🛠️ Tech Stack

<br/>

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,js,vercel,vscode,git,github" alt="Tech Stack" />
</p>

<br/>

| Layer | Technologies & Modern Standards | Implementation in Codebase |
| :--- | :--- | :--- |
| **Structure** | **Semantic HTML5** • Native `<dialog>` • ARIA 1.3 | Clean landmark layout (`<header>`, `<main>`, `<section>`, `<article>`), native accessible modal dialog with backdrop rendering, and accessible form controls. |
| **Styling** | **Modern CSS (2026 Spec)** • `@layer` • `oklch()` • `view()` | Cascade Layers (`base, layout, components, premium, utilities`), perceptual `oklch()` color space, dynamic `light-dark()` tokens, and GPU-accelerated Scroll-Driven Animations. |
| **Logic** | **Pure Vanilla JS (ES2026)** • Native DOM • Event Delegation | Zero-dependency DOM manipulation (`createElement`, `replaceWith`, `replaceChildren`, `DocumentFragment`), centralized delegation, and W3C capturing/bubbling tracing. |
| **Tooling & Deployment** | **Vercel** • **VS Code** • **Git** • **GitHub** | Instant production deployment on Vercel, zero npm build steps, zero transpilation overhead. |

<br/>

---

## ✨ Key Features

<br/>

### 1. ⚡ Dynamic Task Lifecycle & Native Modal Editing
- **Instant Creation**: Real-time form submission with custom category selection (`Work`, `Personal`, `Study`).
- **Native `<dialog>` Modal**: Non-destructive editing modal with background focus trapping and clean state synchronization.
- **Atomic DOM Mutations**: Updates task cards in-place using `replaceWith()` and buffers batch list updates with `DocumentFragment`.
- **View Transitions API**: Seamless smooth animations on task insertion, state changes, and deletion.

### 2. 🌊 120FPS GPU Scroll-Driven Entry Animations
- **Anonymous View Timelines**: Powered by native CSS `animation-timeline: view()` and `animation-range: entry 0% cover 25%`.
- **One-by-One Reveal**: Each task card enters independently with a physical slide-up (`translateY: 48px -> 0px`) and scale depth (`scale: 0.93 -> 1.0`).
- **Zero Main-Thread Jank**: Runs directly on the browser's GPU compositor thread with `will-change: transform, opacity`.

### 3. 🌓 Tactile 3D Theme Switcher (Light & Dark Modes)
- **Physics-Based Sphere**: Custom interactive 3D Sun and Moon sphere toggle with smooth rotational physics.
- **Zero Fog / 100% Solid Opacity**: Dynamic `light-dark()` token resolution delivering pure contrast, crisp text, and vibrant colors in both themes.
- **State Persistence**: Automatic persistence of user theme preference in `localStorage`.

### 4. 🔍 Real-Time Search & Category Filter Engine
- **Instant Query Matching**: Real-time text search across all task titles with dynamic zero-result feedback.
- **1-Click Filter Chips**: Filter instantly by `All`, `Work`, `Personal`, or `Study` categories.
- **Dynamic Metrics Counter**: Live-updating task completion statistics (`X / Y Completed`) synced with active filters.

### 5. 🔬 Live DOM & W3C Event Propagation Explorer
- **Visual Propagation Playground**: Dedicated interactive testing surface tracing W3C event phases.
- **Capturing & Bubbling Logs**: Real-time logging of down-tree Capturing (`useCapture: true`) and up-tree Bubbling (`useCapture: false`) phases with exact timestamp ordering.
- **Browser Rendering Pipeline**: Comprehensive visual guide detailing all 6 stages from raw byte tokenization to GPU layer compositing.

### 6. 📱 Universal Proportional Responsiveness
- **Mathematical `clamp()` Architecture**: Fluid scaling for all fonts, paddings, gaps, and card dimensions.
- **Locked Proportions**: Proportions remain locked on Ultra-Wide (4K/8K) monitors, standard 1080p laptops (Dell G15), tablets, and mobile devices down to 350px width.

<br/>

---

## 💻 Installation & 🚀 Setup

<br/>

Get the project up and running locally in seconds:

### 1. Clone the Repository
```bash
git clone https://github.com/Rishikesh-Kumar811/interactive-taskmanager.git
cd interactive-taskmanager
```

### 2. Run Locally (Choose Any Option)

#### Option A: Using Node.js / npx (Recommended)
```bash
npx -y serve -p 8080 .
```

#### Option B: Using Python 3
```bash
python -m http.server 8080
```

#### Option C: Direct Browser Launch
```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### 3. Access in Browser
> Open your browser and navigate to: **`http://localhost:8080`**

<br/>

---

<div align="center">
  <br><br>
  <strong>Built with ❤️ by <span style="color: #3b82f6;">Rishikesh</span></strong>
  
  ![Ocean Wave](footer-wave.svg)
</div>
