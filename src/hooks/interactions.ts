export function initializeInteractions(root: HTMLElement) {
  let disposed = false;
  const cleanups: (() => void)[] = [];
  const timers = new Set<number>();
  const frames = new Set<number>();
  const snapshots = [...root.querySelectorAll("*")].map((el) => ({
    el,
    attrs: [...el.attributes].map((a) => [a.name, a.value]),
    children: [...el.childNodes],
  }));
  function on<K extends keyof (WindowEventMap & DocumentEventMap)>(
    target: EventTarget | null | undefined,
    type: K,
    handler: (event: (WindowEventMap & DocumentEventMap)[K]) => void,
    options?: AddEventListenerOptions,
  ) {
    if (!target) return;
    target.addEventListener(type, handler as EventListener, options);
    cleanups.push(() =>
      target.removeEventListener(type, handler as EventListener, options),
    );
  }
  function observe(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    const observer = new IntersectionObserver(callback, options);
    cleanups.push(() => observer.disconnect());
    return observer;
  }
  function resizeObserve(callback: ResizeObserverCallback) {
    const observer = new ResizeObserver(callback);
    cleanups.push(() => observer.disconnect());
    return observer;
  }
  function later(callback: () => void, ms: number) {
    const id = window.setTimeout(() => {
      timers.delete(id);
      if (!disposed) callback();
    }, ms);
    timers.add(id);
    return id;
  }
  function nextFrame(callback: FrameRequestCallback) {
    if (disposed) return 0;
    const id = requestAnimationFrame((time) => {
      frames.delete(id);
      if (!disposed) callback(time);
    });
    frames.add(id);
    return id;
  }

  const motionPreference = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const desktopMenu = window.matchMedia("(min-width: 1101px)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const canObserve = "IntersectionObserver" in window;
  const finishMotion: (() => void)[] = [];
  const numberFormat = new Intl.NumberFormat("pt-BR");

  // Light is the first-visit default; the visitor's explicit choice is remembered.
  const themeButton = document.querySelector<HTMLElement>(".theme-toggle");
  let currentTheme: "light" | "dark" = "light";
  try {
    currentTheme =
      localStorage.getItem("soujunior-theme") === "dark" ? "dark" : "light";
  } catch {
    /* Storage may be disabled. */
  }
  function applyTheme(theme: "light" | "dark") {
    currentTheme = theme;
    document.documentElement.dataset.theme = theme;
    if (themeButton) {
      const dark = theme === "dark";
      themeButton.setAttribute("aria-pressed", String(dark));
      themeButton.setAttribute(
        "aria-label",
        dark ? "Ativar modo claro" : "Ativar modo escuro",
      );
    }
  }
  applyTheme(currentTheme);
  on(themeButton, "click", () => {
    const next = currentTheme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("soujunior-theme", next);
    } catch {
      /* Theme still works for this visit. */
    }
    applyTheme(next);
  });

  // Visibility is opt-in: failed/disabled JavaScript never hides the page.
  function whenVisible(
    element: Element | null,
    callback: () => void,
    threshold = 0.15,
  ) {
    if (!element || !canObserve) {
      callback();
      return;
    }
    const observer = observe(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          callback();
        }
      },
      { threshold },
    );
    observer.observe(element);
    finishMotion.push(() => {
      observer.disconnect();
      callback();
    });
  }

  // Re-enter from either edge. A wider exit boundary prevents flicker near the viewport.
  const viewportItems = new Map<
    Element,
    {
      active: boolean;
      enter: () => void;
      reset: (rect: DOMRectReadOnly) => void;
      complete: () => void;
    }
  >();
  let entranceObserver: IntersectionObserver | null = null;
  let exitObserver: IntersectionObserver | null = null;
  function repeatInViewport(
    element: HTMLElement,
    enter: () => void,
    reset: (rect: DOMRectReadOnly) => void,
    complete = enter,
  ) {
    if (!canObserve || motionPreference.matches) {
      complete();
      return;
    }
    if (!entranceObserver) {
      entranceObserver = observe(
        (entries) => {
          entries.forEach((entry) => {
            const item = viewportItems.get(entry.target);
            if (
              !item ||
              item.active ||
              !entry.isIntersecting ||
              entry.intersectionRatio < 0.08
            )
              return;
            item.active = true;
            item.enter();
          });
        },
        { threshold: [0, 0.08], rootMargin: "-16px 0px -16px 0px" },
      );
      exitObserver = observe(
        (entries) => {
          entries.forEach((entry) => {
            const item = viewportItems.get(entry.target);
            if (
              !item ||
              entry.isIntersecting ||
              entry.target.contains(document.activeElement)
            )
              return;
            item.active = false;
            item.reset(entry.boundingClientRect);
          });
        },
        { threshold: 0, rootMargin: "0px" },
      );
      finishMotion.push(() => {
        entranceObserver?.disconnect();
        exitObserver?.disconnect();
        viewportItems.forEach((item) => item.complete());
        viewportItems.clear();
      });
    }
    viewportItems.set(element, { active: false, enter, reset, complete });
    reset(element.getBoundingClientRect());
    entranceObserver.observe(element);
    exitObserver?.observe(element);
  }
  // Keyboard navigation always reveals the focused control and its containers immediately.
  on(document, "focusin", (event) => {
    viewportItems.forEach((item, element) => {
      if (element.contains(event.target as Node | null)) {
        item.active = true;
        item.complete();
      }
    });
  });

  // The mobile menu keeps native link navigation and keyboard focus behavior.
  const menuButton = document.querySelector<HTMLElement>(".menu");
  const menu = document.querySelector<HTMLElement>("#main-navigation");
  function closeMenu(returnFocus = false) {
    if (!menuButton || !menu) return;
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    if (returnFocus) menuButton.focus();
  }
  if (menuButton && menu) {
    on(menuButton, "click", () => {
      const open = menuButton.getAttribute("aria-expanded") !== "true";
      menu.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Fechar menu" : "Abrir menu",
      );
    });
    menu
      .querySelectorAll("a")
      .forEach((link) => on(link, "click", () => closeMenu()));
    on(document, "keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("is-open"))
        closeMenu(true);
    });
    on(document, "click", (event) => {
      if (
        !menu.contains(event.target as Node | null) &&
        !menuButton.contains(event.target as Node | null)
      )
        closeMenu();
    });
    on(desktopMenu, "change", () => {
      if (desktopMenu.matches) closeMenu();
    });
  }

  const response = document.querySelector<HTMLElement>(".response");
  const amounts = [...document.querySelectorAll<HTMLElement>(".amount")];
  amounts.forEach((button) =>
    on(button, "click", () => {
      amounts.forEach((option) => {
        option.classList.toggle("active", option === button);
        option.setAttribute("aria-pressed", String(option === button));
      });
      const value = (button.textContent ?? "").trim();
      if (response)
        response.textContent =
          value === "Outro"
            ? "💙 Escolha o valor que fizer sentido para você no Apoia.se."
            : `💙 Você escolheu ${value} para fazer parte dessa história.`;
    }),
  );

  // Native <details> remains usable without animation support.
  const accordion = [
    ...document.querySelectorAll<HTMLDetailsElement>(".faq-entry"),
  ].map((element) => ({
    element,
    summary: element.querySelector("summary")!,
    desired: element.open,
    animation: null as Animation | null,
  }));
  function setAccordion(
    item: (typeof accordion)[number],
    open: boolean,
    instant = false,
  ) {
    const startHeight = item.element.getBoundingClientRect().height;
    item.animation?.cancel();
    item.animation = null;
    item.desired = open;
    item.summary.setAttribute("aria-expanded", String(open));
    item.element.classList.toggle("is-closing", !open);
    const finish = () => {
      item.element.open = open;
      item.element.classList.remove("is-closing");
      item.element.style.overflow = "";
      item.element.style.height = "";
      item.animation = null;
    };
    if (instant || motionPreference.matches || !item.element.animate) {
      finish();
      return;
    }
    // Measure the requested native state, then keep it open for the transition.
    item.element.style.height = "";
    item.element.open = open;
    const endHeight = item.element.getBoundingClientRect().height;
    item.element.open = true;
    item.element.style.overflow = "hidden";
    const animation = item.element.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 320, easing: "cubic-bezier(.22,.8,.25,1)" },
    );
    item.animation = animation;
    animation.onfinish = () => {
      if (item.animation === animation) finish();
    };
  }
  accordion.forEach((item) => {
    item.summary.setAttribute("aria-expanded", String(item.desired));
    on(item.summary, "click", (event) => {
      event.preventDefault();
      const next = !item.desired;
      if (next)
        accordion.forEach((other) => {
          if (other !== item && other.desired) setAccordion(other, false);
        });
      setAccordion(item, next);
    });
  });
  finishMotion.push(() =>
    accordion.forEach((item) => setAccordion(item, item.desired, true)),
  );

  // Stories advance every three seconds and pause during direct interaction.
  const stories = [...document.querySelectorAll<HTMLElement>(".test-card")];
  const storyTrack = document.querySelector<HTMLElement>(".test-track");
  let storyIndex = Math.max(
    0,
    stories.findIndex((story) => story.classList.contains("active")),
  );
  let storyTimer = 0;
  function showStory(next: number) {
    if (!stories.length) return;
    storyIndex = (next + stories.length) % stories.length;
    stories.forEach((story, index) => {
      story.classList.toggle("active", index === storyIndex);
      story.setAttribute("aria-hidden", String(index !== storyIndex));
      if (index === storyIndex) story.setAttribute("aria-current", "true");
      else story.removeAttribute("aria-current");
    });
  }
  function stopStoryTimer() {
    window.clearTimeout(storyTimer);
    storyTimer = 0;
  }
  function scheduleStoryTimer() {
    stopStoryTimer();
    if (stories.length < 2 || motionPreference.matches || document.hidden)
      return;
    storyTimer = later(() => {
      showStory(storyIndex + 1);
      scheduleStoryTimer();
    }, 3000);
  }
  if (stories.length) showStory(storyIndex);
  on(document.querySelector<HTMLElement>(".test-next"), "click", () => {
    showStory(storyIndex + 1);
    scheduleStoryTimer();
  });
  on(document.querySelector<HTMLElement>(".test-prev"), "click", () => {
    showStory(storyIndex - 1);
    scheduleStoryTimer();
  });
  on(storyTrack, "mouseenter", stopStoryTimer);
  on(storyTrack, "mouseleave", scheduleStoryTimer);
  on(storyTrack, "focusin", stopStoryTimer);
  on(storyTrack, "focusout", scheduleStoryTimer);
  on(document, "visibilitychange", () =>
    document.hidden ? stopStoryTimer() : scheduleStoryTimer(),
  );
  scheduleStoryTimer();
  let touchStart: { x: number; y: number } | null = null;
  on(
    storyTrack,
    "touchstart",
    (event) => {
      touchStart =
        event.touches.length === 1
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
          : null;
    },
    { passive: true },
  );
  on(
    storyTrack,
    "touchend",
    (event) => {
      if (!touchStart || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStart.x;
      const dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        showStory(storyIndex + (dx < 0 ? 1 : -1));
        scheduleStoryTimer();
      }
      touchStart = null;
    },
    { passive: true },
  );
  on(
    storyTrack,
    "touchcancel",
    () => {
      touchStart = null;
    },
    { passive: true },
  );

  // Desktop transparency opens automatically once visible; it never captures page scroll.
  const spendLandscape =
    document.querySelector<HTMLElement>(".spend-landscape");
  const spendViewport = document.querySelector<HTMLElement>(".spend-viewport");
  const spendCards = document.querySelector<HTMLElement>(".spend-cards");
  const spendItems = [...document.querySelectorAll<HTMLElement>(".spend-card")];
  const spendProgress = document.querySelector<HTMLElement>(
    ".spend-progress span",
  );
  const compactTransparency = window.matchMedia("(max-width: 1024px)");
  let spendOpened = false;
  let spendOpenTimer = 0;
  function layoutSpend(open = spendOpened) {
    if (!spendLandscape || !spendViewport || !spendCards) return;
    if (motionPreference.matches || compactTransparency.matches) {
      spendItems.forEach((item) => {
        item.style.removeProperty("transform");
        item.style.zIndex = "";
      });
      if (spendProgress) spendProgress.style.transform = "";
      return;
    }
    const width = spendViewport.clientWidth;
    spendItems.forEach((item, index) => {
      const cardWidth = item.offsetWidth;
      const startX = (width - cardWidth) / 2 + (index - 1.5) * 12;
      const endX = ((width - cardWidth) / 3) * index;
      const startY = 62 + index * 8;
      const endY = [48, 4, 62, 24][index] || 0;
      const x = open ? endX : startX;
      const y = open ? endY : startY;
      const rotation = open ? 0 : [-4, -1.5, 1.5, 4][index] || 0;
      item.style.setProperty(
        "transform",
        `translate3d(${x}px,${y}px,0) rotate(${rotation}deg)`,
        "important",
      );
      item.style.zIndex = String(spendItems.length - index);
    });
    if (spendProgress)
      spendProgress.style.transform = `scaleX(${open ? 1 : 0})`;
  }
  function openSpend() {
    if (spendOpened || compactTransparency.matches) return;
    spendOpened = true;
    spendLandscape?.classList.add("is-open");
    nextFrame(() => layoutSpend(true));
  }
  function resetSpend() {
    window.clearTimeout(spendOpenTimer);
    spendOpenTimer = 0;
    if (compactTransparency.matches) return;
    spendOpened = false;
    spendLandscape?.classList.remove("is-open");
    layoutSpend(false);
  }
  layoutSpend(false);
  if (spendLandscape && canObserve) {
    const automaticSpendObserver = observe(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.22) {
          window.clearTimeout(spendOpenTimer);
          spendOpenTimer = later(openSpend, 120);
        } else if (!entry.isIntersecting) {
          resetSpend();
        }
      },
      { threshold: [0, 0.22] },
    );
    automaticSpendObserver.observe(spendLandscape);
  } else {
    openSpend();
  }
  on(window, "resize", () => layoutSpend());
  on(compactTransparency, "change", () =>
    compactTransparency.matches ? layoutSpend() : openSpend(),
  );

  // Compact transparency carousel: arrows, swipe and optional autoplay.
  const spendPrev = document.querySelector<HTMLElement>(".spend-prev");
  const spendNext = document.querySelector<HTMLElement>(".spend-next");
  const spendPosition = document.querySelector<HTMLElement>(".spend-position");
  let spendIndex = 0;
  let spendTimer = 0;
  let spendVisible = false;
  let spendPaused = false;
  function updateSpendPosition() {
    if (spendPosition)
      spendPosition.textContent = `${spendIndex + 1} / ${spendItems.length}`;
    spendItems.forEach((item, index) => {
      if (index === spendIndex) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
  }
  function showSpend(next: number, behavior: ScrollBehavior = "smooth") {
    if (
      !spendItems.length ||
      !spendCards ||
      !spendViewport ||
      !compactTransparency.matches
    )
      return;
    spendIndex = (next + spendItems.length) % spendItems.length;
    const target = spendItems[spendIndex];
    spendViewport.scrollTo({
      left: target.offsetLeft - spendCards.offsetLeft,
      behavior: motionPreference.matches ? "auto" : behavior,
    });
    updateSpendPosition();
  }
  function stopSpendTimer() {
    window.clearTimeout(spendTimer);
    spendTimer = 0;
  }
  function scheduleSpendTimer() {
    stopSpendTimer();
    if (
      !compactTransparency.matches ||
      !spendVisible ||
      spendPaused ||
      motionPreference.matches ||
      document.hidden ||
      spendItems.length < 2
    )
      return;
    spendTimer = later(() => {
      showSpend(spendIndex + 1);
      scheduleSpendTimer();
    }, 4500);
  }
  on(spendPrev, "click", () => {
    showSpend(spendIndex - 1);
    scheduleSpendTimer();
  });
  on(spendNext, "click", () => {
    showSpend(spendIndex + 1);
    scheduleSpendTimer();
  });
  let spendScrollTimer = 0;
  on(
    spendViewport,
    "scroll",
    () => {
      window.clearTimeout(spendScrollTimer);
      spendScrollTimer = later(() => {
        if (
          !compactTransparency.matches ||
          !spendItems.length ||
          !spendCards ||
          !spendViewport
        )
          return;
        spendIndex = spendItems.reduce(
          (best, item, index) =>
            Math.abs(
              item.offsetLeft -
                spendCards.offsetLeft -
                spendViewport.scrollLeft,
            ) <
            Math.abs(
              spendItems[best].offsetLeft -
                spendCards.offsetLeft -
                spendViewport.scrollLeft,
            )
              ? index
              : best,
          0,
        );
        updateSpendPosition();
      }, 100);
    },
    { passive: true },
  );
  on(spendViewport, "mouseenter", () => {
    spendPaused = true;
    stopSpendTimer();
  });
  on(spendViewport, "mouseleave", () => {
    spendPaused = false;
    scheduleSpendTimer();
  });
  on(spendViewport, "focusin", () => {
    spendPaused = true;
    stopSpendTimer();
  });
  on(spendViewport, "focusout", () => {
    spendPaused = false;
    scheduleSpendTimer();
  });
  on(
    spendViewport,
    "touchstart",
    () => {
      spendPaused = true;
      stopSpendTimer();
    },
    { passive: true },
  );
  on(
    spendViewport,
    "touchend",
    () => {
      spendPaused = false;
      scheduleSpendTimer();
    },
    { passive: true },
  );
  if (spendLandscape && canObserve) {
    const spendObserver = observe(
      (entries) => {
        spendVisible = entries.some((entry) => entry.isIntersecting);
        spendLandscape.classList.toggle("is-visible", spendVisible);
        scheduleSpendTimer();
      },
      { threshold: 0.25 },
    );
    spendObserver.observe(spendLandscape);
  } else {
    spendVisible = true;
    spendLandscape?.classList.add("is-visible");
  }
  on(compactTransparency, "change", () => {
    showSpend(0, "auto");
    scheduleSpendTimer();
  });
  on(document, "visibilitychange", scheduleSpendTimer);
  updateSpendPosition();
  scheduleSpendTimer();

  // The photographic strip moves continuously and never depends on page scroll.
  const gallery = document.querySelector<HTMLElement>(".momentum");
  const track = gallery?.querySelector<HTMLElement>(".momentum-track");
  const group = track?.querySelector<HTMLElement>(".momentum-set");
  let galleryVisible = true;
  let galleryFrame = 0;
  let galleryCycle = 0;
  let galleryStart = performance.now();
  if (group && track) {
    const duplicate = group.cloneNode(true) as HTMLElement;
    duplicate.setAttribute("aria-hidden", "true");
    track.append(duplicate);
    const paint = (now: number) => {
      if (motionPreference.matches || !galleryVisible || galleryCycle <= 0) {
        galleryFrame = 0;
        return;
      }
      const offset = ((now - galleryStart) * 0.035) % galleryCycle;
      track.style.transform = `translate3d(${-offset}px,0,0)`;
      galleryFrame = nextFrame(paint);
    };
    const schedule = () => {
      if (!galleryFrame && galleryVisible && !motionPreference.matches)
        galleryFrame = nextFrame(paint);
    };
    const measure = () => {
      galleryCycle = group.getBoundingClientRect().width;
      schedule();
    };
    measure();
    if (canObserve) {
      const observer = observe(
        (entries) => {
          galleryVisible = entries[0].isIntersecting;
          if (galleryVisible) schedule();
          else {
            cancelAnimationFrame(galleryFrame);
            galleryFrame = 0;
          }
        },
        { rootMargin: "160px" },
      );
      if (gallery) observer.observe(gallery);
    }
    on(window, "resize", measure, { passive: true });
    if ("ResizeObserver" in window) resizeObserve(measure).observe(group);
    document.fonts?.ready.then(() => {
      if (!disposed) measure();
    });
    finishMotion.push(() => {
      cancelAnimationFrame(galleryFrame);
      galleryFrame = 0;
      track.style.transform = "";
    });
  }

  if (!motionPreference.matches) {
    if (canObserve) {
      (
        [
          [".route-step", 90],
          [".spend-card", 140],
          [".faq-entry", 70],
        ] as const
      ).forEach(([selector, delay]) => {
        document
          .querySelectorAll<HTMLElement>(selector)
          .forEach((element, index) => {
            const order =
              selector === ".faq-entry" ? Math.min(index, 3) : index;
            element.style.setProperty("--reveal-delay", `${order * delay}ms`);
          });
      });
      const reveals = document.querySelectorAll<HTMLElement>(
        ".reveal, .hero-copy, .test-track, .source-link, .funding-heading, .funding-bottom, .faq-intro, .faq-entry, .final-inner > div, .final-mascot, .giving-note",
      );
      reveals.forEach((element) => {
        element.classList.add("viewport-reveal");
        const enter = () => {
          element.classList.add("in");
          element.classList.remove("viewport-pending");
        };
        const reset = (rect: DOMRectReadOnly) => {
          element.style.setProperty(
            "--reveal-y",
            rect.bottom < 0 ? "-30px" : "30px",
          );
          element.classList.remove("in");
          element.classList.add("viewport-pending");
        };
        repeatInViewport(element, enter, reset);
      });
      document.documentElement.classList.add("motion-ready");
    }

    // Accessible text stays intact; only its decorative visual copy is typed.
    const lines = [...document.querySelectorAll<HTMLElement>(".type-line")];
    const typed = lines.map((line) => {
      const measure = line.querySelector(".type-measure");
      const characters = Array.from(measure?.textContent ?? "");
      const output = document.createElement("span");
      output.className = "typed-output";
      output.setAttribute("aria-hidden", "true");
      const copy = document.createElement("span");
      copy.className = "typed-copy";
      const cursor = document.createElement("i");
      cursor.className = "type-cursor";
      output.append(copy, cursor);
      line.append(output);
      line.classList.add("type-prepared");
      return { line, copy, characters };
    });
    if (typed.length) {
      let typingFrame = 0;
      let typingStarted = false;
      const complete = () => {
        cancelAnimationFrame(typingFrame);
        typed.forEach((item) => {
          item.copy.textContent = item.characters.join("");
          item.line.classList.remove("is-typing");
        });
      };
      whenVisible(document.querySelector<HTMLElement>(".hero h1"), () => {
        if (typingStarted) return;
        typingStarted = true;
        if (motionPreference.matches) {
          complete();
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          if (motionPreference.matches) {
            complete();
            return;
          }
          let lineStart = 100;
          let done = true;
          typed.forEach((item) => {
            const elapsed = now - start - lineStart;
            const count = Math.max(
              0,
              Math.min(item.characters.length, Math.floor(elapsed / 48)),
            );
            item.copy.textContent = item.characters.slice(0, count).join("");
            item.line.classList.toggle(
              "is-typing",
              elapsed >= 0 && count < item.characters.length,
            );
            if (count < item.characters.length) done = false;
            lineStart += item.characters.length * 48 + 90;
          });
          if (!done) typingFrame = nextFrame(tick);
          else complete();
        };
        typingFrame = nextFrame(tick);
      });
      finishMotion.push(complete);
    }

    document
      .querySelectorAll<HTMLElement>("[data-reveal-words]")
      .forEach((heading) => {
        const visual = document.createElement("span");
        visual.className = "title-visual";
        visual.setAttribute("aria-hidden", "true");
        const readable = heading.cloneNode(true) as HTMLElement;
        readable.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
        const accessible = document.createElement("span");
        accessible.className = "sr-only";
        accessible.textContent = (readable.textContent ?? "")
          .replace(/\s+/g, " ")
          .trim();
        while (heading.firstChild) visual.append(heading.firstChild);
        let wordIndex = 0;
        const split = (node: Node) =>
          [...node.childNodes].forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const fragment = document.createDocumentFragment();
              (child.textContent ?? "").split(/(\s+)/).forEach((word) => {
                if (!word) return;
                if (/^\s+$/.test(word)) {
                  fragment.append(document.createTextNode(word));
                  return;
                }
                const mask = document.createElement("span");
                mask.className = "word-mask";
                const inner = document.createElement("span");
                inner.className = "title-word";
                inner.textContent = word;
                inner.style.setProperty(
                  "--word-delay",
                  `${Math.min(wordIndex++ * 36, 320)}ms`,
                );
                mask.append(inner);
                fragment.append(mask);
              });
              child.replaceWith(fragment);
            } else if (child.nodeType === Node.ELEMENT_NODE) split(child);
          });
        split(visual);
        heading.append(accessible, visual);
        heading.classList.add("text-prepared");
        repeatInViewport(
          heading,
          () => heading.classList.add("text-in"),
          (rect) => {
            heading.style.setProperty(
              "--word-offset",
              rect.bottom < 0 ? "-110%" : "110%",
            );
            heading.classList.remove("text-in");
          },
        );
      });

    document.querySelectorAll<HTMLElement>(".metric").forEach((card, index) => {
      const value = card.querySelector<HTMLElement>("[data-count]");
      if (!value) return;
      const target = Number(value.dataset.count);
      if (!Number.isFinite(target)) return;
      let frame = 0;
      const complete = () => {
        cancelAnimationFrame(frame);
        value.textContent = numberFormat.format(target);
        card.classList.remove("metric-pending");
      };
      card.style.setProperty("--metric-delay", `${index * 70}ms`);
      repeatInViewport(
        card,
        () => {
          cancelAnimationFrame(frame);
          card.classList.remove("metric-pending");
          if (motionPreference.matches) {
            complete();
            return;
          }
          const start = performance.now() + index * 70;
          value.textContent = "0";
          const tick = (now: number) => {
            if (motionPreference.matches) {
              complete();
              return;
            }
            const progress = Math.max(0, Math.min(1, (now - start) / 1150));
            const eased = 1 - Math.pow(1 - progress, 3);
            value.textContent = numberFormat.format(Math.floor(target * eased));
            if (progress < 1) frame = nextFrame(tick);
            else complete();
          };
          frame = nextFrame(tick);
        },
        (rect) => {
          cancelAnimationFrame(frame);
          card.style.setProperty(
            "--metric-y",
            rect.bottom < 0 ? "-30px" : "30px",
          );
          card.classList.add("metric-pending");
          value.textContent = numberFormat.format(target);
        },
        complete,
      );
    });
  }

  on(motionPreference, "change", () => {
    if (motionPreference.matches) {
      stopStoryTimer();
      stopSpendTimer();
      finishMotion.forEach((finish) => finish());
    } else {
      scheduleStoryTimer();
      scheduleSpendTimer();
    }
  });

  return () => {
    disposed = true;
    cleanups.forEach((fn) => fn());
    timers.forEach(window.clearTimeout);
    frames.forEach(cancelAnimationFrame);
    root
      .querySelectorAll("*")
      .forEach((el) => el.getAnimations().forEach((a) => a.cancel()));
    snapshots.reverse().forEach(({ el, attrs, children }) => {
      el.replaceChildren(...children);
      [...el.attributes].forEach((a) => el.removeAttribute(a.name));
      attrs.forEach(([name, value]) => el.setAttribute(name, value));
    });
    document.documentElement.classList.remove("motion-ready");
  };
}
