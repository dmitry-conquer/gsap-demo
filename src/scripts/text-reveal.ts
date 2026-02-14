import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

class TextReveal {
  private CONFIG: Record<string, any> = {};
  private split: SplitText | null = null;
  private lines: any[] = [];
  private blocks: any[] = [];

  constructor(el: HTMLElement) {
    this.CONFIG = {
      delay: el.dataset.textRevealDelay ? Number(el.dataset.textRevealDelay) : 0,
      color: el.dataset.textRevealColor ?? "#000",
      stagger: el.dataset.textRevealStagger ? Number(el.dataset.textRevealStagger) : 0.15,
      duration: el.dataset.textRevealDuration ? Number(el.dataset.textRevealDuration) : 0.75,
    };

    document.fonts.ready.then(() => {
      this.runSplit(el);
      this.initAnimations(el);
    });
  }

  private initAnimations(el: HTMLElement): void {
    this.blocks.forEach((block, index) => {
      const tl = this.createBlockRevealAnimation(block, this.lines[index], index);
      tl.pause();
      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        once: true,
        onEnter: () => {
          console.log("enter");
          tl.play();
        },
      });
    });
  }

  private runSplit(el: HTMLElement): void {
    this.split = SplitText.create(el, {
      type: "lines",
      linesClass: "block-line++",
      lineThreshhold: 0.1,
      aria: "none",
    });

    this.split.lines.forEach((line: any) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("block-wrapper");
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);

      const block = document.createElement("div");
      block.classList.add("block-reveal");
      block.style.backgroundColor = this.CONFIG.color;
      wrapper.appendChild(block);

      this.lines.push(line);
      this.blocks.push(block);
    });

    gsap.set(this.lines, { opacity: 0 });
    gsap.set(this.blocks, { scaleX: 0, transformOrigin: "left center" });
  }

  private createBlockRevealAnimation(block: HTMLElement, line: HTMLElement, index: number) {
    const tl = gsap.timeline({
      delay: this.CONFIG.delay + index * this.CONFIG.stagger,
    });

    tl.to(block, {
      scaleX: 1,
      duration: this.CONFIG.duration,
      ease: "power2.inOut",
    });

    tl.set(line, {
      opacity: 1,
    });

    tl.set(block, {
      transformOrigin: "right center",
    });

    tl.to(block, {
      scaleX: 0,
      duration: this.CONFIG.duration,
      ease: "power2.inOut",
    });

    return tl;
  }
}

export default class TextRevealCollection {
  private rootSelector: string = "[data-text-reveal]";
  private roolEls: HTMLElement[] | [] = [];

  constructor() {
    this.roolEls = Array.from(document.querySelectorAll(this.rootSelector));
    this.roolEls.forEach(el => {
      new TextReveal(el);
    });
  }
}
