"use client";

import { profileData } from "@/lib/data";

export default function SkillsApp({ skillsAnimated }) {
  return (
    <>
      {profileData.skills.map((s, idx) => (
        <div key={idx} className="skill-row">
          <div className="label">
            <span>{s.name}</span>
            <span>{s.percentage}%</span>
          </div>
          <div className="bar">
            <div
              className="bar-fill"
              style={{
                background: s.color,
                width: skillsAnimated ? `${s.percentage}%` : "0%",
              }}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
}
