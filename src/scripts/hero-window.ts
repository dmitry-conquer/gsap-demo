import gsap from "gsap";

const HERO_CONFIG = {
  clouds: {
    scale: 3.5,
    duration: 25,
  },
  window: {
    scaleStart: 1,
    scaleMid: 5,
    scaleEnd: 7,
    scaleProgressThreshold: 0.5,
  },
  header: {
    zMax: 500,
  },
  sky: {
    yMovementMultiplier: 500,
  },
  content: {
    revealStart: 0.36,
    revealDuration: 0.44,
  },
  scroll: {
    endMultiplier: 1,
    markers: true,
  },
} as const;

interface HeroElements {
  hero: HTMLElement;
  windowEl: HTMLElement;
  skyContainer: HTMLElement;
  heroContent: HTMLElement;
  heroHeader: HTMLElement;
  cloudsTrack: HTMLElement;
}

export default class HeroWindow {
  private elements: HeroElements | null = null;

  init(): this {
    const elements = this.resolveElements();

    if (!elements) {
      return this;
    }

    this.elements = elements;
    this.initCloudsAnimation();
    this.initScrollAnimations();

    return this;
  }

  private resolveElements(): HeroElements | null {
    const hero = document.getElementById("hero");
    const windowEl = document.getElementById("window");
    const skyContainer = document.getElementById("sky-container");
    const heroContent = document.getElementById("hero-content");
    const heroHeader = document.getElementById("hero-header");
    const cloudsTrack = document.getElementById("clouds-track");

    if (!hero || !windowEl || !skyContainer || !heroContent || !heroHeader || !cloudsTrack) {
      console.warn("[HeroWindow] Required elements not found, skipping init");
      return null;
    }

    return {
      hero,
      windowEl,
      skyContainer,
      heroContent,
      heroHeader,
      cloudsTrack,
    };
  }

  private initCloudsAnimation(): void {
    const { cloudsTrack } = this.elements!;
    const { scale, duration } = HERO_CONFIG.clouds;

    gsap.set(cloudsTrack, {
      xPercent: 0,
      scale,
    });

    const moveDistance = () => -cloudsTrack.offsetWidth / 2;

    gsap.to(cloudsTrack, {
      x: moveDistance,
      duration,
      repeat: -1,
      ease: "none",
    });
  }

  private initScrollAnimations(): void {
    const { hero, windowEl, skyContainer, heroContent, heroHeader, cloudsTrack } = this.elements!;

    const viewportHeight = window.innerHeight;
    const skyMoveDistance = skyContainer.offsetHeight - viewportHeight;

    gsap.to(hero, {
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: `+=${viewportHeight * HERO_CONFIG.scroll.endMultiplier}px`,
        scrub: true,
        pin: true,
        markers: HERO_CONFIG.scroll.markers,
        pinSpacing: true,
        onUpdate: self => {
          const progress = self.progress;

          const windowScale = this.getWindowScale(progress);

          gsap.set(windowEl, { scale: windowScale });
          gsap.set(heroHeader, {
            scale: windowScale,
            z: progress * HERO_CONFIG.header.zMax,
          });
          gsap.set(cloudsTrack, {
            yPercent: -progress * HERO_CONFIG.sky.yMovementMultiplier,
          });
          gsap.set(skyContainer, { y: -progress * skyMoveDistance });

          gsap.set(windowEl, { opacity: progress >= 1 ? 0 : 1 });
        },
      },
    });

    gsap.fromTo(
      heroContent,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: hero,
          start: "top center",
          end: `+=${viewportHeight * 1.2}px`,
          scrub: true,
        },
      }
    );
  }

  private getWindowScale(progress: number): number {
    const { scaleStart, scaleMid, scaleEnd, scaleProgressThreshold } = HERO_CONFIG.window;

    if (progress <= scaleProgressThreshold) {
      const t = progress / scaleProgressThreshold;
      return scaleStart + t * (scaleMid - scaleStart);
    }

    return scaleEnd;
  }
}
