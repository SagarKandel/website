'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Stats {
  pageViews: { total: number; today: number; week: number; month: number }
  leads: { total: number; new: number }
  resumeDownloads: { total: number; month: number }
}
interface ViewsData { date: string; views: number }
interface GeoData { country: string; count: number }
interface DeviceData { device: string; count: number }
interface BrowserData { browser: string; count: number }
interface ReferrerData { referrer: string; count: number }
interface PageData { page: string; total: number; month: number }
interface RealtimeSession { sessionId: string; page: string; lastSeen: string; country: string | null; device: string | null }
interface Lead {
  id: string; name: string; email: string; subject: string
  message: string; status: string; country: string | null; createdAt: string
}
interface Project {
  id: string; title: string; description: string; longDesc: string | null
  tech: string[]; github: string | null; demo: string | null
  featured: boolean; order: number; published: boolean
}
interface Experience {
  id: string; company: string; role: string; startDate: string
  endDate: string | null; description: string; tech: string[]; order: number
}
interface Skill {
  id: string; name: string; category: string; level: number; order: number
}
interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string
  tags: string[]; published: boolean; publishedAt: string | null; createdAt: string
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, highlight }: { label: string; value: number | string; sub?: string; highlight?: boolean }) {
  return (
    <div className={`bg-[#041209] border p-6 ${highlight ? 'border-[#00ff7f]/60' : 'border-[#0d3320]'}`}>
      <p className="text-[#4a7a5e] text-xs font-mono tracking-widest mb-2">{label}</p>
      <p className={`font-mono text-4xl ${highlight ? 'text-[#00ffcc]' : 'text-[#00ff7f]'}`}
        style={{ textShadow: `0 0 20px rgba(0,255,${highlight ? '200' : '127'},0.5)` }}>
        {value}
      </p>
      {sub && <p className="text-[#4a7a5e] text-xs mt-1">{sub}</p>}
    </div>
  )
}

