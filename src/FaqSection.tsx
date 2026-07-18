import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'
import { cn } from './lib/utils'

const PHONE_DISPLAY = '02 40 89 25 96'
const PHONE_HREF = 'tel:0240892596'

/* ── Data : objections réelles → réponse → appel ── */

type CategoryKey = 'confiance' | 'tarifs' | 'traitement'

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'confiance', label: 'Avant de se lancer' },
  { key: 'tarifs', label: 'Tarifs & remboursement' },
  { key: 'traitement', label: 'Traitements & suivi' },
]

const faqs: Record<CategoryKey, { q: string; a: string }[]> = {
  confiance: [
    {
      q: "J'ai plus de 40 ans… ce n'est pas trop tard pour un appareil ?",
      a: "Non — l'orthodontie pour adulte est l'une de nos trois expertises. Un de nos patients a commencé son traitement à 60 ans et l'a terminé à 62, avec un résultat dont il parle encore dans son avis Google. L'âge ne ferme aucune porte : appelez le " + PHONE_DISPLAY + ", une consultation à 23 € suffit pour savoir ce qui est possible pour vous.",
    },
    {
      q: "J'ai peur d'avoir mal, on m'a raconté des traitements douloureux.",
      a: "C'est la remarque qui revient le plus dans nos avis : « aucune douleur dans les actes », « doux et délicat avec les patients ». Le Dr Zayat pratique depuis 1980 — la douceur fait partie de la méthode, pas du hasard. Le mieux est d'en juger par vous-même lors d'un premier rendez-vous : " + PHONE_DISPLAY + ".",
    },
    {
      q: 'Mon enfant est angoissé chez le dentiste, comment ça va se passer ?',
      a: "C'est notre quotidien depuis 45 ans : l'orthodontie pédiatrique est une expertise du cabinet, et les parents décrivent des rendez-vous « toujours attentionnés » — certains patients suivis enfants nous confient aujourd'hui leurs propres enfants. Parlez-nous de votre enfant au " + PHONE_DISPLAY + ", nous prendrons le temps qu'il faut.",
    },
    {
      q: "J'ai vu quelques avis négatifs en ligne, ça m'a fait hésiter.",
      a: "Plusieurs patients l'écrivent eux-mêmes : « quand j'ai vu les commentaires je m'attendais au pire, finalement ce n'est pas du tout le cas ». 45 ans d'exercice, des familles suivies sur plusieurs générations — le plus fiable reste de vous faire votre propre avis : une consultation coûte 23 €, remboursée en partie. Appelez le " + PHONE_DISPLAY + ".",
    },
    {
      q: "Je n'ai pas le temps pour des années de traitement.",
      a: "Tous les traitements ne durent pas des années : une patiente a vu son imperfection corrigée « en seulement quelques mois ». La durée dépend de votre situation — et vous la connaîtrez précisément dès le premier rendez-vous, avec un plan clair. Un appel au " + PHONE_DISPLAY + " et vous serez fixé.",
    },
  ],
  tarifs: [
    {
      q: "Combien ça coûte vraiment ? J'ai peur des mauvaises surprises.",
      a: "La consultation est à 23 €, tarif conventionné. Pour tout traitement, un devis préalable est systématique — rien ne commence sans que vous sachiez exactement où vous allez. Zéro surprise, c'est la règle. Demandez votre rendez-vous au " + PHONE_DISPLAY + ".",
    },
    {
      q: 'Est-ce remboursé par la Sécurité sociale ?',
      a: "Oui pour l'orthodontie débutée avant les 16 ans de votre enfant — d'où l'importance de consulter tôt. Les soins courants sont remboursés à 60 % et votre mutuelle peut compléter. Chaque situation est différente : expliquez-nous la vôtre au " + PHONE_DISPLAY + ", nous vous dirons précisément à quoi vous avez droit.",
    },
    {
      q: "Je ne veux pas avancer les frais.",
      a: "Vous n'aurez pas à le faire : le cabinet pratique le tiers payant. Avec une carte Vitale à jour, la part Sécurité sociale et mutuelle est directement télétransmise — zéro feuille de soins, zéro avance. Vérifiez votre situation en un appel : " + PHONE_DISPLAY + ".",
    },
    {
      q: 'Les appareils dentaires, ce n\'est pas hors de prix ?',
      a: "Un patient l'écrit mieux que nous : grâce à l'expérience du Dr Zayat, il a obtenu « un appareil sur-mesure coûtant bien moins que ce que l'on a pu me proposer » ailleurs. Chaque appareil fait l'objet d'un devis avant toute décision. Comparez, vous aussi : " + PHONE_DISPLAY + ".",
    },
    {
      q: "Et pour un adulte, quelle prise en charge ?",
      a: "Après 16 ans, la Sécurité sociale ne rembourse plus l'orthodontie, mais de nombreuses mutuelles prennent le relais — souvent bien mieux qu'on ne l'imagine. Apportez votre contrat de mutuelle, nous établissons un devis clair que vous pourrez lui soumettre. Premier pas : un appel au " + PHONE_DISPLAY + ".",
    },
  ],
  traitement: [
    {
      q: 'Orthodontiste, dentiste… quelle différence pour moi ?',
      a: "L'orthodontiste est le spécialiste de l'orthopédie dento-faciale : il ne soigne pas les caries, il corrige l'alignement des dents et l'harmonie du visage. Le Dr Zayat est titulaire du D.U. d'Orthopédie crânio-dento-maxillo-faciale de l'Université de Nantes. Pour savoir si votre cas relève de l'orthodontie : " + PHONE_DISPLAY + ".",
    },
    {
      q: 'Quel type d\'appareil me proposera-t-on ?',
      a: "Amovible, semi-amovible ou fixe : l'appareil est choisi pour votre situation, jamais l'inverse — et toujours fabriqué sur-mesure. C'est précisément l'objet du premier rendez-vous : un diagnostic, puis une proposition adaptée. Réservez le vôtre au " + PHONE_DISPLAY + ".",
    },
    {
      q: 'Que se passe-t-il concrètement au premier rendez-vous ?',
      a: "Un examen complet, un diagnostic, un plan de traitement expliqué simplement et, si un traitement est utile, un devis détaillé. Vous repartez en sachant exactement où vous en êtes — pour 23 €, remboursés en partie. C'est le rendez-vous le plus utile que vous prendrez cette année : " + PHONE_DISPLAY + ".",
    },
    {
      q: 'Serai-je bien suivi pendant toute la durée du traitement ?',
      a: "C'est la marque du cabinet : des patients suivis pendant 8, 9, parfois 20 ans, qui décrivent un praticien « à l'écoute », « attentif », « sincère ». Un traitement d'orthodontie est un accompagnement, pas une série d'actes. Venez le constater : " + PHONE_DISPLAY + ".",
    },
    {
      q: "Mon cas est compliqué, est-ce que ça vaut la peine d'essayer ?",
      a: "Le Dr Zayat a accompagné des patients « revenant de très loin » — malformations, dentitions complexes, échecs de traitements précédents ailleurs. 45 ans d'expérience servent exactement à ça. Ne décidez pas seul que c'est impossible : décrivez votre cas au " + PHONE_DISPLAY + ".",
    },
  ],
}

