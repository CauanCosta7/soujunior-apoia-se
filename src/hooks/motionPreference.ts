/** Combines the OS preference with an explicit, persistent page-level pause. */
export function createMotionPreference(button: HTMLButtonElement | null) {
  const system = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = false;
  try {
    userPaused = localStorage.getItem("soujunior-motion") === "paused";
  } catch {
    /* Optional persistence. */
  }
  class MotionPreference extends EventTarget {
    get matches() {
      return system.matches || userPaused;
    }
  }
  const preference = new MotionPreference();
  const update = () => {
    document.documentElement.dataset.motion = preference.matches
      ? "paused"
      : "active";
    if (button) {
      button.disabled = system.matches;
      button.setAttribute("aria-pressed", String(preference.matches));
      const label = system.matches
        ? "Animações reduzidas pelo sistema"
        : userPaused
          ? "Retomar animações"
          : "Pausar animações";
      button.setAttribute("aria-label", label);
      button.title = label;
    }
    preference.dispatchEvent(new Event("change"));
  };
  const toggle = () => {
    userPaused = !userPaused;
    try {
      localStorage.setItem(
        "soujunior-motion",
        userPaused ? "paused" : "active",
      );
    } catch {
      /* Still works for this visit. */
    }
    update();
  };
  system.addEventListener("change", update);
  button?.addEventListener("click", toggle);
  update();
  return {
    preference,
    dispose() {
      system.removeEventListener("change", update);
      button?.removeEventListener("click", toggle);
    },
  };
}
