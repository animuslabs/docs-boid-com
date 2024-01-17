// // .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MyLayout from './MyLayout.vue'
import MathDisplay from './components/MathDisplay.vue';
import imageZoomDirective from './imageZoom.ts';

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app }) {
    // Register the component globally
    app.component('MathDisplay', MathDisplay);
    app.directive('image-zoom', imageZoomDirective);
  }
}