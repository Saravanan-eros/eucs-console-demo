import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Users, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import LeaderboardRow from "@/components/LeaderboardRow";
import { mockLeaderboard, mockGames } from "@/data/gameData";
import { cn } from "@/lib/utils";

type Scope = "global" | "friends";
type Period = "weekly" | "alltime";

const LeaderboardPage = () => {
  const [scope, setScope] = useState<Scope>("global");
  const [period, setPeriod] = useState<Period>("weekly");
  const [selectedGame, setSelectedGame] = useState(mockGames[0].id);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <Trophy className="h-7 w-7 text-neon-amber" />
            <h1 className="font-heading text-3xl font-bold text-foreground">Leaderboard</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Compete for the top spot — rankings powered by Redis ZSET</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex gap-2">
            {[
              { key: "global" as Scope, label: "Global", icon: Globe },
              { key: "friends" as Scope, label: "Friends", icon: Users },
            ].map((s) => (
              <motion.button
                key={s.key}
                whileTap={{ scale: 0.93 }}
                onClick={() => setScope(s.key)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  scope === s.key ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted-foreground hover:text-foreground"
                )}
              >
                <s.icon className="h-4 w-4" /> {s.label}
              </motion.button>
            ))}
            <div className="h-8 w-px bg-border self-center" />
            {[
              { key: "weekly" as Period, label: "This Week", icon: Calendar },
              { key: "alltime" as Period, label: "All Time", icon: Trophy },
            ].map((p) => (
              <motion.button
                key={p.key}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPeriod(p.key)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  period === p.key ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted-foreground hover:text-foreground"
                )}
              >
                <p.icon className="h-3.5 w-3.5" /> {p.label}
              </motion.button>
            ))}
          </div>

          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none transition-colors"
          >
            {mockGames.map((g) => (
              <option key={g.id} value={g.id}>{g.title}</option>
            ))}
          </select>
        </motion.div>

        {/* Your Position */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">P</div>
              <div>
                <p className="text-sm font-medium text-foreground">Your Rank</p>
                <p className="text-xs text-muted-foreground">PlayerOne · Top 8.5%</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-heading text-2xl font-bold text-primary">#42</span>
              <p className="text-xs text-muted-foreground">Score: 28,400</p>
            </div>
          </div>
        </motion.div>

        {/* Rankings */}
        <div className="mt-6 space-y-2">
          {mockLeaderboard.map((entry, i) => (
            <LeaderboardRow key={entry.userId} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
