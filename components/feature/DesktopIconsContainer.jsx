"use client";

import { FiUser, FiFolder, FiCpu, FiMail, FiTerminal, FiMusic, FiFileText } from "react-icons/fi";
import DesktopIcon from "../ui/DesktopIcon";

export default function DesktopIconsContainer({ onOpenApp }) {
  return (
    <div id="icons">
      <DesktopIcon
        name="about"
        label="about.txt"
        glyph={<FiUser size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("about");
        }}
      />
      <DesktopIcon
        name="projects"
        label="projects/"
        glyph={<FiFolder size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("projects");
        }}
      />
      <DesktopIcon
        name="skills"
        label="skills.app"
        glyph={<FiCpu size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("skills");
        }}
      />
      <DesktopIcon
        name="contact"
        label="contact.sh"
        glyph={<FiMail size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("contact");
        }}
      />
      <DesktopIcon
        name="terminal"
        label="terminal.sh"
        glyph={<FiTerminal size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("terminal");
        }}
      />
      <DesktopIcon
        name="music"
        label="mp3.app"
        glyph={<FiMusic size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("music");
        }}
      />
      <DesktopIcon
        name="resume"
        label="resume.pdf"
        glyph={<FiFileText size={26} />}
        onClick={(e) => {
          e.stopPropagation();
          onOpenApp("resume");
        }}
      />
    </div>
  );
}
