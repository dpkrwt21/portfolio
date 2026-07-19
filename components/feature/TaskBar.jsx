"use client";

export default function TaskBar({ openWindows, minimizedWindows, onToggleWindow, onToggleStartMenu }) {
  const chips = [
    { id: "about", label: "about" },
    { id: "projects", label: "projects" },
    { id: "skills", label: "skills" },
    { id: "contact", label: "contact" },
    { id: "terminal", label: "terminal" },
    { id: "music", label: "music" },
    { id: "resume", label: "resume" },
  ];

  return (
    <div id="taskbar">
      {/* Next.js N Logo Start Trigger */}
      <button
        className="start-button-trigger"
        onClick={(e) => {
          e.stopPropagation();
          onToggleStartMenu();
        }}
        title="Start Menu"
      >
        N
      </button>

      {/* Dynamic Window Task Chips */}
      {chips.map((c) => {
        const isOpen = openWindows[c.id];
        const isMinimized = minimizedWindows ? minimizedWindows[c.id] : false;
        return (
          <div
            key={c.id}
            className={`task-chip ${c.id} ${isOpen ? "show" : ""} ${isMinimized ? "minimized" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWindow(c.id);
            }}
          >
            <span className="sw"></span>
            <span>{c.label}</span>
          </div>
        );
      })}
    </div>
  );
}
