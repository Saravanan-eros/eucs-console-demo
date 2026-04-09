import { useState } from "react";
import { motion } from "framer-motion";
import { User, Trophy, Gamepad2, Star, Settings, Shield, Upload, CreditCard, Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockUser, mockGames } from "@/data/gameData";
import { cn } from "@/lib/utils";

type Tab = "overview" | "admin";

const ProfilePage = () => {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 font-heading text-2xl font-bold text-foreground">
                {mockUser.username.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-2xl font-bold text-foreground">{mockUser.username}</h1>
                  {mockUser.tier === "eros_pass" ? (
                    <span className="flex items-center gap-1 rounded-full bg-neon-amber/15 px-2 py-0.5 text-xs font-semibold text-neon-amber"><Crown className="h-3 w-3" /> Eros Pass</span>
                  ) : (
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs text-muted-foreground">Free</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{mockUser.email} · Joined {mockUser.joinedAt}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Games Played", value: mockUser.totalGamesPlayed, icon: Gamepad2 },
                { label: "Total Score", value: mockUser.totalScore.toLocaleString(), icon: Star },
                { label: "Global Rank", value: `#${mockUser.rank}`, icon: Trophy },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-surface-2 px-4 py-3 text-center">
                  <s.icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                  <div className="font-heading text-lg font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2">
          {[
            { key: "overview" as Tab, label: "Overview", icon: User },
            { key: "admin" as Tab, label: "Admin Panel", icon: Shield },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                tab === t.key ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
            {/* Upgrade CTA */}
            {mockUser.tier === "free" && (
              <div className="rounded-xl border border-neon-amber/20 bg-gradient-to-r from-neon-amber/5 to-card p-6">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-neon-amber" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">Upgrade to Eros Pass</h3>
                    <p className="text-sm text-muted-foreground">Ad-free gaming, exclusive avatar skins, priority challenge access</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button className="rounded-lg bg-neon-amber/15 px-4 py-2 font-heading text-sm font-semibold text-neon-amber transition-colors hover:bg-neon-amber/25">
                    <CreditCard className="mr-2 inline h-4 w-4" /> ₹99/month via UPI
                  </button>
                  <span className="text-xs text-muted-foreground">Powered by Razorpay</span>
                </div>
              </div>
            )}

            {/* Recent Games */}
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Recent Games</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {mockGames.slice(0, 4).map((game) => (
                  <div key={game.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary">
                      {game.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{game.title}</p>
                      <p className="text-xs text-muted-foreground">Best: {Math.floor(game.maxScore * 0.6).toLocaleString()} · {game.totalPlays > 50000 ? "Hot" : "Rising"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-heading text-lg font-bold text-foreground">Account</h2>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Auth: Google SSO via Firebase Authentication</p>
                <p>Tier: {mockUser.tier === "eros_pass" ? "Eros Pass (Active)" : "Free"}</p>
                <p>Data: Stored on Cloud SQL (PostgreSQL 15) — GCP Mumbai Region</p>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "admin" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
            {/* Admin Upload */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-heading text-xl font-bold text-foreground">📦 Upload New Game</h2>
              <p className="mt-1 text-sm text-muted-foreground">Upload HTML5/PhaserJS game files to Google Cloud Storage</p>

              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Game Title</label>
                    <input className="w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none" placeholder="e.g. Space Blaster" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Category</label>
                    <select className="w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none">
                      <option>Action</option><option>Puzzle</option><option>Racing</option><option>Strategy</option>
                      <option>Arcade</option><option>Sports</option><option>Adventure</option><option>Casual</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
                  <textarea className="w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none" rows={3} placeholder="Describe the game..." />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Min Score</label>
                    <input type="number" className="w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none" defaultValue={0} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Max Score</label>
                    <input type="number" className="w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none" defaultValue={100000} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">Min Play Seconds</label>
                    <input type="number" className="w-full rounded-lg border border-border bg-surface-1 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none" defaultValue={30} />
                  </div>
                </div>
                <div className="rounded-lg border-2 border-dashed border-border bg-surface-1 p-8 text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Drop HTML/ZIP file here (max 15MB)</p>
                  <p className="text-xs text-muted-foreground/60">Uploads to GCS: gs://eros-games-prod/{"{gameId}"}/</p>
                </div>
                <button className="w-full rounded-lg bg-primary py-3 font-heading text-sm font-bold text-primary-foreground transition-all hover:glow-cyan">
                  Upload & Create Game Record
                </button>
              </div>
            </div>

            {/* Game Management */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="font-heading text-xl font-bold text-foreground">🎮 Manage Games</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground">
                      <th className="pb-2">Game</th><th className="pb-2">Status</th><th className="pb-2">Plays</th><th className="pb-2">Score Range</th><th className="pb-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGames.slice(0, 5).map((g) => (
                      <tr key={g.id} className="border-b border-border/50">
                        <td className="py-3 font-medium text-foreground">{g.title}</td>
                        <td className="py-3">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-xs",
                            g.status === "featured" ? "bg-neon-amber/15 text-neon-amber" :
                            g.status === "published" ? "bg-neon-green/15 text-neon-green" :
                            "bg-surface-2 text-muted-foreground"
                          )}>
                            {g.status}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground">{g.totalPlays.toLocaleString()}</td>
                        <td className="py-3 text-muted-foreground">{g.minScore}–{g.maxScore}</td>
                        <td className="py-3">
                          <button className="text-xs text-primary hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
