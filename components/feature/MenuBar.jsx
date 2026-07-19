"use client";

import { useState, useEffect } from "react";
import { profileData } from "@/lib/data";

export default function MenuBar({
  clockText,
  showClock,
  currentTheme,
  onChangeTheme,
  onOpenApp,
  onRestart,
  onShutdown,
  onToggleClock,
  onMaximizeAll,
  onMinimizeAll,
  onResetLayout,
}) {
  const [activeMenu, setActiveMenu] = useState(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".menu-container")) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleMenuClick = (e, menuName) => {
    e.stopPropagation();
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMouseEnter = (menuName) => {
    if (activeMenu !== null) {
      setActiveMenu(menuName);
    }
  };

  const handleAction = (callback) => {
    if (callback) callback();
    setActiveMenu(null);
  };

  const themes = profileData.themes;

  return (
    <div id="menubar" onMouseDown={(e) => e.stopPropagation()}>
      <div className="left">
        <span className="logo">◆ deepak@playground</span>

        {/* FILE MENU */}
        <div className="menu-container">
          <span
            className={`menu-item ${activeMenu === "file" ? "active" : ""}`}
            onClick={(e) => handleMenuClick(e, "file")}
            onMouseEnter={() => handleMouseEnter("file")}
          >
            File
          </span>
          {activeMenu === "file" && (
            <div className="menu-dropdown">
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(() => onOpenApp("about"))}
              >
                🧑‍💻 about.txt
              </button>
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(() => onOpenApp("projects"))}
              >
                📁 projects/
              </button>
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(() => onOpenApp("skills"))}
              >
                ⚡ skills.app
              </button>
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(() => onOpenApp("contact"))}
              >
                ✉️ contact.sh
              </button>
              <div className="menu-divider"></div>
              <button
                className="menu-dropdown-item power"
                onClick={() => handleAction(onRestart)}
              >
                ⟲ Restart OS
              </button>
              <button
                className="menu-dropdown-item power"
                onClick={() => handleAction(onShutdown)}
              >
                ⏻ Shutdown OS
              </button>
            </div>
          )}
        </div>

        {/* EDIT MENU */}
        <div className="menu-container">
          <span
            className={`menu-item ${activeMenu === "edit" ? "active" : ""}`}
            onClick={(e) => handleMenuClick(e, "edit")}
            onMouseEnter={() => handleMouseEnter("edit")}
          >
            Edit
          </span>
          {activeMenu === "edit" && (
            <div className="menu-dropdown">
              <div className="menu-section-header">Themes</div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  className={`menu-dropdown-item ${
                    currentTheme === t.id ? "checked" : ""
                  }`}
                  onClick={() => handleAction(() => onChangeTheme(t.id))}
                >
                  {currentTheme === t.id ? "✓ " : "  "}
                  {t.name}
                </button>
              ))}
              <div className="menu-divider"></div>
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(onResetLayout)}
              >
                ⟰ Reset Desktop Layout
              </button>
            </div>
          )}
        </div>

        {/* VIEW MENU */}
        <div className="menu-container">
          <span
            className={`menu-item ${activeMenu === "view" ? "active" : ""}`}
            onClick={(e) => handleMenuClick(e, "view")}
            onMouseEnter={() => handleMouseEnter("view")}
          >
            View
          </span>
          {activeMenu === "view" && (
            <div className="menu-dropdown">
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(onMaximizeAll)}
              >
                🗖 Maximize All Windows
              </button>
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(onMinimizeAll)}
              >
                🗕 Minimize All Windows
              </button>
              <div className="menu-divider"></div>
              <button
                className="menu-dropdown-item"
                onClick={() => handleAction(onToggleClock)}
              >
                {showClock ? "✓" : "  "} Show System Clock
              </button>
            </div>
          )}
        </div>

        {/* GO MENU */}
        <div className="menu-container">
          <span
            className={`menu-item ${activeMenu === "go" ? "active" : ""}`}
            onClick={(e) => handleMenuClick(e, "go")}
            onMouseEnter={() => handleMouseEnter("go")}
          >
            Go
          </span>
          {activeMenu === "go" && (
            <div className="menu-dropdown">
              <a
                className="menu-dropdown-item link"
                href={profileData.contact.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setActiveMenu(null)}
              >
                🔗 GitHub profile
              </a>
              <a
                className="menu-dropdown-item link"
                href={profileData.contact.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setActiveMenu(null)}
              >
                💼 LinkedIn profile
              </a>
              <a
                className="menu-dropdown-item link"
                href={`mailto:${profileData.contact.email}`}
                onClick={() => setActiveMenu(null)}
              >
                ✉️ Send Email
              </a>
            </div>
          )}
        </div>
      </div>

      {showClock && <div id="clock">{clockText}</div>}
    </div>
  );
}
