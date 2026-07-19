"use client";

import { useState, useRef, useEffect } from "react";
import { profileData } from "@/lib/data";

export default function Terminal({ onChangeTheme, onChangeWallpaper, addNotification }) {
  const [history, setHistory] = useState([
    { text: "Welcome to Deepak's Interactive Shell v1.0", type: "system" },
    { text: "Type 'help' to see a list of commands.", type: "system" },
    { text: "", type: "system" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmdStr = inputVal.trim();
    if (!cmdStr) return;

    // Echo input command
    const newHistory = [...history, { text: `deepak@playground:~$ ${cmdStr}`, type: "input" }];
    const args = cmdStr.split(" ");
    const command = args[0].toLowerCase();

    switch (command) {
      case "help":
        newHistory.push({
          text: `Available commands:
  help      - Show this manual
  about     - View bio description
  projects  - List latest portfolio projects
  skills    - View technical skill metrics
  neofetch  - Output dashboard system specifications
  theme     - Switch UI theme (e.g., 'theme neon', 'theme dark')
  wallpaper - Change desktop background (e.g., 'wallpaper aurora')
  clear     - Wipe command terminal buffer`,
          type: "output",
        });
        break;

      case "about":
        newHistory.push({
          text: `${profileData.name} (@${profileData.username})
-------------------------
${profileData.about.details}
Location: ${profileData.about.location}
Status: ${profileData.about.status}`,
          type: "output",
        });
        break;

      case "projects": {
        const prjs = profileData.projects
          .map((p) => `* ${p.title} - ${p.description} (${p.link})`)
          .join("\n");
        newHistory.push({
          text: `Projects list:\n${prjs}`,
          type: "output",
        });
        break;
      }

      case "skills": {
        const sks = profileData.skills.map((s) => `* ${s.name}: [${s.percentage}%]`).join("\n");
        newHistory.push({
          text: `Technical skills:\n${sks}`,
          type: "output",
        });
        break;
      }

      case "neofetch": {
        const themeLabel = document.documentElement.getAttribute("data-theme") || "peach";
        newHistory.push({
          text: `      ◆◆◆◆◆       deepak@playground
    ◆◆     ◆◆     -----------------
  ◆◆  ◆◆ ◆◆  ◆◆   OS: Portfolio-OS v2.1
  ◆◆   ◆◆◆   ◆◆   Shell: bash/zsh mock
  ◆◆    ◆    ◆◆   Uptime: 24 mins
    ◆◆     ◆◆     Theme: ${themeLabel}
      ◆◆◆◆◆       Wallpaper: Active Pattern
                  CPU: Gemini Core API v1.5
                  Memory: 512MB RAM virtual`,
          type: "output",
        });
        break;
      }

      case "theme": {
        const targetTheme = args[1]?.toLowerCase();
        const validThemes = ["peach", "dark", "neon", "light"];
        if (validThemes.includes(targetTheme)) {
          onChangeTheme(targetTheme);
          newHistory.push({ text: `Theme updated to '${targetTheme}'.`, type: "output" });
        } else {
          newHistory.push({
            text: `Invalid theme choice. Try: theme [peach | dark | neon | light]`,
            type: "error",
          });
        }
        break;
      }

      case "wallpaper": {
        const targetWp = args[1]?.toLowerCase();
        const validWps = ["stripes", "grid", "aurora", "solid"];
        const wpMap = { stripes: "stripes", grid: "retro-grid", aurora: "nebula", solid: "solid" };
        if (validWps.includes(targetWp)) {
          onChangeWallpaper(wpMap[targetWp]);
          newHistory.push({ text: `Wallpaper updated to '${targetWp}'.`, type: "output" });
        } else {
          newHistory.push({
            text: `Invalid wallpaper choice. Try: wallpaper [stripes | grid | aurora | solid]`,
            type: "error",
          });
        }
        break;
      }

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newHistory.push({
          text: `Command not found: '${command}'. Type 'help' for suggestions.`,
          type: "error",
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  return (
    <div
      className="terminal-shell"
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="terminal-log">
        {history.map((h, index) => (
          <pre key={index} className={`log-line ${h.type}`}>
            {h.text}
          </pre>
        ))}
      </div>
      <form onSubmit={handleCommandSubmit} className="terminal-input-row">
        <span className="prompt-label">deepak@playground:~$ </span>
        <input
          type="text"
          ref={inputRef}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="terminal-input"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
