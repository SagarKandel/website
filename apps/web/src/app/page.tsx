import Navbar from '@/components/ui/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import BlogSection from '@/components/sections/BlogSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/ui/Footer'
import MatrixRain from '@/components/ui/MatrixRain'
import AnalyticsTracker from '@/components/ui/AnalyticsTracker'

export default function Home() {
  return (
    <>
      {/* Atmospheric overlays */}
      <div className="scan-line" />
      <div className="crt-overlay" />
      <div className="noise-overlay" />

      {/* Matrix background */}
      <MatrixRain />

      {/* Analytics tracker */}
      <AnalyticsTracker />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
