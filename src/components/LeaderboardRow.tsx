import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import type { LeaderboardEntry } from "@/data/gameData";
import { cn } from "@/lib/utils";

const rankStyles: Record<number, { icon: typeof Trophy; color: string; bg: string }> = {
  1: { icon: Trophy, color: "text-neon-amber", bg: "bg-neon-amber/10 border-neon-amber/30" },
  2: { icon: Medal, color: "text-foreground/70", bg: "bg-surface-2 border-foreground/20" },
  3: { icon: Award, color: "text-neon-red/70", bg: "bg-neon-red/10 border-neon-red/20" },
};

const LeaderboardRow = ({ entry, index }: { entry: LeaderboardEntry; index: number }) => {
  const rankStyle = rankStyles[entry.rank];
  const isTop3 = entry.rank <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ x: 4, backgroundColor: "hsl(var(--surface-2) / 0.5)" }}
      className={cn(
        "flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors cursor-default",
        isTop3 && rankStyle ? rankStyle.bg : "border-border bg-card"
      )}
    >
      <div className="flex w-10 items-center justify-center">
        {isTop3 && rankStyle ? (
          (() => { const Icon = rankStyle.icon; return <Icon className={cn("h-5 w-5", rankStyle.color)} />; })()
        ) : (
          <span className="font-heading text-lg font-bold text-muted-foreground">#{entry.rank}</span>
        )}
      </div>

      <div className="flex flex-1 items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-3 font-heading text-sm font-bold text-foreground">
          {entry.username.charAt(0)}
        </div>
        <div>
          <span className={cn("font-medium", isTop3 ? "text-foreground" : "text-foreground/80")}>
            {entry.username}
          </span>
          <p className="text-xs text-muted-foreground">Top {entry.percentile}%</p>
        </div>
      </div>

      <div className="text-right">
        <span className={cn("font-heading text-lg font-bold", isTop3 && rankStyle ? rankStyle.color : "text-primary")}>
          {entry.score.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export default LeaderboardRow;
