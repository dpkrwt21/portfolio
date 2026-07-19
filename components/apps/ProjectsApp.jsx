"use client";

import { profileData } from "@/lib/data";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectsApp() {
  return (
    <div className="projects-grid">
      {profileData.projects.map((p, index) => (
        <div key={index} className={`proj-card ${p.cardClass || ""} flex flex-col gap-2`}>
          {p.thumbnail && (
            <div className="proj-thumb-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.thumbnail}
                alt={p.title}
                className="proj-thumb"
              />
            </div>
          )}
          <div className="proj-info flex flex-col gap-1">
            <h4 className="font-bold text-sm">{p.title}</h4>
            <p className="text-xs opacity-90">{p.description}</p>
            <div className="tags flex flex-wrap gap-1 mt-1">
              {p.tags &&
                p.tags.map((t, idx) => (
                  <span key={idx} className="tag text-[9px] px-1.5 py-0.5 border border-ink">
                    {t}
                  </span>
                ))}
            </div>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="proj-link flex items-center gap-1 mt-2 text-xs font-bold"
            >
              Visit Project <FiArrowUpRight size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
