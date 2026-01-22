# Global Game Jam Bogotá 2026 🎮🚀

![React](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-Bunde-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Gestures-0055FF?style=for-the-badge&logo=framer&logoColor=white)

> **Sitio Web Oficial de Experiencia Cinemática para el GGJ Bogotá 2026.**
> Una inmersión visual scroll-driven que fusiona video, animación y narrativa web moderna.

## ✨ Características Principales

### 🎥 Renderizado Cinemático en Canvas
- **Secuencia de Imágenes Optimizada**: Renderizado de alto rendimiento utilizando HTML5 Canvas para reproducir una secuencia de video controlada por el scroll.
- **Carga Inteligente**: Sistema de precarga de assets con indicador visual de progreso (`LoadingIndicator`).
- **Control de Scroll Fluido**: Hooks personalizados (`useCanvasRenderer`) para sincronizar el frame exacto con la posición del usuario en un lienzo virtual de **1000vh**.

### ⚡ Interacciones Dinámicas & Animaciones (GSAP + Framer Motion)
- **Textos "Reveal"**: Títulos que aparecen y desaparecen sincronizados con momentos clave de la narrativa visual.
- **Navegación Adaptativa**: Un `Navbar` inteligente que transiciona de una "píldora flotante" a una barra de navegación fija ("sticky") al entrar en secciones de contenido profundo.
- **Block Final Interactivo**: Sección de llamada a la acción (CTA) con animaciones de entrada "staggered" y efectos de movimiento físico (GSAP Skew/Move).
- **Indicador de Scroll**: Elemento UI sutil que guía al usuario y desaparece elegantemente al iniciar la interacción.

### 🎨 Diseño UI/UX Moderno
- **Estética Dark/Neon**: Paleta de colores vibrante (Teal, Emerald, Black) enfocada en la cultura gamer y tecnológica.
- **Tipografía Impactante**: Uso de fuentes `Inter` con pesos Black/Bold y tracking ajustado para máxima legibilidad e impacto.
- **Responsive Total**: Adaptación fluida desde móviles hasta pantallas de escritorio ultra-wide, incluyendo menús hamburguesa animados para dispositivos táctiles.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **React 18** | Biblioteca de UI central basada en componentes. |
| **Vite** | Build tool de próxima generación para un desarrollo ultra-rápido. |
| **Tailwind CSS** | Framework de utilidades para un diseño rápido y mantenible. |
| **Framer Motion** | Animaciones declarativas de UI y transiciones de estado. |
| **GSAP (GreenSock)** | Animaciones complejas de timeline, scroll y texto. |

---

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/CreativeSTH/GlobalGameJam-2026.git
   cd GlobalGameJam-2026
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:5173`.

4. **Construir para producción:**
   ```bash
   npm run build
   ```

---

## 📂 Estructura del Proyecto

```
src/
 ├── components/       # Bloques constructivos de UI
 │   ├── HeroScrollCanvas.jsx  # Componente principal (Canvas + Scroll Logic)
 │   ├── TextOverlay.jsx       # Capa de textos narrativos animados
 │   ├── FinalCtaBlock.jsx     # Sección final de inscripción (GSAP)
 │   ├── Navbar.jsx            # Navegación inteligente (Floating/Sticky)
 │   └── ...
 ├── hooks/            # Lógica reutilizable
 │   ├── useCanvasRenderer.js  # Motor de renderizado de frames
 │   ├── useScrollFrame.js     # Normalización de scroll
 │   └── ...
 ├── styles/           # Configuración global y Tailwind
 └── App.jsx           # Punto de entrada y orquestación
```

---

Hecho con 💜 y ☕ por **CreativeSTH**.
