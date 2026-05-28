'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

interface Stats {
  pageViews: { total: number; today: number; week: number; month: number }
  leads: { total: number; new: number }
  resumeDownloads: { total: number; month: number }
}

interface ViewsData { date: string; views: number }
interface GeoData { country: string; count: number }
interface DeviceData { device: string; count: number }
interface Lead {
  id: string; name: string; email: string; subject: string
  message: string; status: string; country: string | null; createdAt: string
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="bg-[#041209] border border-[#0d3320] p-6">
      <p className="text-[#4a7a5e] text-xs font-mono tracking-widest mb-2">{label}</p>
      <p className="text-[#00ff7f] font-mono text-4xl" style={{ textShadow: '0 0 20px rgba(0,255,127,0.5)' }}>
        {value}
      </p>
      {sub && <p className="text-[#4a7a5e] text-xs mt-1">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  const [stats, setStats] = useState<Stats | null>(null)
  const [viewsData, setViewsData] = useState<ViewsData[]>([])
  const [geoData, setGeoData] = useState<GeoData[]>([])
  const [deviceData, setDeviceData] = useState<DeviceData[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadTotal, setLeadTotal] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'leads'>('overview')
  const [leadFilter, setLeadFilter] = useState('')

  const fetchData = useCallback(async (t: string) => {
    try {
      const headers = { Authorization: `Bearer ${t}` }
      const [s, v, g, d, l] = await Promise.all([
        fetch(`${API}/dashboard/stats`, { headers }).then((r) => r.json()),
        fetch(`${API}/dashboard/views-over-time`, { headers }).then((r) => r.json()),
        fetch(`${API}/dashboard/geo`, { headers }).then((r) => r.json()),
        fetch(`${API}/dashboard/devices`, { headers }).then((r) => r.json()),
        fetch(`${API}/dashboard/leads?limit=50`, { headers }).then((r) => r.json()),
      ])
      setStats(s)
      setViewsData(v)
      setGeoData(g)
      setDeviceData(d)
      setLeads(l.leads || [])
      setLeadTotal(l.total || 0)
    } catch (err) {
      console.error('Fetch failed', err)
    }
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('sk_admin_token')
    if (saved) {
      setToken(saved)
      fetchData(saved)
    }
  }, [fetchData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setLoginError('')
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('sk_admin_token', data.token)
      setToken(data.token)
      fetchData(data.token)
    } catch (err: any) {
      setLoginError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('sk_admin_token')
    setToken(null)
  }

  const updateLeadStatus = async (id: string, status: string) => {
    if (!token) return
    await fetch(`${API}/dashboard/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  const maxViews = Math.max(...viewsData.map((d) => d.views), 1)

  const statusColors: Record<string, string> = {
    NEW: 'text-[#00ff7f] border-[#00ff7f]',
    READ: 'text-[#ffb800] border-[#ffb800]',
    REPLIED: 'text-[#00d4ff] border-[#00d4ff]',
    ARCHIVED: 'text-[#4a7a5e] border-[#4a7a5e]',
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#020c06] flex items-center justify-center p-4" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,127,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,127,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-[#00ff7f] font-mono text-2xl mb-1" style={{ textShadow: '0 0 20px rgba(0,255,127,0.5)' }}>
              SK_ADMIN
            </p>
            <p className="text-[#4a7a5e] text-xs font-mono tracking-widest">SECURE ACCESS PORTAL</p>
          </div>

          <div className="bg-[#041209] border border-[#0d3320] p-8">
            <p className="text-xs text-[#4a7a5e] font-mono mb-6">
              <span className="text-[#00ff7f]">$</span> sudo authenticate --admin
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-[#4a7a5e] font-mono block mb-1">email</label>
                <input
                  type="email" required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00ff7f]"
                />
              </div>
              <div>
                <label className="text-xs text-[#4a7a5e] font-mono block mb-1">password</label>
                <input
                  type="password" required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00ff7f]"
                />
              </div>
              {loginError && (
                <p className="text-[#ff3333] text-xs font-mono">[ERROR] {loginError}</p>
              )}
              <button
                type="submit" disabled={loading}
                className="w-full bg-transparent border border-[#00ff7f] text-[#00ff7f] font-mono text-xs tracking-widest uppercase py-3 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all disabled:opacity-50"
              >
                {loading ? 'authenticating...' : 'login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020c06] text-[#b4ffda] font-mono" style={{
      backgroundImage: 'linear-gradient(rgba(0,255,127,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,127,0.02) 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }}>
      {/* Header */}
      <div className="border-b border-[#0d3320] px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#00ff7f] text-lg" style={{ textShadow: '0 0 10px rgba(0,255,127,0.5)' }}>
            SK_DASHBOARD
          </p>
          <p className="text-[#4a7a5e] text-xs tracking-widest">sagarkandel.com — analytics & leads</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs text-[#4a7a5e] hover:text-[#00ff7f] transition-colors">
            ← portfolio
          </a>
          <button
            onClick={handleLogout}
            className="text-xs border border-[#4a7a5e] text-[#4a7a5e] px-3 py-1.5 hover:border-[#ff3333] hover:text-[#ff3333] transition-all"
          >
            logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['overview', 'leads'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-4 py-2 border tracking-widest uppercase transition-all ${
                activeTab === tab
                  ? 'border-[#00ff7f] text-[#00ff7f] bg-[#041209]'
                  : 'border-[#0d3320] text-[#4a7a5e] hover:border-[#00ff7f]/50'
              }`}
            >
              {tab}
              {tab === 'leads' && stats?.leads.new ? (
                <span className="ml-2 text-[#ff3333]">[{stats.leads.new} new]</span>
              ) : null}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats grid */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="TOTAL PAGE VIEWS" value={stats.pageViews.total} />
                <StatCard label="VIEWS TODAY" value={stats.pageViews.today} sub={`${stats.pageViews.week} this week`} />
                <StatCard label="TOTAL LEADS" value={stats.leads.total} sub={`${stats.leads.new} unread`} />
                <StatCard label="RESUME DOWNLOADS" value={stats.resumeDownloads.total} sub={`${stats.resumeDownloads.month} this month`} />
              </div>
            )}

            {/* Chart: views over time */}
            <div className="bg-[#041209] border border-[#0d3320] p-6 mb-6">
              <p className="text-xs text-[#4a7a5e] tracking-widest mb-6">
                <span className="text-[#00ff7f]">// </span>PAGE VIEWS — LAST 30 DAYS
              </p>
              <div className="flex items-end gap-1 h-40">
                {viewsData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full bg-[#00ff7f]/20 hover:bg-[#00ff7f]/40 transition-all relative"
                      style={{
                        height: `${(d.views / maxViews) * 100}%`,
                        minHeight: d.views > 0 ? '4px' : '0',
                        boxShadow: d.views > 0 ? '0 0 6px rgba(0,255,127,0.3)' : 'none',
                      }}
                    >
                      {d.views > 0 && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-[#00ff7f] opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          {d.views}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-[#4a7a5e]">{viewsData[0]?.date}</span>
                <span className="text-[10px] text-[#4a7a5e]">{viewsData[viewsData.length - 1]?.date}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Geo */}
              <div className="bg-[#041209] border border-[#0d3320] p-6">
                <p className="text-xs text-[#4a7a5e] tracking-widest mb-4">
                  <span className="text-[#00ff7f]">// </span>TOP COUNTRIES
                </p>
                <div className="space-y-3">
                  {geoData.slice(0, 8).map((g, i) => {
                    const max = geoData[0]?.count || 1
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-[#4a7a5e] w-6 text-right">{i + 1}</span>
                        <span className="text-xs text-[#b4ffda] w-16">{g.country || 'Unknown'}</span>
                        <div className="flex-1 h-1 bg-[#0d3320]">
                          <div
                            className="h-full bg-[#00ff7f]"
                            style={{ width: `${(g.count / max) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#00ff7f] w-8 text-right">{g.count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Devices */}
              <div className="bg-[#041209] border border-[#0d3320] p-6">
                <p className="text-xs text-[#4a7a5e] tracking-widest mb-4">
                  <span className="text-[#00ff7f]">// </span>DEVICE BREAKDOWN
                </p>
                <div className="space-y-4">
                  {deviceData.map((d, i) => {
                    const total = deviceData.reduce((s, x) => s + x.count, 0) || 1
                    const pct = Math.round((d.count / total) * 100)
                    return (
                      <div key={i}>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-[#b4ffda] capitalize">{d.device}</span>
                          <span className="text-xs text-[#00ff7f]">{pct}%</span>
                        </div>
                        <div className="h-2 bg-[#0d3320]">
                          <div
                            className="h-full bg-[#00ff7f]/60"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#4a7a5e]">
                <span className="text-[#00ff7f]">{leadTotal}</span> total leads
              </p>
              <div className="flex gap-2">
                {['', 'NEW', 'READ', 'REPLIED', 'ARCHIVED'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setLeadFilter(s)}
                    className={`text-xs px-3 py-1 border transition-all ${
                      leadFilter === s
                        ? 'border-[#00ff7f] text-[#00ff7f]'
                        : 'border-[#0d3320] text-[#4a7a5e] hover:border-[#00ff7f]/50'
                    }`}
                  >
                    {s || 'ALL'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {leads
                .filter((l) => !leadFilter || l.status === leadFilter)
                .map((lead) => (
                  <div key={lead.id} className="bg-[#041209] border border-[#0d3320] p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[#00ff7f] text-sm">{lead.name}</span>
                          <span className={`text-[10px] border px-2 py-0.5 ${statusColors[lead.status] || 'text-[#4a7a5e] border-[#4a7a5e]'}`}>
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-[#4a7a5e] text-xs">
                          {lead.email} · {lead.country || 'Unknown'} · {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {['READ', 'REPLIED', 'ARCHIVED'].map((s) => (
                          <button
                            key={s}
                            onClick={() => updateLeadStatus(lead.id, s)}
                            className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-2 py-1 hover:border-[#00ff7f] hover:text-[#00ff7f] transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#ffb800] text-xs mb-2 font-mono">Subject: {lead.subject}</p>
                    <p className="text-[#b4ffda]/70 text-sm leading-relaxed">{lead.message}</p>
                    <div className="mt-3 pt-3 border-t border-[#0d3320]">
                      <a
                        href={`mailto:${lead.email}?subject=Re: ${lead.subject}`}
                        className="text-xs text-[#00ff7f] hover:underline"
                      >
                        → Reply via email
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
