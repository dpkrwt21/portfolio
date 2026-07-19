
"use client";

import { profileData } from "@/lib/data";
import { FiDownload, FiBriefcase, FiBookOpen, FiAward, FiPrinter } from "react-icons/fi";

export default function ResumeApp() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-container flex flex-col gap-5">
      {/* Header commands */}
      <div className="flex justify-between items-center border-b border-ink pb-3">
        <h3 className="font-bold text-lg text-ink">Deepak_Rawat_Resume.pdf</h3>
        <div className="flex gap-2">
          {profileData.resume.pdfUrl && (
            <a
              href={profileData.resume.pdfUrl}
              download="Deepak_Rawat_Resume.pdf"
              className="theme-btn text-xs px-2.5 py-1 flex items-center gap-1 no-underline text-ink"
            >
              <FiDownload size={12} /> Download PDF
            </a>
          )}
          <button className="theme-btn text-xs px-2.5 py-1 flex items-center gap-1 cursor-pointer" onClick={handlePrint}>
            <FiPrinter size={12} /> Print/Save
          </button>
        </div>
      </div>

      {/* Main Resume Body */}
      <div className="resume-body flex flex-col gap-4 text-xs leading-relaxed">
        {/* Intro */}
        <div className="flex flex-col gap-1">
          <h2 className="font-black text-sm uppercase tracking-wide text-ink">{profileData.name}</h2>
          <p className="opacity-90">{profileData.resume.role}</p>
        </div>

        {/* Experience Section */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-ink uppercase tracking-wider flex items-center gap-1 border-b border-ink pb-0.5">
            <FiBriefcase size={12} /> Experience
          </h4>
          <div className="flex flex-col gap-3">
            {profileData.resume.experience.map((exp, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex justify-between font-bold text-ink">
                  <span>{exp.role}</span>
                  <span className="opacity-80">{exp.period}</span>
                </div>
                <p className="opacity-90 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-ink uppercase tracking-wider flex items-center gap-1 border-b border-ink pb-0.5">
            <FiBookOpen size={12} /> Education
          </h4>
          {profileData.resume.education.map((edu, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex justify-between font-bold text-ink">
                <span>{edu.degree}</span>
                <span className="opacity-80">{edu.period}</span>
              </div>
              <p className="opacity-90 mt-1">{edu.description}</p>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-ink uppercase tracking-wider flex items-center gap-1 border-b border-ink pb-0.5">
            <FiAward size={12} /> Key Competencies
          </h4>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {profileData.skills.map((s, idx) => (
              <span key={idx} className="tech-tag text-[9px] px-2 py-0.5 border border-ink bg-panel">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
