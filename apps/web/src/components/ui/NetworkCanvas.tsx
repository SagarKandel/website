'use client'

import { useEffect, useRef } from 'react'

interface Props {
  opacity?: number
  nodeCount?: number
  maxDist?: number
  packetCount?: number
  className?: string
}

export default function NetworkCanvas({
  opacity = 0.45,
  nodeCount = 35,
  maxDist = 150,
  packetCount = 10,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 2,
    }))

    const pkts = Array.from({ length: packetCount }, () => ({
      fi: Math.floor(Math.random() * nodeCount),
      ti: Math.floor(Math.random() * nodeCount),
      t: Math.random(),
      spd: 0.003 + Math.random() * 0.006,
    }))

    let raf: number

    function frame() {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) n.vx *= -1
        if (n.y < 0 || n.y > H) n.vy *= -1
      })

      // Edges
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < maxDist) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / maxDist) * 0.15})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // Packets
      pkts.forEach(p => {
        p.t += p.spd
        if (p.t >= 1) { p.t = 0; p.fi = p.ti; p.ti = Math.floor(Math.random() * nodeCount) }
        const f = nodes[p.fi], t = nodes[p.ti]
        const dx = t.x - f.x, dy = t.y - f.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d > maxDist || d < 10) return
        const px = f.x + dx * p.t, py = f.y + dy * p.t
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,255,0.9)'; ctx.fill()
        const g = ctx.createRadialGradient(px, py, 0, px, py, 9)
        g.addColorStop(0, 'rgba(0,212,255,0.25)'); g.addColorStop(1, 'rgba(0,212,255,0)')
        ctx.beginPath(); ctx.arc(px, py, 9, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })

      // Nodes
      nodes.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,255,0.07)'; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0,212,255,0.7)'; ctx.fill()
      })

      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [nodeCount, maxDist, packetCount])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  )
}
