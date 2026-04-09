import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import GameCard from "@/components/GameCard";
import { mockGames, categories } from "@/data/gameData";

const GameCatalog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return mockGames.filter((g) => {
      if (g.status === "draft" || g.status === "suspended") return false;
      if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeCategory !== "All" && !g.category.includes(activeCategory)) return false;
      return true;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground">Game Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">Browse and play instant HTML5 games — no downloads required</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-1 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
            {["All", ...categories].map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary/15 text-primary"
                    : "bg-surface-2 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-sm text-muted-foreground"
          >
            No games found matching your criteria.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameCatalog;
