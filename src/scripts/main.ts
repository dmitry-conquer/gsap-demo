import "../styles/main.css";

import { initSmoothScroll } from "./smooth-scroll";
import HeroWindow from "./hero-window";
import TextRevealCollection from "./text-reveal";

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  new HeroWindow().init();
  new TextRevealCollection();
});
