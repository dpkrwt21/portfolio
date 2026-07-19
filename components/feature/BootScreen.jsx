"use client";

export default function BootScreen({ bootText, onSkip }) {
  return (
    <>
      <div id="boot">
        <span id="bootText">{bootText}</span>
        <span className="cursor-blink"></span>
      </div>
      <button id="skipBoot" onClick={onSkip}>
        skip ⏎
      </button>
    </>
  );
}
