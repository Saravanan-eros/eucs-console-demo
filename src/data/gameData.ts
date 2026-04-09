import gameNeonDrift from "@/assets/game-neon-drift.jpg";
import gameBlockBreaker from "@/assets/game-block-breaker.jpg";
import gameHexTactics from "@/assets/game-hex-tactics.jpg";
import gameSkyRunner from "@/assets/game-sky-runner.jpg";
import gamePuzzleMatrix from "@/assets/game-puzzle-matrix.jpg";
import gameCricketBlitz from "@/assets/game-cricket-blitz.jpg";
import gameDungeonCrawler from "@/assets/game-dungeon-crawler.jpg";
import gameColorFlow from "@/assets/game-color-flow.jpg";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "featured" | "suspended";
  minScore: number;
  maxScore: number;
  minPlaySeconds: number;
  developerName: string;
  totalPlays: number;
  rating: number;
  cdnUrl: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string;
  score: number;
  percentile: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  tier: "free" | "eros_pass";
  totalGamesPlayed: number;
  totalScore: number;
  rank: number;
  joinedAt: string;
}

export const categories = [
  "Action", "Puzzle", "Racing", "Strategy", "Arcade", "Sports", "Adventure", "Casual"
];

export const mockGames: Game[] = [
  { id: "1", title: "Neon Drift", description: "High-speed cyberpunk racing through neon-lit streets. Dodge obstacles, collect power-ups, and race to the top of the leaderboard.", category: ["Racing", "Action"], thumbnailUrl: gameNeonDrift, status: "featured", minScore: 0, maxScore: 50000, minPlaySeconds: 30, developerName: "PixelForge Studios", totalPlays: 45230, rating: 4.7, cdnUrl: "https://cdn.erosconsole.in/games/1/" },
  { id: "2", title: "Block Breaker Pro", description: "Classic brick-breaker with power-ups and boss battles. 100+ levels of satisfying destruction.", category: ["Arcade", "Casual"], thumbnailUrl: gameBlockBreaker, status: "featured", minScore: 0, maxScore: 100000, minPlaySeconds: 20, developerName: "RetroWave Games", totalPlays: 38100, rating: 4.5, cdnUrl: "https://cdn.erosconsole.in/games/2/" },
  { id: "3", title: "Hex Tactics", description: "Turn-based hexagonal strategy. Build armies, capture territories, outsmart AI opponents.", category: ["Strategy"], thumbnailUrl: gameHexTactics, status: "published", minScore: 0, maxScore: 10000, minPlaySeconds: 60, developerName: "MindGrid Labs", totalPlays: 22450, rating: 4.8, cdnUrl: "https://cdn.erosconsole.in/games/3/" },
  { id: "4", title: "Sky Runner", description: "Endless runner in the clouds. Jump, slide, and fly through procedurally generated levels.", category: ["Action", "Casual"], thumbnailUrl: gameSkyRunner, status: "published", minScore: 0, maxScore: 999999, minPlaySeconds: 15, developerName: "CloudNine Dev", totalPlays: 67890, rating: 4.3, cdnUrl: "https://cdn.erosconsole.in/games/4/" },
  { id: "5", title: "Puzzle Matrix", description: "Mind-bending color matching puzzles. Chain combos for massive scores. Daily challenges included.", category: ["Puzzle"], thumbnailUrl: gamePuzzleMatrix, status: "featured", minScore: 0, maxScore: 500000, minPlaySeconds: 25, developerName: "BrainStorm Inc", totalPlays: 51200, rating: 4.6, cdnUrl: "https://cdn.erosconsole.in/games/5/" },
  { id: "6", title: "Cricket Blitz", description: "Fast-paced T10 cricket action. Time your shots, pick your team, dominate the league.", category: ["Sports", "Action"], thumbnailUrl: gameCricketBlitz, status: "published", minScore: 0, maxScore: 300, minPlaySeconds: 45, developerName: "DesiGames Studio", totalPlays: 89400, rating: 4.4, cdnUrl: "https://cdn.erosconsole.in/games/6/" },
  { id: "7", title: "Dungeon Crawler X", description: "Procedurally generated dungeons with roguelike elements. Loot, level up, survive.", category: ["Adventure", "Action"], thumbnailUrl: gameDungeonCrawler, status: "published", minScore: 0, maxScore: 75000, minPlaySeconds: 60, developerName: "DarkForge Games", totalPlays: 31200, rating: 4.9, cdnUrl: "https://cdn.erosconsole.in/games/7/" },
  { id: "8", title: "Color Flow", description: "Relaxing color-flow puzzle game. Connect matching colors without crossing paths.", category: ["Puzzle", "Casual"], thumbnailUrl: gameColorFlow, status: "published", minScore: 0, maxScore: 10000, minPlaySeconds: 20, developerName: "ZenPixel", totalPlays: 28700, rating: 4.2, cdnUrl: "https://cdn.erosconsole.in/games/8/" },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "u1", username: "NeonKing_IN", avatarUrl: "", score: 48750, percentile: 99.9 },
  { rank: 2, userId: "u2", username: "PixelDestroyer", avatarUrl: "", score: 47200, percentile: 99.8 },
  { rank: 3, userId: "u3", username: "GamerGuru22", avatarUrl: "", score: 45800, percentile: 99.5 },
  { rank: 4, userId: "u4", username: "SpeedRacer_MH", avatarUrl: "", score: 44100, percentile: 99.2 },
  { rank: 5, userId: "u5", username: "ArcadeWizard", avatarUrl: "", score: 42500, percentile: 98.8 },
  { rank: 6, userId: "u6", username: "ProGamer_DL", avatarUrl: "", score: 41200, percentile: 98.1 },
  { rank: 7, userId: "u7", username: "BlitzMaster", avatarUrl: "", score: 39800, percentile: 97.5 },
  { rank: 8, userId: "u8", username: "RushQueen", avatarUrl: "", score: 38400, percentile: 96.9 },
  { rank: 9, userId: "u9", username: "CyberPilot_KA", avatarUrl: "", score: 37100, percentile: 96.0 },
  { rank: 10, userId: "u10", username: "GameStar_TN", avatarUrl: "", score: 35800, percentile: 95.2 },
];

export const mockUser: UserProfile = {
  id: "u42",
  username: "PlayerOne",
  email: "player@eros.in",
  avatarUrl: "",
  tier: "free",
  totalGamesPlayed: 156,
  totalScore: 234500,
  rank: 42,
  joinedAt: "2026-01-15",
};

export const dailyChallenge = {
  gameId: "5",
  title: "Puzzle Matrix Challenge",
  description: "Score 10,000+ in Puzzle Matrix to earn 500 coins!",
  targetScore: 10000,
  reward: "500 Coins",
  endsIn: "6h 23m",
};
