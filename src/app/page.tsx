import Link from "next/link";
import { Smartphone, Globe, ChevronRight } from "lucide-react";
import { GameCard3D } from "@/components/ui/GameCard3D";
import { HomeHeroActions } from "@/components/home/HomeHeroActions";
import { getGameVisualMeta } from "@/components/illustrations/GameIllustrations";
import { getGameConfig } from "@/games";
import { GameConfig } from "@/engine/types";

const FEATURED_IDS = ["undercover", "werewolf", "blind-test", "fake-artist"] as const;
const SOCIAL_IDS = ["truth-or-dare", "tu-preferes", "flag-quiz", "saboteur"] as const;
const EXPRESS_IDS = ["word-master", "punchlines", "vylo-party", "most-likely-to"] as const;

function buildBadge(config: GameConfig): string {
  const modeLabel = config.modes.includes("online") ? "Local & En ligne" : "1 téléphone";
  return `${config.category} · ${modeLabel}`;
}

function renderSection(
  title: string,
  subtitle: string,
  ids: readonly string[],
  tier: "featured" | "middle" | "bottom"
) {
  const games = ids
    .map((id) => getGameConfig(id))
    .filter((g): g is GameConfig => Boolean(g));

  return (
    <section className={tier === "featured" ? "space-y-4" : "space-y-4 offscreen-section"}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-foreground">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted font-semibold mt-0.5">{subtitle}</p>
        </div>

        <Link
          href="/library"
          prefetch={false}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-primary hover:text-primary-dark transition-colors shrink-0"
        >
          Tout voir <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {games.map((config, idx) => {
          const art = getGameVisualMeta(config.id);
          const priority = tier === "featured" && idx < 2;
          const eager = tier === "featured" && idx >= 2;
          return (
            <GameCard3D
              key={config.id}
              title={config.name}
              description={config.description}
              playersMin={config.players.min}
              playersMax={config.players.max}
              durationMins={config.durationMins}
              themeColor={art.themeColor}
              modeBadge={buildBadge(config)}
              isWip={config.status === "wip"}
              href={`/setup/${config.id}`}
              illustration={art.renderIllustration({ priority, eager })}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="w-full flex-1 px-4 md:px-8 pt-4 sm:pt-7 pb-24 md:pb-14 max-w-6xl mx-auto z-10 space-y-8 sm:space-y-10 relative">
      {/* BANNIÈRE D'ENTRÉE COMPACTE (jeux visibles dès le 1er écran sur mobile) */}
      <section className="rounded-2xl bg-surface border border-border p-4 sm:p-6 md:p-7 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary-soft text-[#C22E2E]">
                <Smartphone size={12} aria-hidden="true" />
                Local · 1 tel
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary-soft text-[#4338CA]">
                <Globe size={12} aria-hidden="true" />
                En ligne · Code à 6 chiffres
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-[1.14]">
              Lancez un jeu entre amis ou en famille en 10 secondes.
            </h1>

            <p className="text-xs sm:text-sm text-muted font-semibold max-w-xl">
              Jouez à Undercover en version complète ou testez nos 11 autres jeux toujours en développement.
            </p>
          </div>

          <HomeHeroActions />
        </div>
      </section>

      {renderSection(
        "Les incontournables",
        "Les grands classiques pour démarrer la soirée tout de suite.",
        FEATURED_IDS,
        "featured"
      )}

      {renderSection(
        "Défis, quiz & débats",
        "Des manches rapides pour confronter vos idées et improviser.",
        SOCIAL_IDS,
        "middle"
      )}

      {renderSection(
        "Jeux express & ambiance",
        "Mots, punchlines et coups de projecteur à enchaîner en groupe.",
        EXPRESS_IDS,
        "bottom"
      )}
    </main>
  );
}
