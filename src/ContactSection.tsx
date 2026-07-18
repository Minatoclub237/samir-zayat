import { useState, type FormEvent } from 'react'
import { ArrowUpRight, MapPin, Phone, Send } from 'lucide-react'

const PHONE_DISPLAY = '02 40 89 25 96'
const PHONE_HREF = 'tel:0240892596'
// TODO : remplacer par la vraie adresse email du cabinet
const CONTACT_EMAIL = 'contact@cabinet-zayat.fr'
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=46+Bd+Gabriel+Guist'Hau,+44000+Nantes,+France"

const inputClass =
  'w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white placeholder-white/60 placeholder:font-medium backdrop-blur-sm transition-colors focus:border-white/60 focus:outline-none'

export default function ContactSection() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(
      `Demande de rendez-vous — ${firstName} ${lastName}`,
    )
    const body = encodeURIComponent(
      `Bonjour Docteur,\n\n${message}\n\n${firstName} ${lastName}\nTéléphone : ${phone}`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Vidéo de fond — 100 % d'opacité, aucun voile */}
      <video
        src="/media/contact-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Colonne gauche — titre + tunnels secondaires */}
        <div className="flex flex-col items-start">
          <span className="liquid-glass mb-6 inline-block rounded-full px-3.5 py-1 text-xs font-medium text-white">
            Contact
          </span>

          <h2 className="font-heading text-5xl italic leading-[0.95] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] md:text-6xl">
            Votre sourire
            <br />
            commence ici.
          </h2>

          <p className="mt-5 max-w-md text-base font-semibold leading-relaxed text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
            Écrivez-nous, le cabinet vous rappelle pour fixer votre rendez-vous. Une urgence ?
            Appelez directement.
          </p>

          {/* Tunnel 2 — urgence (seul CTA téléphone) */}
          <a
            href={PHONE_HREF}
            className="liquid-glass mt-8 flex items-center gap-3 rounded-full px-6 py-3.5 text-white transition-colors duration-300 hover:bg-white/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
            <span className="text-base font-bold [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">Urgence — {PHONE_DISPLAY}</span>
            <Phone className="h-4 w-4" />
          </a>

          {/* Tunnel 3 — itinéraire */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass group mt-4 flex w-full max-w-md items-center gap-4 rounded-2xl px-6 py-5 transition-colors duration-300 hover:bg-white/5"
          >
            <MapPin className="h-6 w-6 shrink-0 text-white" />
            <span className="flex-1 text-left">
              <span className="block font-heading text-xl italic leading-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
                46 Bd Gabriel Guist'Hau, Nantes
              </span>
              <span className="mt-0.5 block text-xs font-bold uppercase tracking-[0.15em] text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                Itinéraire vers le cabinet
              </span>
            </span>
            <ArrowUpRight className="h-5 w-5 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Colonne droite — Tunnel 1 : le formulaire → email */}
        <form
          onSubmit={handleSubmit}
          className="liquid-glass w-full rounded-3xl p-8 md:p-10"
        >
          <h3 className="font-heading text-3xl italic leading-tight text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            Écrire au Dr Zayat
          </h3>
          <p className="mt-2 text-sm font-semibold text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            Réponse du cabinet sous 24 h ouvrées.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              required
              placeholder="Prénom"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
            <input
              type="text"
              required
              placeholder="Nom"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClass}
            />
          </div>
          <input
            type="tel"
            required
            placeholder="Téléphone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inputClass} mt-4`}
          />
          <textarea
            required
            placeholder="Votre message — motif du rendez-vous, disponibilités…"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} mt-4 resize-none`}
          />

          <button
            type="submit"
            className="group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white py-3.5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="text-lg font-medium text-black">Envoyer ma demande</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EBFA73] transition-transform duration-300 group-hover:scale-110">
              <Send className="h-4 w-4 text-[#5F9AD1]" />
            </span>
          </button>

          <p className="mt-4 text-center text-xs font-semibold text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            Vos informations ne servent qu'à vous recontacter. Jamais partagées.
          </p>
        </form>
      </div>

      {/* Signature */}
      <p className="absolute bottom-6 left-0 right-0 z-10 text-center text-sm font-bold text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
        Dr Samir Zayat — Orthodontiste à Nantes
      </p>
    </section>
  )
}
