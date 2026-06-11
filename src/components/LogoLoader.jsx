import { useEffect, useState } from 'react'
import './LogoLoader.css'

export default function LogoLoader({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1600)
    const hideTimer = setTimeout(() => onComplete?.(), 2100)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [onComplete])

  return (
    <div className={`logo-loader ${fadeOut ? 'fade-out' : ''}`} aria-hidden={fadeOut}>
      <div className="logo-loader-inner">
        <div className="logo-loader-ring" />
        <div className="logo-loader-ring logo-loader-ring-2" />
        <div className="logo-loader-icon">M</div>
      </div>
      <div className="logo-loader-brand">
        <span className="logo-loader-name">
          Master <em>Minds</em>
        </span>
        <span className="logo-loader-tagline">School of Excellence</span>
      </div>
      <div className="logo-loader-bar">
        <span className="logo-loader-bar-fill" />
      </div>
    </div>
  )
}
