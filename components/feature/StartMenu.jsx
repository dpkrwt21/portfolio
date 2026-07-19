"use client";

import { profileData } from "@/lib/data";
import { FiUser, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

export default function StartMenu({
  isOpen,
  currentTheme,
  onChangeTheme,
  currentWallpaper,
  onChangeWallpaper,
  onRestart,
  onShutdown,
  onClose,
}) {
  if (!isOpen) return null;

  const themes = profileData.themes;

  const wallpapers = [
    { id: "stripes", name: "Stripes 🍑" },
    { id: "retro-grid", name: "Grid ⚡" },
    { id: "nebula", name: "Aurora 🌌" },
    { id: "solid", name: "Solid 💡" },
  ];

  return (
    <div className="start-menu flex flex-col" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
      {/* Header Profile Section */}
      <div className="start-header">
        <div className="avatar">
          <FiUser size={18} style={{ color: "var(--ink)" }} />
        </div>
        <div className="user-details">
          <div className="name">{profileData.name}</div>
          <div className="status">@ {profileData.username}</div>
        </div>
        <button className="start-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      {/* Main Content Area */}
      <div className="start-body">
        {/* Left Side: Navigation Links / Shortcuts */}
        <div className="start-section">
          <h3>Applications</h3>
          <div className="start-links">
            <a
              href={`mailto:${profileData.contact.email}`}
              className="start-link flex items-center gap-2"
            >
              <FiMail size={14} style={{ flexShrink: 0 }} /> Mail Agent
            </a>
            <a
              href={profileData.contact.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="start-link flex items-center gap-2"
            >
              <FiGithub size={14} style={{ flexShrink: 0 }} /> GitHub profile
            </a>
            <a
              href={profileData.contact.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="start-link flex items-center gap-2"
            >
              <FiLinkedin size={14} style={{ flexShrink: 0 }} /> LinkedIn profile
            </a>
          </div>
        </div>

        {/* Middle: Theme Swapper */}
        <div className="start-section theme-swapper">
          <h3>Change Theme</h3>
          <div className="theme-buttons">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-btn ${currentTheme === t.id ? "active" : ""}`}
                onClick={() => onChangeTheme(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Wallpaper Swapper */}
        <div className="start-section wallpaper-swapper">
          <h3>Wallpaper</h3>
          <div className="theme-buttons">
            {wallpapers.map((w) => (
              <button
                key={w.id}
                className={`theme-btn ${currentWallpaper === w.id ? "active" : ""}`}
                onClick={() => onChangeWallpaper(w.id)}
              >
                {w.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Power Controls */}
      <div className="start-footer">
        <button className="power-btn restart" onClick={onRestart}>
          ⟲ Restart
        </button>
        <button className="power-btn shutdown" onClick={onShutdown}>
          ⏻ Shutdown
        </button>
      </div>
    </div>
  );
}
