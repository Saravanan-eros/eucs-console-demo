import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Trophy, Zap, Clock, TrendingUp, Gamepad2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import GameCard from "@/components/GameCard";
import { mockGames, dailyChallenge } from "@/data/gameData";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const HomePage = () => {
  const featuredGames = mockGames.filter((g) => g.status === "featured");
  const trendingGames = [...mockGames].sort((a, b) => b.totalPlays - a.totalPlays).slice(0, 4);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--neon-cyan)/0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--neon-magenta)/0.06),transparent_60%)]" />
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
            >
              <Zap className="h-3 w-3" /> India's #1 Browser Gaming Arena
            </motion.div>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl">
              Play. Compete.{" "}
              <span className="text-gradient-primary">Dominate.</span>
            </h1>
            <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">
              Zero downloads. Instant PhaserJS games. Real-time leaderboards. 
              Compete with players across India — right from your browser.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/games"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground transition-all hover:glow-cyan"
                >
                  <Play className="h-4 w-4" /> Browse Games
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/leaderboard"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-6 py-3 font-heading text-sm font-semibold text-foreground transition-all hover:border-primary/30"
                >
                  <Trophy className="h-4 w-4" /> Leaderboards
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { label: "Active Players", value: "12K+", icon: Gamepad2 },
              { label: "Games Live", value: "45+", icon: Play },
              { label: "Scores Submitted", value: "1.2M", icon: TrendingUp },
              { label: "Avg Session", value: "14 min", icon: Clock },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="rounded-lg border border-border bg-card/50 p-4 transition-colors"
              >
                <stat.icon className="mb-2 h-4 w-4 text-primary" />
                <div className="font-heading text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={`/game/${dailyChallenge.gameId}`}
            className="group block overflow-hidden rounded-xl border border-neon-amber/20 bg-gradient-to-r from-neon-amber/5 via-card to-card transition-all hover:border-neon-amber/40 hover:shadow-lg hover:shadow-neon-amber/5"
          >
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-amber/10"
                >
                  <Zap className="h-6 w-6 text-neon-amber" />
                </motion.div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-neon-amber">Daily Challenge</p>
                  <h3 className="font-heading text-lg font-bold text-foreground">{dailyChallenge.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{dailyChallenge.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-surface-2 px-3 py-1.5 text-center">
                  <div className="text-xs text-muted-foreground">Reward</div>
                  <div className="font-heading text-sm font-bold text-neon-amber">{dailyChallenge.reward}</div>
                </div>
                <div className="rounded-lg bg-surface-2 px-3 py-1.5 text-center">
                  <div className="text-xs text-muted-foreground">Ends in</div>
                  <div className="font-heading text-sm font-bold text-foreground">{dailyChallenge.endsIn}</div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* Featured Games */}
      <section className="container mx-auto px-4 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground">⭐ Featured Games</h2>
          <Link to="/games" className="text-sm text-primary hover:underline">View all →</Link>
        </motion.div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between"
        >
          <h2 className="font-heading text-2xl font-bold text-foreground">🔥 Trending Now</h2>
          <Link to="/games" className="text-sm text-primary hover:underline">View all →</Link>
        </motion.div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trendingGames.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-1 py-8 transition-colors duration-300">
        <div className="container mx-auto flex flex-col items-center gap-3 px-4 text-center">
          <span className="font-heading text-lg font-bold text-gradient-primary">EROS CONSOLE</span>
          <p className="text-xs text-muted-foreground">India's Competitive Browser Gaming Marketplace · 13+ · MEITY Compliant</p>
          <p className="text-xs text-muted-foreground">© 2026 Eros Console. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
