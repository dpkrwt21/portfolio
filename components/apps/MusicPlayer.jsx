"use client";

import { useState, useEffect, useRef } from "react";
import { profileData } from "@/lib/data";
import {
  FiPlay,
  FiPause,
  FiSkipForward,
  FiSkipBack,
  FiVolume2,
} from "react-icons/fi";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playlist = profileData.music.tracks;
  const currentTrack = playlist[trackIndex];
  const audioRef = useRef(null);

  // Derived progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (secs) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleNext = () => {
    setTrackIndex((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
    setDuration(0);
  };

  const handlePrev = () => {
    setTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
    setDuration(0);
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Initialize single audio element client-side
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = volume / 100;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Sync track playback events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 0);
    const handleTrackEnded = () => {
      setTrackIndex((prev) => (prev + 1) % playlist.length);
      setCurrentTime(0);
      setDuration(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleTrackEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleTrackEnded);
    };
  }, [trackIndex, playlist.length]);

  // Sync source when trackIndex changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const track = playlist[trackIndex];
    if (track && track.url) {
      const wasPlaying = !audio.paused;
      audio.pause();
      audio.src = track.url;
      audio.load();

      if (wasPlaying) {
        audio.play().catch((err) => {
          console.error("Autoplay failed:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [trackIndex, playlist, setIsPlaying]);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      if (!audio.src) {
        const track = playlist[trackIndex];
        if (track && track.url) {
          audio.src = track.url;
          audio.load();
        }
      }
      audio.play().catch((err) => {
        console.error("Playback start failed:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, trackIndex, playlist, setIsPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player-panel flex flex-col gap-4">
      {/* Cassette deck casing wrapper */}
      <div className="cassette-casing flex flex-col justify-between">
        {/* Cassette Label and Spools */}
        <div className="cassette-label">
          {/* Left Spool */}
          <div className="cassette-spindle">
            <div className={`spindle-gears ${isPlaying ? "spinning" : ""}`}></div>
          </div>

          {/* Center Visualizer Bar Window */}
          <div className={`visualizer ${isPlaying ? "active" : ""}`}>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
            <span className="visualizer-bar"></span>
          </div>

          {/* Right Spool */}
          <div className="cassette-spindle">
            <div className={`spindle-gears ${isPlaying ? "spinning" : ""}`}></div>
          </div>
        </div>
        
        {/* Cassette brand text */}
        <div className="flex items-center justify-between text-[7.5px] font-bold uppercase tracking-wider px-1 opacity-70 mt-1">
          <span>OS-PLAYBACK DECK</span>
          <span>HIGH BIAS // TYPE II</span>
        </div>
      </div>

      {/* Track Details Digital Screen */}
      <div className="track-details-screen text-center p-2.5 border border-ink bg-panel/30 rounded flex flex-col gap-1">
        <div className="track-title font-bold text-xs truncate uppercase tracking-wider text-ink">
          {currentTrack.title}
        </div>
        <div className="track-artist text-[10px] opacity-75 font-semibold uppercase tracking-wide">
          {currentTrack.artist}
        </div>
      </div>

      {/* Progress Slider */}
      <div className="player-progress flex items-center gap-2">
        <span className="text-[10px] font-bold">{formatTime(currentTime)}</span>
        <div
          className="bar flex-1 relative h-2.5 border-2 border-ink overflow-hidden bg-panel cursor-pointer rounded-sm"
          onClick={handleProgressClick}
        >
          <div
            className="bar-fill h-full"
            style={{
              width: `${progress}%`,
              background: "var(--pink)",
            }}
          ></div>
        </div>
        <span className="text-[10px] font-bold">{duration ? formatTime(duration) : currentTrack.duration}</span>
      </div>

      {/* Controls */}
      <div className="player-controls flex justify-center gap-4 items-center">
        <button className="control-btn" onClick={handlePrev} title="Previous Track">
          <FiSkipBack size={14} />
        </button>
        <button className="control-btn play-pause-btn" onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
        </button>
        <button className="control-btn" onClick={handleNext} title="Next Track">
          <FiSkipForward size={14} />
        </button>
      </div>

      {/* Volume and Extras Footer */}
      <div className="player-footer flex justify-between items-center border-t border-ink/20 pt-3 mt-1">
        <div className="flex items-center gap-2 w-full justify-center">
          <FiVolume2 size={13} style={{ flexShrink: 0 }} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-2/3 volume-slider cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
