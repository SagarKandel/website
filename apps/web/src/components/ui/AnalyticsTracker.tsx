'use client'

import { useEffect } from 'react'

export default function AnalyticsTracker() {
  useEffect(() => {
    const track = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/track/pageview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || null,
            userAgent: navigator.userAgent,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
          }),
        })
      } catch {
        // Silent fail — tracking should never break the site
      }
    }
    track()
  }, [])

  return null
}
