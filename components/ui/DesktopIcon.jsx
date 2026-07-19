"use client";

export default function DesktopIcon({ name, label, glyph, onClick }) {
  return (
    <div className={`icon ${name}`} onClick={onClick}>
      <div className="glyph">{glyph}</div>
      <div className="label">{label}</div>
    </div>
  );
}
