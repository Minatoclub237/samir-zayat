import { Star } from 'lucide-react'

const GOOGLE_REVIEWS_URL = 'https://share.google/zmbgE6pVFbfj75gmu'

interface Review {
  time: string
  text: string
  visited?: string
}

const REVIEWS: Review[] = [
  {
    time: 'il y a 2 ans',
    text: "J'ai choisi ce médecin pour les soins de ma fille de 12 ans, et nous sommes pleinement satisfaits de son travail. Elle est superbement bien suivie et toujours à l'écoute. Il est calme, posé et très professionnel. Son équipe est au top, …",
    visited: 'Visité en novembre 2023',
  },
  {
    time: 'il y a un an',
    text: "Docteur Zayat est un praticien d'une grande gentillesse et douceur. Il m'a suivie pendant des années et a toujours été à l'écoute et compréhensif. Le travail exécuté sur ma dentition est parfait. …",
    visited: 'Visité en avril 2023',
  },
  {
    time: 'il y a 5 ans',
    text: "Il m'a accompagné lorsque j'étais enfant suite à une malformation du visage et il suit aujourd'hui ma fille pour sa dentition. Il a rythmé ma vie d'enfant par des rdv toujours attentionnés, il n'a pas …",
    visited: 'Visité en avril 2021',
  },
  {
    time: 'il y a 3 ans',
    text: "Quand j'ai vu les commentaires je m'attendais au pire, finalement ce n'est pas du tout le cas. 1er rdv pour moi et le Dr Zayat est très souriant, gentil, et professionnel. Je …",
    visited: 'Visité en décembre 2022',
  },
  {
    time: 'il y a 4 ans',
    text: "En lisant les commentaires de ce professionnel j'ai hésité à prendre RDV avec lui et heureusement je ne me suis pas arrêté à ça. Depuis 1 an il a fait un très bon travail alors que je fais de la parodontie. Mon dentiste parodontologue m'a …",
    visited: 'Visité en septembre 2021',
  },
  {
    time: 'il y a 3 ans',
    text: "Je suis suivie par Mr Zayat depuis plus de 20 ans. J'ai toujours apprécié l'homme et le Docteur qu'il est... (Et sa collection de crayons de papier !) Hyper Pro, attentif, sincère... …",
    visited: 'Visité en février 2023',
  },
  {
    time: 'il y a 3 ans',
    text: "Très professionnel ! Le docteur Zayat est un homme charmant, à l'écoute et délicat avec les patients. Je ne comprends pas les précédents commentaires… Merci à vous …",
    visited: 'Visité en février 2023',
  },
  {
    time: 'il y a un an',
    text: "Merci au docteur Zayat qui a corrigé une imperfection dans mon sourire, le problème a été résolu en seulement quelques mois grâce aux compétences du docteur Zayat, merci à lui et son équipe pour leur gentillesse !",
    visited: 'Visité en février 2025',
  },
  {
    time: 'il y a 3 ans',
    text: "Mr. Zayat est très professionnel et arrangeant, grâce à ses années d'expérience j'ai pu avoir un appareil sur-mesure coûtant bien moins que ce que l'on a pu me proposer …",
    visited: 'Visité en juillet 2022',
  },
  {
    time: 'il y a 8 ans',
    text: "Excellent orthodontiste. Accueil chaleureux et professionnel. Docteur très respectueux du patient, aucune douleur dans les actes. Convention respectée et tarifs très abordables. Traitement commencé à 60 ans et terminé à 62 ans.",
  },
  {
    time: 'il y a 2 ans',
    text: "Excellent orthodontiste. En 2 ans j'ai eu un sourire hollywoodien, après avoir galéré avec un ancien orthodontiste pendant des années. Très très bon, sait ce qu'il fait. Assez impressionné du résultat.",
    visited: 'Visité en avril 2022',
  },
  {
    time: 'il y a 3 ans',
    text: "Docteur Zayat a parfaitement cerné mon besoin médical et sa prescription a été très efficace. Courtoisie et pédagogie au rendez-vous.",
    visited: 'Visité en septembre 2022',
  },
  {
    time: 'il y a 2 ans',
    text: "Dr Zayat suit mon fils depuis plusieurs années, il est très doux et gentil. Je recommande sans soucis.",
    visited: 'Visité en septembre 2023',
  },
  {
    time: 'il y a 6 ans',
    text: "Très bien, il m'a suivi pendant 8/9 ans. J'ai une très belle dentition aujourd'hui alors que je reviens de très très loin.",
    visited: 'Visité en février 2004',
  },
  {
    time: 'il y a 4 ans',
    text: "Merci au docteur Zayat de m'avoir permis d'avoir le sourire dont je rêvais depuis longtemps. Très bon travail, je suis très contente du résultat. Merci encore !",
    visited: 'Visité en mars 2022',
  },
  {
    time: 'il y a 2 ans',
    text: "Grand merci à Docteur Zayat qui a changé la vie de notre fille Marguerite. On vous le recommande vivement 🥰🥰🥰 …",
    visited: 'Visité en juin 2024',
  },
  {
    time: 'il y a 3 ans',
    text: "Docteur Samir Zayat est une personne humaine, honnête et professionnelle, je le recommande les yeux fermés. Merci infiniment docteur.",
    visited: 'Visité en juillet 2022',
  },
  {
    time: 'il y a 2 ans',
    text: "Si vous voulez de l'expérience et des résultats efficaces, vous devriez vous adresser à M. Zayat. Je recommande fortement.",
    visited: 'Visité en février 2024',
  },
  {
    time: 'il y a 7 ans',
    text: "Excellent ! Le docteur Zayat prend le temps de répondre aux questions avec gentillesse.",
  },
  {
    time: 'il y a 9 ans',
    text: "Praticien à l'écoute et sachant mettre en confiance les jeunes enfants.",
  },
]

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#FBBC04] text-[#FBBC04]" />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex w-[280px] shrink-0 flex-col gap-2 rounded-2xl border border-black/[0.06] bg-[#F8F9FA] p-4">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="text-xs text-black/40">{review.time}</span>
      </div>
      <p className="line-clamp-4 text-[13px] leading-snug text-black/70">{review.text}</p>
      {review.visited && (
        <span className="mt-auto text-[11px] text-black/35">{review.visited}</span>
      )}
    </article>
  )
}

export default function ReviewsSection() {
  return (
    <section className="w-full overflow-hidden bg-white py-12 md:py-16">
      {/* Title */}
      <div className="mb-8 flex flex-col items-center gap-3 px-6">
        <div className="flex items-center gap-3">
          <GoogleLogo className="h-8 w-8" />
          <h2 className="text-2xl font-medium tracking-tight text-black md:text-3xl">
            Avis <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC04]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-[#FBBC04] text-[#FBBC04]" />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee band */}
      <div
        className="group relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div className="flex w-max gap-4 animate-[marqueeRight_90s_linear_infinite] group-hover:[animation-play-state:paused]">
          {[...REVIEWS, ...REVIEWS].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>

      {/* Google link */}
      <div className="mt-8 flex justify-center">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full border border-black/10 px-5 py-2.5 transition-colors duration-300 hover:bg-[#F8F9FA]"
        >
          <GoogleLogo className="h-4 w-4" />
          <span className="text-sm font-medium text-black/70 transition-colors group-hover:text-black">
            Voir tous les avis sur Google
          </span>
        </a>
      </div>
    </section>
  )
}
