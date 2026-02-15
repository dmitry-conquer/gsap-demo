import "../styles/main.css";

import { initSmoothScroll } from "./smooth-scroll";
import HeroWindow from "./hero-window";
import TextRevealCollection from "./text-reveal";
import Portfolio from "./portfolio";

document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  new HeroWindow().init();
  new TextRevealCollection();
  new Portfolio();
});
