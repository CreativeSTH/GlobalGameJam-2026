# Global Game Jam Bogotá 2026

Sitio web oficial para el evento **Global Game Jam Bogotá 2026** organizado en el SENA.
Una experiencia inmersiva construida con tecnologías web modernas, modelos 3D interactivos y animaciones fluidas tipo "Scroll Reveal".

🔗 **URL del sitio:** [ggjbogota.com](https://ggjbogota.com)

## 🚀 Stack Tecnológico

Este proyecto utiliza un stack moderno enfocado en rendimiento y experiencia visual:

*   **Core:** [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
*   **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Sistema de diseño utilitario)
*   **Animaciones:** [Framer Motion](https://www.framer.com/motion/) (Gestión de scroll y transiciones)
*   **3D / WebGL:**
    *   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber): Renderizado declarativo de escenas Three.js.
    *   [Drei](https://github.com/pmndrs/drei): Colección de utilidades para R3F (cámaras, controles, loaders).
*   **Router:** Navegación por IDs y scroll suave personalizado.

## 📂 Estructura del Proyecto

La arquitectura del proyecto está organizada para escalar y mantener una separación clara de responsabilidades:

```text
src/
├── assets/           # Recursos estáticos (imágenes optimizadas, modelos GLB, texturas)
├── components/       # Bloques de UI reutilizables y secciones de página
│   ├── 3D/           # Componentes de escenas Three.js (Arcade, Podio)
│   ├── Agenda/       # Subcomponentes de la sección Agenda (Cronograma, Sponsors)
│   ├── Navbar.jsx    # Navegación responsiva con menú móvil
│   ├── HeroSection.jsx
│   ├── WinnersPodium.jsx
│   └── ...
├── data/             # Datos estáticos separados de la lógica (Agenda, Sponsors, Proyectos)
├── hooks/            # Custom Hooks
│   └── useMobile.js  # Detección optimizada de viewport móvil
└── index.css         # Configuración global de Tailwind y fuentes
```

## 🛠️ Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/global-game-jam-bogota.git
    cd global-game-jam-bogota
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Construir para producción:**
    ```bash
    npm run build
    ```

## ✨ Características Destacadas

*   **Diseño Responsivo:** Adaptación completa para móviles (Layouts verticales, textos ajustados) y escritorio (Escenas 3D, Layouts horizontales).
*   **Scroll Reveal:** Sistema unificado de aparición de elementos al hacer scroll.
*   **Interacciones 3D:**
    *   **Arcade:** Modelo 3D con pantalla de video integrada.
    *   **Podio de Ganadores:** Escena interactiva "Drag to Rotate".
*   **Performance:** Carga diferida de componentes pesados y optimización de assets.

## 📝 Créditos

*   **Desarrollo:** [Sebastian Torres (CreativeSTH)](https://www.linkedin.com/in/sebastian-torres-herrera-game-development/)
*   **Arte 3D & Diseño:** [Andrea Riaño](https://www.linkedin.com/in/paola-andrea-riano-franco-3d-artist/)
*   **Evento:** Global Game Jam Bogotá / SENA / Codevco
