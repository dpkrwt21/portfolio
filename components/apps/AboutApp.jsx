"use client";

import { profileData } from "@/lib/data";

export default function AboutApp({ aboutTextTyped }) {
  return (
    <>
      <p className="prompt-line">{profileData.about.prompt}</p>
      <p>
        <span className="type-target">{aboutTextTyped}</span>
      </p>
      <p>{profileData.about.details}</p>
      <p>
        Based in <strong>{profileData.about.location}</strong> · Open to{" "}
        <strong>{profileData.about.status}</strong>
      </p>
    </>
  );
}
