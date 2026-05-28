'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import NetworkCanvas from './NetworkCanvas'

const BOOT = [
  { text: '▸ Initializing network stack...', delay: 300 },
  { text: '▸ Loading BGP routing table [789,432 prefixes]...', delay: 850 },
  { text: '▸ Establishing OSPF adjacencies...', delay: 1400 },
  { text: '▸ Syncing Proxmox cluster state...', delay: 1900 },
  { text: '▸ Mounting TrueNAS storage pools...', delay: 2350 },
  { text: '▸ Authenticating operator credentials...', delay: 2800 },
  { text: '__BLANK__', delay: 3200 },
  { text: 'ACCESS GRANTED', delay: 3400, accent: true },
]

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    BOOT.forEach((_, i) => {
      setTimeout(() => setVisible(i + 1), BOOT[i].delay)
    })
    setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 600)
    }, 4200)
  }, [onComplete])

  return (
    <motion.div
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-bg flex items-center justify-center"
    >
      <div className="absolute inset-0">
        <NetworkCanvas opacity={0.55} nodeCount={30} maxDist={160} packetCount={12} />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 net-grid" />

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Logo / brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex items-end gap-0.5">
            {[0, 1, 2, 3].map(i => (
              <span
                key={i}
                className="w-1 bg-cyan rounded-sm animate-pulse"
                style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-cyan tracking-[0.3em] uppercase">
            Network OS v4.2.1
          </span>
        </div>

        {/* Boot sequence */}
        <div className="font-mono text-sm space-y-1.5 min-h-[180px]">
          {BOOT.slice(0, visible).map((line, i) => {
            if (line.text === '__BLANK__') return <div key={i} className="h-3" />
            if (line.accent) {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-cyan text-2xl font-bold tracking-[0.25em] pt-1"
                  style={{ textShadow: '0 0 30px rgba(0,212,255,0.6)' }}
                >
                  {line.text}
                  <div className="text-sm text-text-2 font-normal tracking-widest mt-1">
                    // SAGAR KANDEL
                  </div>
                </motion.div>
              )
            }
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted"
              >
                {line.text}
              </motion.div>
            )
          })}
          {visible < BOOT.length && (
            <span className="text-cyan cursor-blink">█</span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-8 h-px bg-border overflow-hidden">
          <motion.div
            className="h-full bg-cyan"
            initial={{ width: '0%' }}
            animate={{ width: `${(visible / BOOT.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
