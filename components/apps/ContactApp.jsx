"use client";

import { profileData } from "@/lib/data";
import { FiMail, FiGithub, FiLinkedin } from "react-icons/fi";

export default function ContactApp() {
  return (
    <>
      <p className="prompt-line">{profileData.contact.prompt}</p>
      <div className="contact-links">
        <a href={`mailto:${profileData.contact.email}`}>
          <FiMail size={16} /> &nbsp;{profileData.contact.email}
        </a>
        <a
          href={profileData.contact.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FiGithub size={16} /> &nbsp;github.com/{profileData.contact.github}
        </a>
        <a
          href={profileData.contact.linkedinUrl}
          target="_blank"
          rel="noreferrer"
        >
          <FiLinkedin size={16} /> &nbsp;linkedin.com/in/{profileData.contact.linkedin}
        </a>
      </div>
    </>
  );
}
