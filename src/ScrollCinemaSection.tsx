import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Swiper from 'swiper'
import { EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const GLYPHS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

interface StatCard {
  title: string
  value: string
  footer: string
  details: string[]
}

const STATS: StatCard[] = [
  {
    title: "ANNÉES D'EXPÉRIENCE",
    value: '45+',
    footer: 'CABINET — NANTES, DEPUIS 1980',
    details: [
      'Orthopédie dento-faciale',
      'Enfants, adolescents et adultes',
      'Patients suivis sur plusieurs générations',
    ],
  },
  {
    title: 'CONSULTATION',
    value: '23 €',
    footer: 'PRATICIEN CONVENTIONNÉ',
    details: [
      'Tarifs de base pour les soins courants',
      'Remboursée à 60 % par la Sécurité sociale',
      'Complément possible par votre mutuelle',
    ],
  },
  {
    title: 'TIERS PAYANT',
    value: '0 €',
    footer: 'AUCUNE AVANCE DE FRAIS',
    details: [
      'Frais Sécu + mutuelle non avancés',
      'Carte Vitale à jour sur une borne en pharmacie',
      'Télétransmission — zéro feuille de soins papier',
    ],
  },
  {
    title: 'FORMATION',
    value: 'D.U.',
    footer: 'UNIVERSITÉ DE NANTES',
    details: [
      'Orthopédie crânio-dento-maxillo-faciale',
      'Diplôme universitaire',
      'Langue parlée : français',
    ],
  },
  {
    title: 'EXPERTISES & ACTES',
    value: '3',
    footer: 'APPAREILS SUR-MESURE',
    details: ['Appareil dentaire', 'Orthodontie pour adulte', 'Orthodontie pédiatrique'],
  },
  {
    title: 'PRISE EN CHARGE',
    value: '−16 ans',
    footer: 'N° RPPS 10000831593',
    details: [
      'Traitement débuté avant 16 ans → remboursable',
      'Devis préalable pour les prothèses',
      'Conventionné Sécurité sociale',
    ],
  },
]

const TITLES = [
  { text: 'Dr Samir', delay: 100 },
  { text: 'Zayat', delay: 300 },
  { text: 'Depuis', delay: 200 },
  { text: '1980', delay: 400 },
]

interface ScrambleState {
  el: HTMLSpanElement
  text: string
  delay: number
  phase: 'idle' | 'scrambling-in' | 'revealed' | 'scrambling-out' | 'hidden'
  progress: number
  lastTime: number
  started: boolean
}

const clamp = (v: number) => Math.max(0, Math.min(1, v))

export default function ScrollCinemaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sceneARef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLDivElement>(null)
  const cinematicRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<HTMLDivElement>(null)
  const swiperInstRef = useRef<Swiper | null>(null)
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    const sceneA = sceneARef.current
    const desc = descRef.current
    const cinematic = cinematicRef.current
    const stats = statsRef.current
    if (!section || !video || !sceneA || !desc || !cinematic || !stats || !swiperRef.current)
      return

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ) || window.innerWidth < 768

    const swiper = new Swiper(swiperRef.current, {
      modules: [EffectCoverflow],
      effect: 'coverflow',
      grabCursor: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      spaceBetween: 24,
      coverflowEffect: { rotate: 18, stretch: 0, depth: 140, modifier: 1, slideShadows: false },
    })
    swiperInstRef.current = swiper

    // ── Scramble states ──
    const scrambles: ScrambleState[] = titleRefs.current
      .filter((el): el is HTMLSpanElement => el !== null)
      .map((el, i) => ({
        el,
        text: TITLES[i].text,
        delay: TITLES[i].delay,
        phase: 'idle',
        progress: 0,
        lastTime: 0,
        started: false,
      }))
    scrambles.forEach((s) => {
      s.el.textContent = s.text.replace(/\S/g, ' ')
      s.el.style.opacity = '0'
    })

    // ── Video seek guards ──
    let isSeeking = false
    let nextSeekTime: number | null = null
    const onSeeking = () => { isSeeking = true }
    const onSeeked = () => {
      isSeeking = false
      if (nextSeekTime !== null) {
        const t = nextSeekTime
        nextSeekTime = null
        if (video.readyState >= 1 && video.duration > 0) {
          isSeeking = true
          video.currentTime = t
        }
      }
    }
    video.addEventListener('seeking', onSeeking)
    video.addEventListener('seeked', onSeeked)
    if (isMobile) {
      // iOS/Android : le seek programmé sans geste utilisateur est bloqué →
      // lecture auto en boucle (le mode scroll des scènes reste inchangé)
      video.muted = true
      video.loop = true
      video.play().catch(() => {})
    } else {
      video.pause()
    }

    // ── State ──
    let p = 0
    let smoothP = 0
    let entrancePhase: 'loading' | 'animating' | 'complete' = 'loading'
    let entranceStart = 0
    let firstInView: number | null = null
    let videoReady = false
    let rafId = 0

    function updateScrambles(now: number) {
      const scrollActive = p > 0.03
      scrambles.forEach((s) => {
        if (!videoReady && s.phase === 'idle') return

        if (videoReady && s.phase === 'idle' && !scrollActive && !s.started) {
          s.started = true
          setTimeout(() => {
            s.phase = 'scrambling-in'
            s.progress = 0
            s.lastTime = performance.now()
          }, s.delay)
          return
        }

        if (scrollActive && (s.phase === 'revealed' || s.phase === 'scrambling-in')) {
          s.phase = 'scrambling-out'
          s.progress = 0
          s.lastTime = now
        } else if (!scrollActive && (s.phase === 'hidden' || s.phase === 'scrambling-out')) {
          s.phase = 'scrambling-in'
          s.progress = 0
          s.lastTime = now
        }

        if (s.phase === 'scrambling-in') {
          const duration = 900
          s.progress = Math.min(1, s.progress + (now - s.lastTime) / duration)
          s.lastTime = now
          const t = s.progress
          let result = ''
          for (let i = 0; i < s.text.length; i++) {
            if (s.text[i] === ' ') { result += ' '; continue }
            const threshold = i / s.text.length
            if (t >= threshold + 0.15) result += s.text[i]
            else if (t >= threshold - 0.1) result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            else result += ' '
          }
          s.el.textContent = result
          s.el.style.opacity = '1'
          if (t >= 1) { s.phase = 'revealed'; s.el.textContent = s.text }
        } else if (s.phase === 'scrambling-out') {
          const duration = 700
          s.progress = Math.min(1, s.progress + (now - s.lastTime) / duration)
          s.lastTime = now
          const t = s.progress
          let result = ''
          for (let i = 0; i < s.text.length; i++) {
            if (s.text[i] === ' ') { result += ' '; continue }
            const threshold = i / s.text.length
            if (t >= threshold + 0.2) result += ' '
            else if (t >= threshold - 0.05) result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            else result += s.text[i]
          }
          s.el.textContent = result
          s.el.style.opacity = String(Math.max(0, 1 - t * 1.5))
          if (t >= 1) {
            s.phase = 'hidden'
            s.el.textContent = s.text.replace(/\S/g, ' ')
            s.el.style.opacity = '0'
          }
        }
      })
    }

    function tick(now: number) {
      const vh = window.innerHeight
      const rect = section!.getBoundingClientRect()
      const total = section!.offsetHeight - vh
      p = total > 0 ? clamp(-rect.top / total) : 0
      const inView = rect.top < vh && rect.bottom > 0

      smoothP += (p - smoothP) * 0.12
      if (Math.abs(p - smoothP) < 0.0001) smoothP = p

      // ── Video entrance ──
      let entranceZoom = 1.0
      let entranceOpacity = 1.0
      if (entrancePhase === 'loading') {
        entranceZoom = 1.12
        entranceOpacity = 0
        if (inView && firstInView === null) firstInView = now
        if (inView && (video!.readyState >= 3 || (firstInView !== null && now - firstInView > 3500))) {
          entrancePhase = 'animating'
          entranceStart = now
        }
      }
      if (entrancePhase === 'animating') {
        const elapsed = now - entranceStart
        const progress = Math.min(1, elapsed / 1400)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        entranceZoom = 1.12 - 0.12 * easeOut
        entranceOpacity = Math.min(1, elapsed / 500)
        if (progress >= 1) {
          entrancePhase = 'complete'
          videoReady = true
          sceneA!.classList.add('cinema-visible')
        }
      }

      // ── Video blur + scale + scrub ──
      const subtleBase = clamp((smoothP - 0.1) / 0.45)
      const progressive = clamp((smoothP - 0.55) / 0.4)
      const blurVal = subtleBase * 4 + progressive * 8
      const scaleVal = 1.03 + clamp((smoothP - 0.1) / 0.9) * 0.08
      video!.style.filter = `blur(${blurVal}px)`
      video!.style.transform = `scale(${scaleVal * entranceZoom})`
      video!.style.opacity = String(entranceOpacity)

      if (!isMobile && video!.readyState >= 1 && video!.duration > 0) {
        const targetTime = clamp(smoothP) * video!.duration
        if (Math.abs(video!.currentTime - targetTime) > 0.008) {
          if (!isSeeking && !video!.seeking) {
            isSeeking = true
            video!.currentTime = targetTime
          } else {
            nextSeekTime = targetTime
          }
        }
      }

      // ── Scene A : titres + desc ──
      const aOp = clamp(1 - p / 0.3)
      const aScale = 1 - 0.04 * Math.min(1, p / 0.3)
      sceneA!.style.opacity = String(aOp)
      sceneA!.style.transform = `scale(${aScale})`
      const dOp = clamp(1 - p / 0.28)
      desc!.style.opacity = String(videoReady ? dOp : 0)
      desc!.style.transform = `translateY(${-30 * Math.min(1, p / 0.28)}px)`

      // ── Scene B : paragraphe cinématique ──
      let cinOp = 0
      if (p <= 0.26) cinOp = 0
      else if (p <= 0.36) cinOp = (p - 0.26) / 0.1
      else if (p <= 0.5) cinOp = 1
      else if (p <= 0.65) cinOp = 1 - (p - 0.5) / 0.15
      else cinOp = 0
      const yVal = -120 * Math.min(1, p / 0.65)
      cinematic!.style.transform = `rotateX(24deg) translateY(${yVal}px) translateZ(15px)`
      cinematic!.style.opacity = String(cinOp)

      // ── Scene C : stats ──
      stats!.classList.toggle('revealed', p > 0.66)

      updateScrambles(now)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      video.removeEventListener('seeking', onSeeking)
      video.removeEventListener('seeked', onSeeked)
      swiper.destroy(true, true)
    }
  }, [])

  return (
    <section ref={sectionRef} id="a-propos" className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layer */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/media/orthodontiste.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-0 will-change-[transform,filter,opacity] pointer-events-none"
        />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Scene A — titres scramble + description */}
        <div
          ref={sceneARef}
          className="cinema-scene-a pointer-events-none absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-between px-6 pb-16 pt-20 md:px-12 lg:px-16"
        >
          <div className="flex flex-col text-white select-none font-light leading-[0.95] tracking-[-0.03em] text-[clamp(50px,8vw,100px)]">
            <span ref={(el) => { titleRefs.current[0] = el }} className="inline-block" />
            <span ref={(el) => { titleRefs.current[1] = el }} className="inline-block" />
          </div>
          <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
            <div
              ref={descRef}
              className="max-w-[380px] text-[15px] font-semibold leading-relaxed text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]"
            >
              <p>
                Orthodontiste à Nantes depuis 1980. Spécialiste de l'orthopédie dento-faciale,
                le Dr Zayat accompagne enfants, adolescents et adultes vers un sourire sain et
                harmonieux — appareils sur-mesure, suivi attentif, résultats durables.
              </p>
            </div>
            <div className="flex flex-col text-white select-none font-light leading-[0.95] tracking-[-0.03em] text-[clamp(50px,8vw,100px)] md:items-end md:text-right">
              <span ref={(el) => { titleRefs.current[2] = el }} className="inline-block" />
              <span ref={(el) => { titleRefs.current[3] = el }} className="inline-block" />
            </div>
          </div>
        </div>

        {/* Scene B — paragraphe cinématique */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6"
          style={{ perspective: '400px' }}
        >
          <div
            ref={cinematicRef}
            className="mx-auto max-w-4xl text-center opacity-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h2 className="select-none text-[clamp(22px,3.5vw,42px)] font-normal leading-[1.35] tracking-[-0.02em] text-white">
              L'orthodontiste est le spécialiste de l'orthopédie dento-faciale. Il améliore à
              la fois les fonctions de la bouche — ventilation, mastication, expression — et
              l'harmonie du sourire. Appareillages amovibles, semi-amovibles ou fixes : chaque
              traitement est adapté, et pris en charge par la Sécurité sociale s'il débute
              avant les 16 ans du patient.
            </h2>
          </div>
        </div>

        {/* Scene C — carrousel de cartes */}
        <div
          ref={statsRef}
          className="cinema-stats absolute inset-0 z-10 flex items-center overflow-hidden"
        >
          {/* Flèches de navigation */}
          <button
            type="button"
            aria-label="Carte précédente"
            onClick={() => swiperInstRef.current?.slidePrev()}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60 md:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Carte suivante"
            onClick={() => swiperInstRef.current?.slideNext()}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60 md:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div ref={swiperRef} className="swiper cinema-swiper">
            <div className="swiper-wrapper">
              {STATS.map((card) => (
                <div key={card.title} className="swiper-slide">
                  <div className="flex h-[480px] flex-col justify-between rounded-[28px] bg-white/[0.04] p-1.5 backdrop-blur-md">
                    <div className="flex flex-1 flex-col justify-between rounded-[23px] border border-white/5 bg-black/35 p-8 backdrop-blur-md">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/80">
                          {card.title}
                        </span>
                        <div className="mt-6 text-[clamp(60px,6vw,76px)] font-normal leading-none tracking-[-0.04em] text-white">
                          {card.value}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 pt-4">
                        {card.details.map((d) => (
                          <div key={d} className="flex items-start gap-2 text-[11px] font-medium text-white/60">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap px-6 pb-2.5 pt-3 text-[10px] font-medium uppercase tracking-[0.1em] text-white/55">
                      {card.footer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progressive bottom blur */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-20 h-[150px] w-full backdrop-blur-[4px]"
          style={{
            background: 'linear-gradient(to bottom, transparent, #000)',
            maskImage: 'linear-gradient(to top, #000 50%, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, #000 50%, transparent)',
          }}
        />
      </div>
    </section>
  )
}
