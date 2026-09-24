export function MotionControl() {
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-label="Pausar animações"
      aria-pressed="false"
      title="Pausar animações"
    >
      <svg className="motion-pause-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9 5v14M15 5v14" />
      </svg>
      <svg className="motion-play-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 5 11 7-11 7Z" />
      </svg>
    </button>
  );
}
