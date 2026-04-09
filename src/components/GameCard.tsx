import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Star, Users } from "lucide-react";
import type { Game } from "@/data/gameData";

const categoryColors: Record<string, string> = {
  Action: "bg-neon-red/15 text-neon-red",
  Puzzle: "bg-neon-cyan/15 text-neon-cyan",
  Racing: "bg-neon-amber/15 text-neon-amber",
  Strategy: "bg-neon-magenta/15 text-neon-magenta",
  Arcade: "bg-neon-green/15 text-neon-green",
  Sports: "bg-neon-amber/15 text-neon-amber",
  Adventure: "bg-accent/15 text-accent",
  Casual: "bg-neon-cyan/15 text-neon-cyan",
};

const GameCard = ({ game, index }: { game: Game; index: number }) => {
  const formatPlays = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Link
        to={`/game/${game.id}`}
        className="group block overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-glow-cyan hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
          {game.thumbnailUrl ? (
            <img src={game.thumbnailUrl} alt={game.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={1024} height={576} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-surface-2 flex items-center justify-center">
              <Gamepad2Icon title={game.title} />
            </div>
          )}
          {game.status === "featured" && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.08 + 0.3 }}
              className="absolute left-2 top-2 rounded-md bg-neon-amber/20 px-2 py-0.5 text-xs font-semibold text-neon-amber backdrop-blur-sm"
            >
              ⭐ Featured
            </motion.span>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-surface-0/0 opacity-0 transition-all duration-300 group-hover:bg-surface-0/50 group-hover:opacity-100">
            <motion.div
              initial={false}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground glow-cyan"
            >
              <Play className="h-5 w-5 ml-0.5" />
            </motion.div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {game.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{game.developerName}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {game.category.map((cat) => (
              <span key={cat} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[cat] || "bg-surface-2 text-muted-foreground"}`}>
                {cat}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-neon-amber" /> {game.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {formatPlays(game.totalPlays)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Gamepad2Icon = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center gap-2 opacity-40">
    <div className="text-3xl font-heading font-bold text-foreground">{title.charAt(0)}</div>
  </div>
);

export default GameCard;
