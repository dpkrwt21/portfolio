"use client";

import { useState, useEffect } from "react";

export default function useWindowManager() {
  const [openWindows, setOpenWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    terminal: false,
    music: false,
    resume: false,
  });
  const [maximizedWindows, setMaximizedWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    terminal: false,
    music: false,
    resume: false,
  });
  const [minimizedWindows, setMinimizedWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    terminal: false,
    music: false,
    resume: false,
  });
  const [windowZIndices, setWindowZIndices] = useState({
    about: 20,
    projects: 20,
    skills: 20,
    contact: 20,
    terminal: 20,
    music: 20,
    resume: 20,
  });
  const [zTop, setZTop] = useState(20);
  const [positions, setPositions] = useState({
    about: { x: null, y: null, styleLeft: "8%", styleTop: "90px" },
    projects: { x: null, y: null, styleLeft: "32%", styleTop: "130px" },
    skills: { x: null, y: null, styleLeft: "16%", styleTop: "110px" },
    contact: { x: null, y: null, styleLeft: "40%", styleTop: "150px" },
    terminal: { x: null, y: null, styleLeft: "24%", styleTop: "170px" },
    music: { x: null, y: null, styleLeft: "48%", styleTop: "210px" },
    resume: { x: null, y: null, styleLeft: "56%", styleTop: "230px" },
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerHeight < 768) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPositions({
        about: { x: null, y: null, styleLeft: "6%", styleTop: "60px" },
        projects: { x: null, y: null, styleLeft: "24%", styleTop: "90px" },
        skills: { x: null, y: null, styleLeft: "12%", styleTop: "75px" },
        contact: { x: null, y: null, styleLeft: "30%", styleTop: "105px" },
        terminal: { x: null, y: null, styleLeft: "18%", styleTop: "120px" },
        music: { x: null, y: null, styleLeft: "36%", styleTop: "135px" },
        resume: { x: null, y: null, styleLeft: "42%", styleTop: "150px" },
      });
    }
  }, []);

  const focusWindow = (name) => {
    setZTop((prev) => {
      const nz = prev + 1;
      setWindowZIndices((prevZ) => ({ ...prevZ, [name]: nz }));
      return nz;
    });
  };

  const openWindow = (name) => {
    setOpenWindows((prev) => ({ ...prev, [name]: true }));
    setMinimizedWindows((prev) => ({ ...prev, [name]: false }));
    focusWindow(name);
  };

  const closeWindow = (name) => {
    setOpenWindows((prev) => ({ ...prev, [name]: false }));
  };

  const toggleMinimizeWindow = (name) => {
    setMinimizedWindows((prev) => ({ ...prev, [name]: !prev[name] }));
    if (minimizedWindows[name]) {
      focusWindow(name);
    }
  };

  const toggleMaximizeWindow = (name) => {
    setMaximizedWindows((prev) => ({ ...prev, [name]: !prev[name] }));
    focusWindow(name);
  };

  const toggleWindowFromChip = (name) => {
    if (!openWindows[name]) {
      openWindow(name);
      return;
    }
    if (minimizedWindows[name]) {
      setMinimizedWindows((prev) => ({ ...prev, [name]: false }));
      focusWindow(name);
    } else {
      const isTop = Object.keys(windowZIndices).every(
        (key) => !openWindows[key] || key === name || windowZIndices[name] >= windowZIndices[key]
      );
      if (isTop) {
        setMinimizedWindows((prev) => ({ ...prev, [name]: true }));
      } else {
        focusWindow(name);
      }
    }
  };

  const handleMaximizeAll = () => {
    const active = Object.keys(openWindows).reduce((acc, key) => {
      if (openWindows[key]) acc[key] = true;
      return acc;
    }, {});
    setMaximizedWindows((prev) => ({ ...prev, ...active }));
  };

  const handleMinimizeAll = () => {
    const active = Object.keys(openWindows).reduce((acc, key) => {
      if (openWindows[key]) acc[key] = true;
      return acc;
    }, {});
    setMinimizedWindows((prev) => ({ ...prev, ...active }));
  };

  const handleResetLayout = () => {
    setPositions({
      about: { x: null, y: null, styleLeft: "8%", styleTop: "90px" },
      projects: { x: null, y: null, styleLeft: "32%", styleTop: "130px" },
      skills: { x: null, y: null, styleLeft: "16%", styleTop: "110px" },
      contact: { x: null, y: null, styleLeft: "40%", styleTop: "150px" },
      terminal: { x: null, y: null, styleLeft: "24%", styleTop: "170px" },
      music: { x: null, y: null, styleLeft: "48%", styleTop: "210px" },
      resume: { x: null, y: null, styleLeft: "56%", styleTop: "230px" },
    });
    setMaximizedWindows({
      about: false,
      projects: false,
      skills: false,
      contact: false,
      terminal: false,
      music: false,
      resume: false,
    });
    setMinimizedWindows({
      about: false,
      projects: false,
      skills: false,
      contact: false,
      terminal: false,
      music: false,
      resume: false,
    });
  };

  const getWindowStyles = (name) => {
    const pos = positions[name];
    const baseStyles = {
      zIndex: windowZIndices[name],
    };
    if (maximizedWindows[name]) return baseStyles;

    if (pos.x !== null && pos.y !== null) {
      return {
        ...baseStyles,
        left: `${pos.x}px`,
        top: `${pos.y}px`,
      };
    }
    return {
      ...baseStyles,
      left: pos.styleLeft,
      top: pos.styleTop,
    };
  };

  return {
    openWindows,
    maximizedWindows,
    minimizedWindows,
    windowZIndices,
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
  };
}
