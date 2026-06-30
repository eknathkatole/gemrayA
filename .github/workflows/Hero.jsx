import React, { useState, useRef, useEffect, useCallback } from 'react';
import videoBg from '../assets/videoBg.mp4';
import './Hero.css';

const MutedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);

const UnmutedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const Hero = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const newMutedState = !video.muted;
      video.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  }, []);

  const handleInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playWithSound = async () => {
      try {
        video.muted = false;
        await video.play();
        setIsMuted(false);
        // If autoplay with sound succeeds, no need for interaction listeners
        return true;
      } catch (error) {
        // Autoplay with sound was blocked
        video.muted = true;
        setIsMuted(true);
        try {
          await video.play();
        } catch (playError) {
          console.error("Muted autoplay failed:", playError);
        }
        return false;
      }
    };

    const attemptPlay = async () => {
      const playedWithSound = await playWithSound();
      if (!playedWithSound) {
        // If autoplay with sound failed, listen for the first user interaction
        const events = ['click', 'touchstart', 'pointerdown'];
        const options = { once: true, capture: true };

        const enableAudio = () => {
          handleInteraction();
          events.forEach(event => document.removeEventListener(event, enableAudio, options));
        };

        events.forEach(event => document.addEventListener(event, enableAudio, options));

        return () => {
          events.forEach(event => document.removeEventListener(event, enableAudio, options));
        };
      }
    };

    const cleanup = attemptPlay();

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [handleInteraction]);

  useEffect(() => {
    if (hasInteracted && videoRef.current && videoRef.current.muted) {
      const video = videoRef.current;
      video.muted = false;
      setIsMuted(false);
      // Ensure it plays if it was paused by the browser
      video.play().catch(error => {
        console.error("Play after interaction failed:", error);
      });
    }
  }, [hasInteracted]);

  return (
    <div className='hero'>
      <video
        ref={videoRef}
        src={videoBg}
        autoPlay
        loop
        muted
        playsInline
        onClick={toggleMute}
        className="hero-video"
      />
      <button onClick={toggleMute} className="mute-button">
        {isMuted ? <MutedIcon /> : <UnmutedIcon />}
      </button>
      <div className="content">
        <h1>Welcome</h1>
        <p>To my site.</p>
      </div>
    </div>
  );
};

export default Hero;