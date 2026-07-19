"use client";

import { profileData } from "@/lib/data";

export default function HeroHeader({ heroGlitch }) {
  const name = "Deepak Rawat";
  const restOfTitle = profileData.heroText.title.replace(name, "").trim();
  const actionParts = restOfTitle.split(profileData.heroText.highlight);

  return (
    <>
      {/* Desktop hero (right-aligned, hidden on mobile) */}
      <div id="heroText" className={heroGlitch ? "glitch" : ""}>
        <div className="hero-text-content">
          <h1 className="hero-name">{name}</h1>
          <h2 className="hero-subtitle-line">
            {actionParts[0]}
            <span className="accent">{profileData.heroText.highlight}</span>
            {actionParts[1]}
          </h2>
          <div className="sub">
            {profileData.heroText.sub}
            <span className="caret-blink">_</span>
          </div>
          {profileData.heroText.tags && (
            <div className="hero-tags">
              {profileData.heroText.tags.map((tag, idx) => (
                <span key={idx} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {profileData.heroText.avatar && (
          <div className="hero-avatar-container">
            <div className="crt-monitor">
              <div className="crt-screen relative">
                <div className="scanlines"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileData.heroText.avatar}
                  alt={`${profileData.name} Avatar`}
                  className="hero-avatar"
                />
              </div>
              <div className="crt-bezel">
                <span className="opacity-75">DEV_OS_SYS</span>
                <div className="flex items-center gap-1.5">
                  <span className="opacity-75">ONLINE</span>
                  <span className="power-led animate-pulse-green">●</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-only hero banner (visible only on small screens) */}
      <div id="mobileHero">
        <div id="mobileHeroInner">
          {profileData.heroText.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profileData.heroText.avatar}
              alt={`${profileData.name}`}
              className="mobile-hero-avatar"
            />
          )}
          <div className="mobile-hero-text">
            <h1 className="mobile-hero-name">{name}</h1>
            <p className="mobile-hero-sub">
              {profileData.heroText.sub}
            </p>
            {profileData.heroText.tags && (
              <div className="mobile-hero-tags">
                {profileData.heroText.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="mobile-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
