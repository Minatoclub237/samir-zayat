import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { scrollToHash } from './lib/utils'

const NAV_LINKS = [
  { label: 'À propos', href: '#a-propos' },
  { label: 'Le cabinet', href: '#le-cabinet' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export function ToothLogo() {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-7 md:h-9 md:w-8"
      aria-hidden="true"
    >
      {/* Tooth / pin outer shape */}
      <path
        d="M16 0C7.16 0 0 7.16 0 16c0 8.28 9.6 16.52 14.08 19.24a3.6 3.6 0 0 0 3.84 0C22.4 32.52 32 24.28 32 16 32 7.16 24.84 0 16 0Z"
        fill="white"
      />
      {/* Inner tooth shape */}
      <path
        d="M10.4 8.8c-2.32 0-4 1.84-4 4.32 0 3.44 1.52 5.2 2.24 9.04.24 1.28.4 2.64 1.6 2.64 1.68 0 .96-3.2 2.4-3.2h2.72c1.44 0 .72 3.2 2.4 3.2 1.2 0 1.36-1.36 1.6-2.64.72-3.84 2.24-5.6 2.24-9.04 0-2.48-1.68-4.32-4-4.32-1.6 0-2.4.8-3.6.8s-2-.8-3.6-.8Z"
        fill="#5F9AD1"
      />
    </svg>
  )
}

function ContactPill() {
  return (
    <a
      href="tel:0240892596"
      className="group flex items-center gap-3 rounded-full bg-white px-5 py-3"
    >
      <span className="text-lg text-black">Prendre un Rdv</span>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EBFA73] transition-transform duration-300 group-hover:scale-110">
        <ArrowUpRight className="h-4 w-4 text-[#5F9AD1]" />
      </span>
    </a>
  )
}

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-[#5F9AD1]">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 w-full top-[30%] h-[70%] object-cover object-[80%_center] md:inset-0 md:top-0 md:h-full md:object-center animate-[fadeIn_1.2s_ease-out_0.2s_both]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260710_141802_1d85412a-1df8-4993-8fc4-7400520bb1d1.mp4"
      />

      {/* Mobile gradient blend: solid blue top → video */}
      <div
        className="absolute left-0 top-[30%] z-[1] h-32 w-full bg-gradient-to-b from-[#5F9AD1] to-transparent md:hidden"
        aria-hidden="true"
      />

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-8 md:pt-8 lg:px-16 lg:pt-12 animate-[slideDown_0.7s_ease-out_0.1s_both]">
        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center">
          <img
            src="/media/logo-zayat.webp"
            alt="Dr Samir Zayat — Orthodontiste"
            className="h-11 w-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] md:h-13 lg:h-14"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToHash(link.href)
              }}
              className="text-base font-medium uppercase tracking-wide text-white/60 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <ContactPill />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="relative h-8 w-8 text-white md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu
            className={`absolute inset-0 m-auto h-7 w-7 transition-all duration-300 ${
              menuOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            className={`absolute inset-0 m-auto h-7 w-7 transition-all duration-300 ${
              menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0'
            }`}
          />
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#5F9AD1]/95 backdrop-blur-md transition-opacity duration-500 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute right-6 top-6 text-white"
          aria-label="Fermer le menu"
        >
          <X className="h-8 w-8" />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                scrollToHash(link.href)
              }}
              className={`text-3xl font-light uppercase text-white transition-all duration-500 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className={`mt-12 transition-all duration-500 ${
            menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: menuOpen ? '400ms' : '0ms',
          }}
        >
          <ContactPill />
        </div>
      </div>

      {/* Main heading */}
      <div className="relative z-10 mt-8 max-w-3xl px-6 text-center md:mt-6 md:px-8 md:text-left lg:mt-10 lg:px-16 animate-[blurIn_0.9s_ease-out_0.3s_both]">
        <h1 className="text-[72px] font-normal leading-[0.9] tracking-tight text-white sm:text-6xl md:leading-[0.85] lg:text-[90px] xl:text-[100px]">
          Retrouvez
          <br />
          votre vrai
          <br />
          <span className="inline-flex items-end gap-4 lg:gap-6">
            sourire
            {/* Avatar group */}
            <span className="mb-[0.1em] hidden -space-x-2 md:flex">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120"
                alt="Patiente satisfaite"
                className="h-10 w-10 rounded-full border-2 border-[#5F9AD1] object-cover lg:h-14 lg:w-14"
              />
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120"
                alt="Patiente satisfaite"
                className="h-10 w-10 rounded-full border-2 border-[#5F9AD1] object-cover lg:h-14 lg:w-14"
              />
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#5F9AD1] bg-white text-xs font-medium text-[#3D8CD5] lg:h-14 lg:w-14 lg:text-base">
                +2k
              </span>
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-5 hidden max-w-md text-lg leading-tight md:block lg:mt-6">
          <span className="text-white/60">Grâce à une </span>
          <span className="text-white">technologie de pointe</span>
          <span className="text-white/60">
            , nous offrons des soins complets pour un sourire sain et{' '}
          </span>
          <span className="text-white">plein de confiance.</span>
        </p>
      </div>

      {/* Bottom-left stat + figure */}
      <div className="absolute bottom-0 left-4 z-10 hidden md:block lg:left-12 animate-[slideUp_0.9s_ease-out_0.8s_both]">
        <div className="absolute left-3 top-8 z-20 flex flex-col items-center lg:left-4 lg:top-12">
          <span className="text-2xl font-bold text-[#3D8CD5] lg:text-4xl">98%</span>
          <span className="text-center text-xs font-medium text-[#3D8CD5] lg:text-sm">
            de patients
            <br />
            fidèles
          </span>
        </div>
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/ecccf0c10f5c64505f8cb104b04c72aba0b85b0c.png?w=512"
          alt="Femme souriante aux dents éclatantes"
          className="relative z-10 w-52 object-contain sm:w-64 lg:w-80"
        />
      </div>
    </section>
  )
}
