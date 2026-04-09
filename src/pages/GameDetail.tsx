import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Star, Users, Clock, Shield, Trophy, X, Maximize2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import LeaderboardRow from "@/components/LeaderboardRow";
import { mockGames, mockLeaderboard } from "@/data/gameData";

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const game = mockGames.find((g) => g.id === id);

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32 text-muted-foreground">Game not found.</div>
      </div>
    );
  }

  const formatPlays = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Game Player Modal */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-surface-0/95 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-5xl">
              <div className="flex items-center justify-between rounded-t-xl border border-border bg-surface-1 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
                  <span className="font-heading text-sm font-semibold text-foreground">{game.title}</span>
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">LIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground">
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="aspect-video w-full rounded-b-xl border border-t-0 border-border bg-surface-0">
                {/* Simulated game view — in production, this is the iframe loading cdnUrl with GST */}
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 glow-cyan">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-heading text-xl font-bold text-foreground">{game.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Game loaded via SDK · GST Token Exchanged · Session Active
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-neon-green" /> Secure Session</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Min play: {game.minPlaySeconds}s</span>
                    </div>
                  </div>
                  <p className="mt-4 max-w-sm text-center text-xs text-muted-foreground/60">
                    In production: iframe loads <code className="text-primary/60">{game.cdnUrl}</code> with userId &amp; GST params. SDK handles auth exchange + score submission.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8">
        <Link to="/games" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Games
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              {/* Game thumbnail area */}
              <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface-2">
                {game.thumbnailUrl ? (
                  <img src={game.thumbnailUrl} alt={game.title} className="h-full w-full object-cover" width={1024} height={576} />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-surface-2 flex items-center justify-center">
                    <div className="font-heading text-6xl font-bold text-foreground/10">{game.title}</div>
                  </div>
                )}
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-surface-0/0 transition-all hover:bg-surface-0/40"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground glow-cyan transition-transform hover:scale-110">
                    <Play className="h-7 w-7 ml-1" />
                  </div>
                </button>
                {game.status === "featured" && (
                  <span className="absolute left-3 top-3 rounded-md bg-neon-amber/20 px-2.5 py-1 text-xs font-semibold text-neon-amber">⭐ Featured</span>
                )}
              </div>

              <div className="mt-6">
                <h1 className="font-heading text-3xl font-bold text-foreground">{game.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">by {game.developerName}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">{game.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {game.category.map((cat) => (
                    <span key={cat} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{cat}</span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Rating", value: game.rating.toString(), icon: Star },
                    { label: "Total Plays", value: formatPlays(game.totalPlays), icon: Users },
                    { label: "Min Play Time", value: `${game.minPlaySeconds}s`, icon: Clock },
                    { label: "Max Score", value: game.maxScore.toLocaleString(), icon: Trophy },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-card p-3">
                      <s.icon className="mb-1 h-4 w-4 text-primary" />
                      <div className="font-heading text-lg font-bold text-foreground">{s.value}</div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar — Leaderboard */}
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="h-5 w-5 text-neon-amber" />
                  <h2 className="font-heading text-lg font-bold text-foreground">Leaderboard</h2>
                </div>
                <div className="space-y-2">
                  {mockLeaderboard.slice(0, 5).map((entry, i) => (
                    <LeaderboardRow key={entry.userId} entry={entry} index={i} />
                  ))}
                </div>
                <Link to="/leaderboard" className="mt-4 block text-center text-sm text-primary hover:underline">
                  View Full Rankings →
                </Link>
              </div>

              {/* Play Button Sidebar */}
              <button
                onClick={() => setIsPlaying(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-heading text-lg font-bold text-primary-foreground transition-all hover:glow-cyan"
              >
                <Play className="h-5 w-5" /> PLAY NOW
              </button>

              {/* SDK Info */}
              <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <h3 className="font-heading text-sm font-semibold text-foreground">🔒 GST Security Flow</h3>
                <div className="mt-2 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
                    <span>Short-lived Game Session Token (15-min TTL)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
                    <span>Single-use token exchange via SDK</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
                    <span>Score range validation: {game.minScore}–{game.maxScore}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-green" />
                    <span>Min play time: {game.minPlaySeconds}s anti-cheat gate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