function Tab({ label, active, onClick, badge }: { label: string; active: boolean; onClick: () => void; badge?: string | number }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-4 py-2 border tracking-widest uppercase transition-all ${
        active ? 'border-[#00ff7f] text-[#00ff7f] bg-[#041209]' : 'border-[#0d3320] text-[#4a7a5e] hover:border-[#00ff7f]/50'
      }`}
    >
      {label}
      {badge ? <span className="ml-2 text-[#ff3333]">[{badge}]</span> : null}
    </button>
  )
}

function BarList({ items, labelKey, valueKey }: { items: any[]; labelKey: string; valueKey: string }) {
  const max = Math.max(...items.map((i) => i[valueKey]), 1)
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-xs text-[#4a7a5e] w-5 text-right">{i + 1}</span>
          <span className="text-xs text-[#b4ffda] flex-1 truncate">{item[labelKey] || 'Unknown'}</span>
          <div className="w-24 h-1 bg-[#0d3320]">
            <div className="h-full bg-[#00ff7f]" style={{ width: `${(item[valueKey] / max) * 100}%` }} />
          </div>
          <span className="text-xs text-[#00ff7f] w-8 text-right">{item[valueKey]}</span>
        </div>
      ))}
    </div>
  )
}

// ── CMS Forms ─────────────────────────────────────────────────────────────────

function ProjectForm({ initial, onSave, onCancel }: { initial?: Partial<Project>; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    longDesc: initial?.longDesc || '',
    tech: (initial?.tech || []).join(', '),
    github: initial?.github || '',
    demo: initial?.demo || '',
    featured: initial?.featured ?? false,
    order: initial?.order ?? 0,
    published: initial?.published ?? true,
  })
  return (
    <div className="bg-[#041209] border border-[#0d3320] p-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <Field label="tech (comma separated)" value={form.tech} onChange={(v) => setForm({ ...form, tech: v })} />
      </div>
      <Field label="description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
      <Field label="long description" value={form.longDesc} onChange={(v) => setForm({ ...form, longDesc: v })} textarea />
      <div className="grid grid-cols-2 gap-3">
        <Field label="github url" value={form.github} onChange={(v) => setForm({ ...form, github: v })} />
        <Field label="demo url" value={form.demo} onChange={(v) => setForm({ ...form, demo: v })} />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-xs text-[#4a7a5e] cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[#00ff7f]" />
          featured
        </label>
        <label className="flex items-center gap-2 text-xs text-[#4a7a5e] cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#00ff7f]" />
          published
        </label>
        <label className="flex items-center gap-2 text-xs text-[#4a7a5e]">
          order
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="w-16 bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-xs px-2 py-1 focus:outline-none focus:border-[#00ff7f]" />
        </label>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave({ ...form, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean) })}
          className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
          save
        </button>
        <button onClick={onCancel} className="text-xs border border-[#0d3320] text-[#4a7a5e] px-4 py-2 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">
          cancel
        </button>
      </div>
    </div>
  )
}

function ExperienceForm({ initial, onSave, onCancel }: { initial?: Partial<Experience>; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    company: initial?.company || '',
    role: initial?.role || '',
    startDate: initial?.startDate || '',
    endDate: initial?.endDate || '',
    description: initial?.description || '',
    tech: (initial?.tech || []).join(', '),
    order: initial?.order ?? 0,
  })
  return (
    <div className="bg-[#041209] border border-[#0d3320] p-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
        <Field label="role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Field label="start date (e.g. Jan 2022)" value={form.startDate} onChange={(v) => setForm({ ...form, startDate: v })} />
        <Field label="end date (blank = present)" value={form.endDate} onChange={(v) => setForm({ ...form, endDate: v })} />
        <Field label="tech (comma separated)" value={form.tech} onChange={(v) => setForm({ ...form, tech: v })} />
      </div>
      <Field label="description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} textarea />
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave({ ...form, tech: form.tech.split(',').map((t) => t.trim()).filter(Boolean), endDate: form.endDate || null })}
          className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
          save
        </button>
        <button onClick={onCancel} className="text-xs border border-[#0d3320] text-[#4a7a5e] px-4 py-2 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">
          cancel
        </button>
      </div>
    </div>
  )
}

function SkillForm({ initial, onSave, onCancel }: { initial?: Partial<Skill>; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    category: initial?.category || '',
    level: initial?.level ?? 80,
    order: initial?.order ?? 0,
  })
  return (
    <div className="bg-[#041209] border border-[#0d3320] p-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="skill name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
      </div>
      <div className="flex gap-6 items-center">
        <label className="text-xs text-[#4a7a5e]">
          level ({form.level}%)
          <input type="range" min={0} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
            className="ml-2 w-32 accent-[#00ff7f]" />
        </label>
        <label className="text-xs text-[#4a7a5e]">
          order
          <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="ml-2 w-16 bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-xs px-2 py-1 focus:outline-none focus:border-[#00ff7f]" />
        </label>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave(form)}
          className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
          save
        </button>
        <button onClick={onCancel} className="text-xs border border-[#0d3320] text-[#4a7a5e] px-4 py-2 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">
          cancel
        </button>
      </div>
    </div>
  )
}

function PostForm({ initial, onSave, onCancel }: { initial?: Partial<BlogPost>; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    excerpt: initial?.excerpt || '',
    content: initial?.content || '',
    tags: (initial?.tags || []).join(', '),
    published: initial?.published ?? false,
  })
  const autoSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return (
    <div className="bg-[#041209] border border-[#0d3320] p-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Field label="title" value={form.title} onChange={(v) => setForm({ ...form, title: v, slug: autoSlug(v) })} />
        <Field label="slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} />
      </div>
      <Field label="excerpt" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} />
      <Field label="content (markdown)" value={form.content} onChange={(v) => setForm({ ...form, content: v })} textarea rows={10} />
      <div className="flex gap-6 items-center">
        <Field label="tags (comma separated)" value={form.tags} onChange={(v) => setForm({ ...form, tags: v })} />
        <label className="flex items-center gap-2 text-xs text-[#4a7a5e] cursor-pointer mt-4 whitespace-nowrap">
          <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#00ff7f]" />
          published
        </label>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave({ ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) })}
          className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
          save
        </button>
        <button onClick={onCancel} className="text-xs border border-[#0d3320] text-[#4a7a5e] px-4 py-2 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">
          cancel
        </button>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, textarea, rows }: {
  label: string; value: string; onChange: (v: string) => void; textarea?: boolean; rows?: number
}) {
  const cls = "w-full bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00ff7f]"
  return (
    <div>
      <label className="text-xs text-[#4a7a5e] font-mono block mb-1">{label}</label>
      {textarea
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows || 3} className={cls} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

type TabName = 'overview' | 'traffic' | 'leads' | 'projects' | 'experience' | 'skills' | 'blog'

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabName>('overview')

  // Analytics data
  const [stats, setStats] = useState<Stats | null>(null)
  const [viewsData, setViewsData] = useState<ViewsData[]>([])
  const [geoData, setGeoData] = useState<GeoData[]>([])
  const [deviceData, setDeviceData] = useState<DeviceData[]>([])
  const [browserData, setBrowserData] = useState<BrowserData[]>([])
  const [referrerData, setReferrerData] = useState<ReferrerData[]>([])
  const [pageData, setPageData] = useState<PageData[]>([])
  const [realtime, setRealtime] = useState<{ count: number; sessions: RealtimeSession[] }>({ count: 0, sessions: [] })

  // Leads
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadTotal, setLeadTotal] = useState(0)
  const [leadFilter, setLeadFilter] = useState('')

  // CMS data
  const [projects, setProjects] = useState<Project[]>([])
  const [experience, setExperience] = useState<Experience[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [posts, setPosts] = useState<BlogPost[]>([])

  // CMS editing state
  const [editingProject, setEditingProject] = useState<string | null>(null)  // id or 'new'
  const [editingExp, setEditingExp] = useState<string | null>(null)
  const [editingSkill, setEditingSkill] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<string | null>(null)

  const realtimeInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  const apiFetch = useCallback((path: string, opts?: RequestInit) => {
    const t = token || localStorage.getItem('sk_admin_token')
    return fetch(`${API}${path}`, {
      ...opts,
      headers: { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json', ...(opts?.headers || {}) },
    })
  }, [token])

  const fetchAnalytics = useCallback(async (t: string) => {
    const headers = { Authorization: `Bearer ${t}` }
    const [s, v, g, d, br, rf, pg, rt, l] = await Promise.all([
      fetch(`${API}/dashboard/stats`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/views-over-time`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/geo`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/devices`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/browsers`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/referrers`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/pages`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/realtime`, { headers }).then((r) => r.json()),
      fetch(`${API}/dashboard/leads?limit=50`, { headers }).then((r) => r.json()),
    ])
    setStats(s); setViewsData(v); setGeoData(g); setDeviceData(d)
    setBrowserData(br); setReferrerData(rf); setPageData(pg); setRealtime(rt)
    setLeads(l.leads || []); setLeadTotal(l.total || 0)
  }, [])

  const fetchCms = useCallback(async () => {
    const [proj, exp, sk, bl] = await Promise.all([
      apiFetch('/cms/projects').then((r) => r.json()),
      apiFetch('/cms/experience').then((r) => r.json()),
      apiFetch('/cms/skills').then((r) => r.json()),
      apiFetch('/cms/posts?all=true').then((r) => r.json()),
    ])
    setProjects(Array.isArray(proj) ? proj : [])
    setExperience(Array.isArray(exp) ? exp : [])
    setSkills(Array.isArray(sk) ? sk : [])
    setPosts(Array.isArray(bl) ? bl : [])
  }, [apiFetch])

  useEffect(() => {
    const saved = localStorage.getItem('sk_admin_token')
    if (saved) {
      setToken(saved)
      fetchAnalytics(saved)
      fetchCms()
    }
  }, [fetchAnalytics, fetchCms])

  // Poll realtime every 30s
  useEffect(() => {
    if (!token) return
    realtimeInterval.current = setInterval(async () => {
      const rt = await apiFetch('/dashboard/realtime').then((r) => r.json()).catch(() => null)
      if (rt) setRealtime(rt)
    }, 30000)
    return () => { if (realtimeInterval.current) clearInterval(realtimeInterval.current) }
  }, [token, apiFetch])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setLoginError('')
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('sk_admin_token', data.token)
      setToken(data.token)
      fetchAnalytics(data.token)
      fetchCms()
    } catch (err: any) { setLoginError(err.message) }
    finally { setLoading(false) }
  }

  const handleLogout = () => { localStorage.removeItem('sk_admin_token'); setToken(null) }

  const updateLeadStatus = async (id: string, status: string) => {
    await apiFetch(`/dashboard/leads/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)))
  }

  // CMS helpers
  const cmsCreate = async (entity: string, data: any, setter: (items: any[]) => void, current: any[]) => {
    const res = await apiFetch(`/cms/${entity}`, { method: 'POST', body: JSON.stringify(data) })
    const item = await res.json()
    setter([...current, item])
  }
  const cmsUpdate = async (entity: string, id: string, data: any, setter: (items: any[]) => void, current: any[]) => {
    const res = await apiFetch(`/cms/${entity}/${id}`, { method: 'PUT', body: JSON.stringify(data) })
    const item = await res.json()
    setter(current.map((x) => (x.id === id ? item : x)))
  }
  const cmsDelete = async (entity: string, id: string, setter: (items: any[]) => void, current: any[]) => {
    if (!confirm('Delete this item?')) return
    await apiFetch(`/cms/${entity}/${id}`, { method: 'DELETE' })
    setter(current.filter((x) => x.id !== id))
  }

  const maxViews = Math.max(...viewsData.map((d) => d.views), 1)

  const statusColors: Record<string, string> = {
    NEW: 'text-[#00ff7f] border-[#00ff7f]', READ: 'text-[#ffb800] border-[#ffb800]',
    REPLIED: 'text-[#00d4ff] border-[#00d4ff]', ARCHIVED: 'text-[#4a7a5e] border-[#4a7a5e]',
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-[#020c06] flex items-center justify-center p-4" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,127,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,127,0.02) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-[#00ff7f] font-mono text-2xl mb-1" style={{ textShadow: '0 0 20px rgba(0,255,127,0.5)' }}>SK_ADMIN</p>
            <p className="text-[#4a7a5e] text-xs font-mono tracking-widest">SECURE ACCESS PORTAL</p>
          </div>
          <div className="bg-[#041209] border border-[#0d3320] p-8">
            <p className="text-xs text-[#4a7a5e] font-mono mb-6"><span className="text-[#00ff7f]">$</span> sudo authenticate --admin</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs text-[#4a7a5e] font-mono block mb-1">email</label>
                <input type="email" required value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00ff7f]" />
              </div>
              <div>
                <label className="text-xs text-[#4a7a5e] font-mono block mb-1">password</label>
                <input type="password" required value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-[#020c06] border border-[#0d3320] text-[#b4ffda] font-mono text-sm px-3 py-2 focus:outline-none focus:border-[#00ff7f]" />
              </div>
              {loginError && <p className="text-[#ff3333] text-xs font-mono">[ERROR] {loginError}</p>}
              <button type="submit" disabled={loading}
                className="w-full bg-transparent border border-[#00ff7f] text-[#00ff7f] font-mono text-xs tracking-widest uppercase py-3 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all disabled:opacity-50">
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
          <p className="text-[#00ff7f] text-lg" style={{ textShadow: '0 0 10px rgba(0,255,127,0.5)' }}>SK_DASHBOARD</p>
          <p className="text-[#4a7a5e] text-xs tracking-widest">sagarkandel.com — analytics & content</p>
        </div>
        <div className="flex items-center gap-4">
          {realtime.count > 0 && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff7f] rounded-full animate-pulse" />
              <span className="text-xs text-[#00ff7f]">{realtime.count} live now</span>
            </div>
          )}
          <a href="/" className="text-xs text-[#4a7a5e] hover:text-[#00ff7f] transition-colors">← portfolio</a>
          <button onClick={handleLogout}
            className="text-xs border border-[#4a7a5e] text-[#4a7a5e] px-3 py-1.5 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">
            logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Tab label="overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <Tab label="traffic" active={activeTab === 'traffic'} onClick={() => setActiveTab('traffic')} />
          <Tab label="leads" active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} badge={stats?.leads.new || undefined} />
          <Tab label="projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <Tab label="experience" active={activeTab === 'experience'} onClick={() => setActiveTab('experience')} />
          <Tab label="skills" active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
          <Tab label="blog" active={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
        </div>

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <>
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <StatCard label="LIVE VISITORS" value={realtime.count} highlight />
                <StatCard label="VIEWS TODAY" value={stats.pageViews.today} sub={`${stats.pageViews.week} this week`} />
                <StatCard label="VIEWS THIS MONTH" value={stats.pageViews.month} sub={`${stats.pageViews.total} total`} />
                <StatCard label="LEADS" value={stats.leads.total} sub={`${stats.leads.new} unread`} />
                <StatCard label="RESUME DOWNLOADS" value={stats.resumeDownloads.total} sub={`${stats.resumeDownloads.month} this month`} />
              </div>
            )}

            {/* 30-day chart */}
            <div className="bg-[#041209] border border-[#0d3320] p-6 mb-6">
              <p className="text-xs text-[#4a7a5e] tracking-widest mb-6">
                <span className="text-[#00ff7f]">// </span>PAGE VIEWS — LAST 30 DAYS
              </p>
              <div className="flex items-end gap-1 h-40">
                {viewsData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center group">
                    <div className="w-full bg-[#00ff7f]/20 hover:bg-[#00ff7f]/40 transition-all relative"
                      style={{ height: `${(d.views / maxViews) * 100}%`, minHeight: d.views > 0 ? '4px' : '0' }}>
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

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#041209] border border-[#0d3320] p-6">
                <p className="text-xs text-[#4a7a5e] tracking-widest mb-4"><span className="text-[#00ff7f]">// </span>TOP COUNTRIES</p>
                <BarList items={geoData.slice(0, 8)} labelKey="country" valueKey="count" />
              </div>
              <div className="bg-[#041209] border border-[#0d3320] p-6">
                <p className="text-xs text-[#4a7a5e] tracking-widest mb-4"><span className="text-[#00ff7f]">// </span>DEVICES</p>
                <BarList items={deviceData} labelKey="device" valueKey="count" />
              </div>
              <div className="bg-[#041209] border border-[#0d3320] p-6">
                <p className="text-xs text-[#4a7a5e] tracking-widest mb-4"><span className="text-[#00ff7f]">// </span>BROWSERS</p>
                <BarList items={browserData} labelKey="browser" valueKey="count" />
              </div>
            </div>
          </>
        )}

        {/* ── Traffic ── */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            {/* Page breakdown */}
            <div className="bg-[#041209] border border-[#0d3320] p-6">
              <p className="text-xs text-[#4a7a5e] tracking-widest mb-4"><span className="text-[#00ff7f]">// </span>TOP PAGES</p>
              <div className="space-y-3">
                {pageData.map((p, i) => {
                  const max = pageData[0]?.total || 1
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-[#4a7a5e] w-5 text-right">{i + 1}</span>
                      <span className="text-xs text-[#b4ffda] w-32 truncate">{p.page}</span>
                      <div className="flex-1 h-1 bg-[#0d3320]">
                        <div className="h-full bg-[#00ff7f]" style={{ width: `${(p.total / max) * 100}%` }} />
                      </div>
                      <span className="text-xs text-[#00ff7f] w-12 text-right">{p.total} total</span>
                      <span className="text-xs text-[#4a7a5e] w-16 text-right">{p.month} / 30d</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Referrers */}
            <div className="bg-[#041209] border border-[#0d3320] p-6">
              <p className="text-xs text-[#4a7a5e] tracking-widest mb-4"><span className="text-[#00ff7f]">// </span>TOP REFERRERS</p>
              <BarList items={referrerData} labelKey="referrer" valueKey="count" />
            </div>

            {/* Live sessions */}
            <div className="bg-[#041209] border border-[#0d3320] p-6">
              <p className="text-xs text-[#4a7a5e] tracking-widest mb-4">
                <span className="text-[#00ff7f]">// </span>ACTIVE SESSIONS (last 5 min)
                <span className="ml-3 text-[#00ff7f]">{realtime.count} active</span>
              </p>
              {realtime.sessions.length === 0 ? (
                <p className="text-xs text-[#4a7a5e]">no active sessions</p>
              ) : (
                <div className="space-y-2">
                  {realtime.sessions.map((s, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs">
                      <span className="w-2 h-2 bg-[#00ff7f] rounded-full animate-pulse" />
                      <span className="text-[#b4ffda]">{s.page}</span>
                      <span className="text-[#4a7a5e]">{s.device || 'unknown'}</span>
                      <span className="text-[#4a7a5e]">{s.country || '—'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Leads ── */}
        {activeTab === 'leads' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#4a7a5e]"><span className="text-[#00ff7f]">{leadTotal}</span> total leads</p>
              <div className="flex gap-2">
                {['', 'NEW', 'READ', 'REPLIED', 'ARCHIVED'].map((s) => (
                  <button key={s} onClick={() => setLeadFilter(s)}
                    className={`text-xs px-3 py-1 border transition-all ${leadFilter === s ? 'border-[#00ff7f] text-[#00ff7f]' : 'border-[#0d3320] text-[#4a7a5e] hover:border-[#00ff7f]/50'}`}>
                    {s || 'ALL'}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {leads.filter((l) => !leadFilter || l.status === leadFilter).map((lead) => (
                <div key={lead.id} className="bg-[#041209] border border-[#0d3320] p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#00ff7f] text-sm">{lead.name}</span>
                        <span className={`text-[10px] border px-2 py-0.5 ${statusColors[lead.status] || 'text-[#4a7a5e] border-[#4a7a5e]'}`}>{lead.status}</span>
                      </div>
                      <p className="text-[#4a7a5e] text-xs">{lead.email} · {lead.country || 'Unknown'} · {new Date(lead.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      {['READ', 'REPLIED', 'ARCHIVED'].map((s) => (
                        <button key={s} onClick={() => updateLeadStatus(lead.id, s)}
                          className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-2 py-1 hover:border-[#00ff7f] hover:text-[#00ff7f] transition-all">
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#ffb800] text-xs mb-2">Subject: {lead.subject}</p>
                  <p className="text-[#b4ffda]/70 text-sm leading-relaxed">{lead.message}</p>
                  <div className="mt-3 pt-3 border-t border-[#0d3320]">
                    <a href={`mailto:${lead.email}?subject=Re: ${lead.subject}`} className="text-xs text-[#00ff7f] hover:underline">→ Reply via email</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Projects CMS ── */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#4a7a5e]"><span className="text-[#00ff7f]">{projects.length}</span> projects</p>
              <button onClick={() => setEditingProject('new')}
                className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
                + new project
              </button>
            </div>
            {editingProject === 'new' && (
              <ProjectForm
                onSave={async (data) => { await cmsCreate('projects', data, setProjects, projects); setEditingProject(null) }}
                onCancel={() => setEditingProject(null)}
              />
            )}
            {projects.map((p) => (
              <div key={p.id}>
                {editingProject === p.id ? (
                  <ProjectForm initial={p}
                    onSave={async (data) => { await cmsUpdate('projects', p.id, data, setProjects, projects); setEditingProject(null) }}
                    onCancel={() => setEditingProject(null)}
                  />
                ) : (
                  <div className="bg-[#041209] border border-[#0d3320] p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#00ff7f] text-sm">{p.title}</span>
                        {p.featured && <span className="text-[10px] border border-[#ffb800] text-[#ffb800] px-2 py-0.5">FEATURED</span>}
                        {!p.published && <span className="text-[10px] border border-[#4a7a5e] text-[#4a7a5e] px-2 py-0.5">DRAFT</span>}
                      </div>
                      <p className="text-[#b4ffda]/70 text-xs mb-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.tech.map((t) => <span key={t} className="text-[10px] bg-[#0d3320] text-[#4a7a5e] px-2 py-0.5">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditingProject(p.id)} className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-3 py-1.5 hover:border-[#00ff7f] hover:text-[#00ff7f] transition-all">edit</button>
                      <button onClick={() => cmsDelete('projects', p.id, setProjects, projects)} className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-3 py-1.5 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Experience CMS ── */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#4a7a5e]"><span className="text-[#00ff7f]">{experience.length}</span> entries</p>
              <button onClick={() => setEditingExp('new')}
                className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
                + new entry
              </button>
            </div>
            {editingExp === 'new' && (
              <ExperienceForm
                onSave={async (data) => { await cmsCreate('experience', data, setExperience, experience); setEditingExp(null) }}
                onCancel={() => setEditingExp(null)}
              />
            )}
            {experience.map((e) => (
              <div key={e.id}>
                {editingExp === e.id ? (
                  <ExperienceForm initial={e}
                    onSave={async (data) => { await cmsUpdate('experience', e.id, data, setExperience, experience); setEditingExp(null) }}
                    onCancel={() => setEditingExp(null)}
                  />
                ) : (
                  <div className="bg-[#041209] border border-[#0d3320] p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#00ff7f] text-sm">{e.role}</span>
                        <span className="text-[#4a7a5e] text-xs">@ {e.company}</span>
                      </div>
                      <p className="text-[#4a7a5e] text-xs mb-2">{e.startDate} — {e.endDate || 'Present'}</p>
                      <p className="text-[#b4ffda]/70 text-xs mb-2">{e.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {e.tech.map((t) => <span key={t} className="text-[10px] bg-[#0d3320] text-[#4a7a5e] px-2 py-0.5">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditingExp(e.id)} className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-3 py-1.5 hover:border-[#00ff7f] hover:text-[#00ff7f] transition-all">edit</button>
                      <button onClick={() => cmsDelete('experience', e.id, setExperience, experience)} className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-3 py-1.5 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Skills CMS ── */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#4a7a5e]"><span className="text-[#00ff7f]">{skills.length}</span> skills across {new Set(skills.map((s) => s.category)).size} categories</p>
              <button onClick={() => setEditingSkill('new')}
                className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
                + new skill
              </button>
            </div>
            {editingSkill === 'new' && (
              <SkillForm
                onSave={async (data) => { await cmsCreate('skills', data, setSkills, skills); setEditingSkill(null) }}
                onCancel={() => setEditingSkill(null)}
              />
            )}
            {/* Group by category */}
            {Array.from(new Set(skills.map((s) => s.category))).map((cat) => (
              <div key={cat} className="bg-[#041209] border border-[#0d3320] p-5">
                <p className="text-xs text-[#4a7a5e] tracking-widest mb-4"><span className="text-[#00ff7f]">// </span>{cat.toUpperCase()}</p>
                <div className="space-y-3">
                  {skills.filter((s) => s.category === cat).map((sk) => (
                    <div key={sk.id}>
                      {editingSkill === sk.id ? (
                        <SkillForm initial={sk}
                          onSave={async (data) => { await cmsUpdate('skills', sk.id, data, setSkills, skills); setEditingSkill(null) }}
                          onCancel={() => setEditingSkill(null)}
                        />
                      ) : (
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-[#b4ffda] w-32">{sk.name}</span>
                          <div className="flex-1 h-1 bg-[#0d3320]">
                            <div className="h-full bg-[#00ff7f]/60" style={{ width: `${sk.level}%` }} />
                          </div>
                          <span className="text-xs text-[#4a7a5e] w-10 text-right">{sk.level}%</span>
                          <button onClick={() => setEditingSkill(sk.id)} className="text-[10px] text-[#4a7a5e] hover:text-[#00ff7f] transition-colors">edit</button>
                          <button onClick={() => cmsDelete('skills', sk.id, setSkills, skills)} className="text-[10px] text-[#4a7a5e] hover:text-[#ff3333] transition-colors">del</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Blog CMS ── */}
        {activeTab === 'blog' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#4a7a5e]">
                <span className="text-[#00ff7f]">{posts.filter((p) => p.published).length}</span> published · {posts.filter((p) => !p.published).length} drafts
              </p>
              <button onClick={() => setEditingPost('new')}
                className="text-xs border border-[#00ff7f] text-[#00ff7f] px-4 py-2 hover:bg-[#00ff7f] hover:text-[#020c06] transition-all">
                + new post
              </button>
            </div>
            {editingPost === 'new' && (
              <PostForm
                onSave={async (data) => { await cmsCreate('posts', data, setPosts, posts); setEditingPost(null) }}
                onCancel={() => setEditingPost(null)}
              />
            )}
            {posts.map((p) => (
              <div key={p.id}>
                {editingPost === p.id ? (
                  <PostForm initial={p}
                    onSave={async (data) => { await cmsUpdate('posts', p.id, data, setPosts, posts); setEditingPost(null) }}
                    onCancel={() => setEditingPost(null)}
                  />
                ) : (
                  <div className="bg-[#041209] border border-[#0d3320] p-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[#00ff7f] text-sm">{p.title}</span>
                        <span className={`text-[10px] border px-2 py-0.5 ${p.published ? 'border-[#00ff7f] text-[#00ff7f]' : 'border-[#4a7a5e] text-[#4a7a5e]'}`}>
                          {p.published ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                      </div>
                      <p className="text-[#4a7a5e] text-xs mb-2">/{p.slug} · {new Date(p.createdAt).toLocaleDateString()}</p>
                      <p className="text-[#b4ffda]/70 text-xs mb-2">{p.excerpt}</p>
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => <span key={t} className="text-[10px] bg-[#0d3320] text-[#4a7a5e] px-2 py-0.5">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => setEditingPost(p.id)} className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-3 py-1.5 hover:border-[#00ff7f] hover:text-[#00ff7f] transition-all">edit</button>
                      <button onClick={() => cmsDelete('posts', p.id, setPosts, posts)} className="text-[10px] border border-[#0d3320] text-[#4a7a5e] px-3 py-1.5 hover:border-[#ff3333] hover:text-[#ff3333] transition-all">delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