/* ── Helpers ── */

export function spotlightMaskStyle(size: number, intensity: number): CSSProperties {
  return {
    background: `radial-gradient(${size}px circle at var(--spot-x,-200px) var(--spot-y,-200px), rgba(255,255,255,${intensity}), rgba(255,255,255,0) 60%)`,
    padding: '1px',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  }
}

function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const radiusClass = { xl: 'rounded-xl', '2xl': 'rounded-2xl', '3xl': 'rounded-3xl', full: 'rounded-full' }

interface SpotlightProps {
  as?: 'div' | 'button' | 'section'
  radius?: keyof typeof radiusClass
  size?: number
  intensity?: number
  className?: string
  children: ReactNode
  onClick?: () => void
}

function SpotlightBorder({
  as: Tag = 'div',
  radius = '2xl',
  size = 300,
  intensity = 0.5,
  className,
  children,
  onClick,
}: SpotlightProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      onClick={onClick}
      className={cn('relative', radiusClass[radius], className)}
    >
      <span
        aria-hidden
        className={cn('pointer-events-none absolute inset-0', radiusClass[radius])}
        style={spotlightMaskStyle(size, intensity)}
      />
      {children}
    </Tag>
  )
}

/* ── Section ── */

export default function FaqSection() {
  const [active, setActive] = useState<CategoryKey>('confiance')
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      itemRefs.current.forEach((el) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="faq" className="relative w-full bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-[1080px] px-4 sm:px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <FadeUp>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                FAQ
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="mt-4 text-3xl font-normal leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl">
                Les réponses aux questions
                <br className="hidden sm:block" /> que vous vous posez déjà.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm text-white/60 sm:text-base">
              Traitements, tarifs, remboursements : tout ce qu'il faut savoir avant de prendre
              rendez-vous. Et si un doute persiste, un appel suffit.
            </p>
          </FadeUp>
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          {/* Left column */}
          <div className="flex flex-col gap-4 lg:h-full">
            <div className="lg:flex-1">
              <SpotlightBorder radius="2xl" size={280} className="flex flex-col p-2 sm:p-3 lg:sticky lg:top-24">
                {categories.map((c) => (
                  <SpotlightBorder
                    key={c.key}
                    as="button"
                    radius="full"
                    size={200}
                    intensity={0.4}
                    onClick={() => setActive(c.key)}
                    className={cn(
                      'w-full px-5 py-3 text-center text-sm transition-colors',
                      active === c.key
                        ? 'border border-white/10 bg-white/10 text-white'
                        : 'border border-transparent text-white/60 hover:text-white',
                    )}
                  >
                    {c.label}
                  </SpotlightBorder>
                ))}
              </SpotlightBorder>
            </div>

            {/* Carte appel */}
            <SpotlightBorder radius="2xl" size={360} className="mt-8 p-2 sm:p-3 lg:mt-0">
              <SpotlightBorder radius="2xl" size={260} intensity={0.4} className="border border-white/10 bg-white/10 p-6">
                <h3 className="text-lg font-semibold text-white">Un doute ? Parlons-en.</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Le plus simple reste de nous appeler : l'équipe du cabinet vous répond et vous
                  oriente en quelques minutes, sans engagement.
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white hover:text-white/80"
                >
                  <Phone className="h-4 w-4" />
                  {PHONE_DISPLAY}
                  <span aria-hidden>→</span>
                </a>
              </SpotlightBorder>
            </SpotlightBorder>
          </div>

          {/* Right column : accordion */}
          <SpotlightBorder radius="2xl" size={360} className="p-2 sm:p-3">
            <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
              {faqs[active].map((item, idx) => (
                <FadeUp delay={0.15 * idx} key={`${active}-${idx}`}>
                  <Accordion.Item
                    value={`${active}-${idx}`}
                    ref={(el) => { itemRefs.current[idx] = el }}
                    className="relative rounded-2xl border border-white/10 bg-white/10 px-6 [&[data-state=open]]:bg-white/15"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={spotlightMaskStyle(260, 0.4)}
                    />
                    <Accordion.Header>
                      <Accordion.Trigger className="group flex w-full items-center justify-between py-7 text-left text-sm font-medium text-white sm:text-base">
                        <span className="flex-1 pr-4">{item.q}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition-transform duration-200 group-data-[state=open]:rotate-180">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.2s_ease-out] data-[state=closed]:animate-[accordion-up_0.2s_ease-out]">
                      <p className="pb-7 text-sm leading-relaxed text-white/60">{item.a}</p>
                    </Accordion.Content>
                  </Accordion.Item>
                </FadeUp>
              ))}
            </Accordion.Root>
          </SpotlightBorder>
        </div>
      </div>
    </section>
  )
}
