"use client";

import { useState, useEffect, useCallback } from "react";
import { profileData } from "@/lib/data";
import { FiTerminal, FiRefreshCw, FiClock, FiLayers } from "react-icons/fi";

// Subcomponents
import BootScreen from "@/components/feature/BootScreen";
import MenuBar from "@/components/feature/MenuBar";
import Window from "@/components/ui/Window";
import StartMenu from "@/components/feature/StartMenu";
import TaskBar from "@/components/feature/TaskBar";
import Terminal from "@/components/apps/Terminal";
import MusicPlayer from "@/components/apps/MusicPlayer";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import SkillsApp from "@/components/apps/SkillsApp";
import ContactApp from "@/components/apps/ContactApp";
import ResumeApp from "@/components/apps/ResumeApp";
import ClockWidget from "@/components/feature/ClockWidget";
import CursorBlob from "@/components/ui/CursorBlob";
import HeroHeader from "@/components/feature/HeroHeader";
import DesktopIconsContainer from "@/components/feature/DesktopIconsContainer";

// Hooks
import useSystemClock from "@/hooks/useSystemClock";
import useBootSequence from "@/hooks/useBootSequence";
import useWindowManager from "@/hooks/useWindowManager";
import useWindowDrag from "@/hooks/useWindowDrag";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("peach");
  const [wallpaper, setWallpaper] = useState("stripes");
  const [notifications, setNotifications] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);

  // Custom states
  const [aboutTyped, setAboutTyped] = useState(false);
  const [aboutTextTyped, setAboutTextTyped] = useState("");
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [heroGlitch, setHeroGlitch] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Hook initializations
  const { clockText, showClock, handleToggleClock } = useSystemClock();

  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const {
    openWindows,
    maximizedWindows,
    minimizedWindows,
    positions,
    setPositions,
    openWindow,
    closeWindow,
    toggleMinimizeWindow,
    toggleMaximizeWindow,
    toggleWindowFromChip,
    handleMaximizeAll,
    handleMinimizeAll,
    handleResetLayout,
    getWindowStyles,
    focusWindow,
  } = useWindowManager();

  const { booting, bootText, handleSkipBoot, handleRestart: triggerRestart, handleShutdown: triggerShutdown } = useBootSequence(mounted, addNotification);

  const { handleDragStart } = useWindowDrag(mounted, positions, setPositions, focusWindow);

  // Reset custom states on Restart/Shutdown
  const handleRestart = () => {
    setAboutTyped(false);
    setAboutTextTyped("");
    setSkillsAnimated(false);
    triggerRestart();
  };

  const handleShutdown = () => {
    setAboutTyped(false);
    setAboutTextTyped("");
    setSkillsAnimated(false);
    triggerShutdown();
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Update root html attribute for theme
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  // About typing effect
  useEffect(() => {
    if (!openWindows.about || aboutTyped || !mounted) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAboutTyped(true);
    let i = 0;
    let typingInterval;

    function step() {
      setAboutTextTyped(profileData.about.message.slice(0, i));
      if (i <= profileData.about.message.length) {
        i++;
        typingInterval = setTimeout(step, 18);
      }
    }
    step();

    return () => clearTimeout(typingInterval);
  }, [openWindows.about, aboutTyped, mounted]);

  // Skills load animation trigger
  useEffect(() => {
    if (openWindows.skills && !skillsAnimated) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkillsAnimated(true);
    }
  }, [openWindows.skills, skillsAnimated]);

  // Konami Code Easter Egg effect
  useEffect(() => {
    if (!mounted) return;
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ];
    let index = 0;

    const handleKeyDown = (e) => {
      const key = e.code;
      if (key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          addNotification("🔓 SECRET UNLOCKED: Developer access level set to GOD MODE! 👑", "success");
          index = 0;
        }
      } else {
        index = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mounted, addNotification]);

  // Close start menu when clicking on desktop
  const handleDesktopClick = () => {
    setStartMenuOpen(false);
    setContextMenu(null);
  };

  const handleContextMenu = (e) => {
    if (
      e.target.closest(".window") ||
      e.target.closest(".icon") ||
      e.target.closest("#menubar") ||
      e.target.closest("#taskbar")
    ) {
      return;
    }
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {/* Boot Screen */}
      {booting && (
        <BootScreen bootText={bootText} onSkip={handleSkipBoot} />
      )}

      {/* Dynamic Cursor Blob */}
      <CursorBlob mounted={mounted} />

      {/* Desktop Wrapper */}
      <div id="desktop" className={`wp-${wallpaper}`} onClick={handleDesktopClick} onContextMenu={handleContextMenu}>

        {/* Menu Bar */}
        <MenuBar
          clockText={clockText}
          showClock={showClock}
          currentTheme={theme}
          onChangeTheme={setTheme}
          onOpenApp={openWindow}
          onRestart={handleRestart}
          onShutdown={handleShutdown}
          onToggleClock={handleToggleClock}
          onMaximizeAll={handleMaximizeAll}
          onMinimizeAll={handleMinimizeAll}
          onResetLayout={handleResetLayout}
        />

        {/* Hero Background Label */}
        <HeroHeader heroGlitch={heroGlitch} />

        {/* Desktop Icons - Vertically Stacked on Left */}
        <DesktopIconsContainer onOpenApp={openWindow} />

        {/* ================= DESKTOP WINDOWS ================= */}
        {[
          { name: "about", title: "about.txt", child: <AboutApp aboutTextTyped={aboutTextTyped} /> },
          { name: "projects", title: "projects/", child: <ProjectsApp /> },
          { name: "skills", title: "skills.app — running", child: <SkillsApp skillsAnimated={skillsAnimated} /> },
          { name: "contact", title: "contact.sh", child: <ContactApp /> },
          {
            name: "terminal",
            title: "terminal.sh",
            child: (
              <Terminal
                onChangeTheme={setTheme}
                onChangeWallpaper={setWallpaper}
                addNotification={addNotification}
              />
            ),
          },
          { name: "music", title: "mp3.app", child: <MusicPlayer /> },
          { name: "resume", title: "resume.pdf", child: <ResumeApp /> },
        ].map((win) => (
          <Window
            key={win.name}
            name={win.name}
            title={win.title}
            isOpen={openWindows[win.name]}
            isMinimized={minimizedWindows[win.name]}
            isMaximized={maximizedWindows[win.name]}
            onClose={() => closeWindow(win.name)}
            onMinimize={() => toggleMinimizeWindow(win.name)}
            onZoom={() => toggleMaximizeWindow(win.name)}
            onFocus={() => focusWindow(win.name)}
            windowStyles={getWindowStyles(win.name)}
            onDragStart={(e) => handleDragStart(e, win.name)}
          >
            {win.child}
          </Window>
        ))}

        {/* Interactive Start Menu Popup */}
        <StartMenu
          isOpen={startMenuOpen}
          currentTheme={theme}
          onChangeTheme={setTheme}
          onRestart={handleRestart}
          onShutdown={handleShutdown}
          onClose={() => setStartMenuOpen(false)}
        />

        {/* Taskbar with circular N logo trigger */}
        <TaskBar
          openWindows={openWindows}
          minimizedWindows={minimizedWindows}
          onToggleWindow={toggleWindowFromChip}
          onToggleStartMenu={() => setStartMenuOpen(!startMenuOpen)}
        />

        {/* System Toast Notifications */}
        <div className="notifications-container" onMouseDown={(e) => e.stopPropagation()}>
          {notifications.map((n) => (
            <div key={n.id} className={`toast-notification ${n.type}`}>
              <span className="toast-icon">
                {n.type === "success" ? "✓" : n.type === "warning" ? "⚠" : "ℹ"}
              </span>
              <span className="toast-message">{n.message}</span>
            </div>
          ))}
        </div>

        {/* Custom Context Menu */}
        {contextMenu && (
          <div
            className="context-menu"
            style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="context-menu-item"
              onClick={() => {
                openWindow("terminal");
                setContextMenu(null);
              }}
            >
              <FiTerminal size={14} style={{ marginRight: 8 }} /> New Terminal
            </button>
            <button
              className="context-menu-item"
              onClick={() => {
                handleResetLayout();
                setContextMenu(null);
              }}
            >
              <FiRefreshCw size={14} style={{ marginRight: 8 }} /> Reset Layout
            </button>
            <button
              className="context-menu-item"
              onClick={() => {
                handleToggleClock();
                setContextMenu(null);
              }}
            >
              <FiClock size={14} style={{ marginRight: 8 }} /> Toggle Clock
            </button>
            <div className="context-menu-divider"></div>
            <button
              className="context-menu-item"
              onClick={() => {
                const wps = ["stripes", "retro-grid", "nebula", "solid"];
                const nextIdx = (wps.indexOf(wallpaper) + 1) % wps.length;
                setWallpaper(wps[nextIdx]);
                setContextMenu(null);
              }}
            >
              <FiLayers size={14} style={{ marginRight: 8 }} /> Cycle Wallpaper
            </button>
          </div>
        )}

        {/* Desktop Clock & System Status Widget */}
        {showClock && <ClockWidget onClose={handleToggleClock} />}
      </div>
    </>
  );
}
