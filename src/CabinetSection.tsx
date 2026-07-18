import { ArrowUpRight } from 'lucide-react'

interface Row {
  video: string
  heading: string
  body: string
  cta: { label: string; href: string; external?: boolean }
  reverse?: boolean
}

const ROWS: Row[] = [
  {
    video: '/media/cabinet-1.mp4',
    heading: 'Un accueil pensé pour vous mettre à l’aise.',
    body: 'Dès votre arrivée, tout est fait pour que la visite soit sereine — pour les enfants comme pour les adultes. Un espace d’attente lumineux, une équipe attentive, et un accueil chaleureux à chaque rendez-vous.',
    cta: { label: 'Prendre un Rdv', href: 'tel:0240892596' },
  },
  {
    video: '/media/cabinet-2.mp4',
    heading: 'Un plateau technique moderne et précis.',
    body: 'Des équipements dédiés à l’orthopédie dento-faciale pour des diagnostics fiables et des traitements sur-mesure : appareils dentaires, orthodontie pour adulte et orthodontie pédiatrique.',
    cta: {
      label: 'Voir les avis Google',
      href: 'https://share.google/zmbgE6pVFbfj75gmu',
      external: true,
    },
    reverse: true,
  },
  {
    video: '/media/cabinet-3.mp4',
    heading: 'L’hygiène et le soin du détail, au quotidien.',
    body: 'Un environnement rigoureusement entretenu, des protocoles stricts et une attention constante portée à votre confort. Chaque geste compte, du premier rendez-vous à la fin du traitement.',
    cta: { label: 'Nous appeler', href: 'tel:0240892596' },
  },
]

function CtaButton({ cta }: { cta: Row['cta'] }) {
  return (
    <a
      href={cta.href}
      {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="liquid-glass-strong inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10"
    >
      {cta.label}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  )
}

export default function CabinetSection() {
  return (
    <section id="le-cabinet" className="bg-black px-6 py-24 md:px-16 lg:px-24">
      {/* Section header */}
      <div className="mb-20 text-center">
        <span className="liquid-glass mb-4 inline-block rounded-full px-3.5 py-1 text-xs font-medium text-white">
          Le cabinet
        </span>
        <h2 className="font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl">
          Un lieu pensé pour votre sourire.
        </h2>
      </div>

      {/* Alternating rows */}
      {ROWS.map((row, i) => (
        <div
          key={row.video}
          className={`flex flex-col items-center gap-12 lg:gap-20 ${
            row.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } ${i < ROWS.length - 1 ? 'mb-24' : ''}`}
        >
          <div className="flex-1 space-y-6">
            <h3 className="font-heading text-3xl italic leading-[0.9] tracking-tight text-white md:text-4xl">
              {row.heading}
            </h3>
            <p className="max-w-lg text-sm font-light leading-relaxed text-white/70 md:text-base">
              {row.body}
            </p>
            <CtaButton cta={row.cta} />
          </div>
          <div className="w-full flex-1">
            <div className="liquid-glass overflow-hidden rounded-2xl">
              <video
                src={row.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
