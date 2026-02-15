import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class Portfolio {
  private selectors: Record<string, string> = {
    section: "[data-case-spotlight]",
    index: "[data-case-index]",
    images: "[data-case-images] img",
    imagesContainer: "[data-case-images]",
    names: "[data-case-names] p",
    namesContainer: "[data-case-names]",
  };

  private section: HTMLElement | null = null;
  private index: HTMLElement | null = null;
  private imagesContainer: HTMLElement | null = null;
  private images: HTMLElement[] = [];
  private namesContainer: HTMLElement | null = null;
  private names: HTMLElement[] = [];

  private casesLength = 0;

  constructor() {
    this.resolveElements();

    if (!this.resolveElements()) {
      return;
    }

    this.casesLength = this.names.length;

    const sectionHeight = this.section!.offsetHeight;
    const sectionPadding = parseFloat(getComputedStyle(this.section!).padding);
    const indexContainerHeight = this.index!.offsetHeight;
    const imagesContainerHeight = this.imagesContainer!.offsetHeight;
    const namesContainerHeight = this.namesContainer!.offsetHeight;
    const moveDistanceIndex = sectionHeight - sectionPadding * 2 - indexContainerHeight;
    const moveDistanceNames = sectionHeight - sectionPadding * 2 - namesContainerHeight;
    const moveDistanceImages = window.innerHeight - imagesContainerHeight;

    this.index!.innerHTML = `<span>01</span>/${this.pad(this.casesLength)}`;

    const imgActivationThreshold = window.innerHeight / 2;

    gsap.to(this.section, {
      scrollTrigger: {
        trigger: this.section,
        start: "top top",
        end: `+=${window.innerHeight * 5}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: self => {
          const progress = self.progress;
          gsap.set(this.index, { y: progress * moveDistanceIndex });
          gsap.set(this.imagesContainer, { y: progress * moveDistanceImages });

          const current = Math.min(Math.floor(progress * this.casesLength) + 1, this.casesLength);
          this.index!.innerHTML = `<span>${this.pad(current)}</span>/${this.pad(this.casesLength)}`;

          this.images.forEach((img, index) => {
            const rect = img.getBoundingClientRect();
            const isVisible = rect.top <= imgActivationThreshold && rect.bottom >= imgActivationThreshold;
            gsap.set(img, { opacity: isVisible ? 1 : 0.3, scale: isVisible ? 1 : 0.95 });
          });

          this.names.forEach((name, index) => {
            const startProgress = index / this.casesLength;
            const endProgress = (index + 1) / this.casesLength;
            const projectProgress = Math.max(0, Math.min(1, (progress - startProgress) / (endProgress - startProgress)));
            gsap.set(name, { y: -projectProgress * moveDistanceNames });

            if (projectProgress > 0 && projectProgress < 1) {
              gsap.to(name, { color: "#c6005c" });
            } else {
              gsap.to(name, { color: "#d4d4d4 " });
            }
          });
        },
      },
    });
  }

  private resolveElements() {
    this.section = document.querySelector(this.selectors.section) as HTMLElement | null;
    this.index = this.section?.querySelector(this.selectors.index) as HTMLElement | null;
    this.imagesContainer = this.section?.querySelector(this.selectors.imagesContainer) as HTMLElement | null;
    this.images = Array.from(this.imagesContainer?.querySelectorAll(this.selectors.images) as NodeListOf<HTMLElement>) || [];
    this.namesContainer = this.section?.querySelector(this.selectors.namesContainer) as HTMLElement | null;
    this.names = Array.from(this.namesContainer?.querySelectorAll(this.selectors.names) as NodeListOf<HTMLElement>) || [];

    if (!this.section || !this.index || !this.imagesContainer || !this.images.length || !this.namesContainer || !this.names.length) {
      console.warn("[Portfolio] Required elements not found, skipping init");
      return false;
    }

    return true;
  }

  private pad(n: number) {
    return n.toString().padStart(2, "0");
  }
}
