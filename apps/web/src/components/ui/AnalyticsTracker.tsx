'use client'

import { useEffect, useRef } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

function getSessionId(): string {
  let id = sessionStorage.getItem('sk_session')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('sk_session', id)
  }
  return id
}

export default function AnalyticsTracker() {
  const sessionId = useRef(typeof window !== 'undefined' ? getSessionId() : '')

  useEffect(() => {
    const sid = getSessionId()
    sessionId.current = sid

    // Track initial page view
    fetch(`${API}/track/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: window.location.pathname,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        sessionId: sid,
      }),
    }).catch(() => {})

    // Heartbeat every 30s for realtime tracking
    const heartbeat = () => {
      fetch(`${API}/track/heartbeat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, page: window.location.pathname }),
      }).catch(() => {})
    }

    heartbeat()
    const interval = setInterval(heartbeat, 30000)
    return () => clearInterval(interval)
  }, [])

  return null
}
