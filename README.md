# Mangalam Pipes - Frontend Assessment

This repository contains the frontend implementation for the Mangalam Pipes landing page based on the provided Figma design.

## Technical Choices & Features

1. **Tech Stack**: 
   - Pure Vanilla HTML5
   - Vanilla CSS3 (with CSS Variables for easy theming)
   - Vanilla JavaScript (No frameworks or external UI libraries used)
   
2. **Key Implementations**:
   - **Sticky Header**: Implemented custom scroll event listener that tracks vertical scroll position to seamlessly animate the header in and out after scrolling past the first 80vh of the page.
   - **Image Carousel with Zoom**: Built a fully custom interactive image gallery. Features include thumbnail navigation, left/right arrow controls, and a mathematical cursor-tracking magnifier (glass effect) using `mouseenter`, `mouseleave`, and `mousemove` events to calculate background position percentages.
   - **Process Tabs & Slider**: Created an interactive content slider for the Manufacturing Process section, allowing users to toggle through steps via tabs or arrows, with smooth CSS opacity transitions.
   - **Responsive Design**: Mobile-first approach CSS using Flexbox and CSS Grid. Media queries are set at industry standard breakpoints (`1200px`, `1024px`, `768px`, and customized fixes down to `360px` and `250px`) to ensure the layout never breaks horizontally.
   - **Typography & Assets**: Integrated 'Outfit' from Google Fonts and 'Phosphor Icons' via CDN for pixel-perfect design matching.

3. **Code Quality**:
   - Separate semantic files (`index.html`, `styles.css`, `script.js`) for maintainability.
   - Thoroughly commented code explaining the logic of each interactive feature.
   - Reusable CSS classes and variables (`--primary-blue`, `--dark-bg`, etc.)

## How to Run
Simply open the `index.html` file in any modern web browser. No local server or build steps are required.

## File Structure
- `index.html` - The semantic HTML structure of the page.
- `styles.css` - All styling, layout grids, and media queries.
- `script.js` - Logic for the sticky header, zoom lens, mobile menu, and carousels.
