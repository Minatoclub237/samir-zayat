import { Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { scrollToHash } from './lib/utils'

const NAV_LINKS = [
  { label: 'À propos', href: '#a-propos' },
  { label: 'Le cabinet', href: '#le-cabinet' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=46+Bd+Gabriel+Guist'Hau,+44000+Nantes,+France"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-10 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Marque — clic = retour au hero */}
          <div className="flex flex-col items-start gap-3">
            <button
              type="button"
              onClick={() => scrollToHash('#hero')}
              aria-label="Revenir en haut de la page"
              className="transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src="/media/logo-zayat.webp"
                alt="Dr Samir Zayat — Orthodontiste"
                className="h-12 w-auto"
              />
            </button>
            <p className="text-xs text-white/40">N° RPPS 10000831593 · Conventionné</p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col items-start gap-2 sm:items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHash(link.href)
                }}
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact + réseaux */}
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="tel:0240892596"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              02 40 89 25 96
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5" />
              46 Bd Gabriel Guist'Hau, 44000 Nantes
            </a>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Ligne légale */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Cabinet du Dr Samir Zayat — Tous droits réservés</p>
          <p>Mentions légales · Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  )
}
