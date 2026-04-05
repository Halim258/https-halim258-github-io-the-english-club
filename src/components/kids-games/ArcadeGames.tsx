import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

// ═══════════════════════════════════════════════════════════
// TIC TAC TOE
// ═══════════════════════════════════════════════════════════
type TTTCell = "X" | "O" | null;
type TTTDifficulty = "easy" | "medium" | "hard";

const winLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkWinner(board: TTTCell[]): TTTCell {
  for (const [a,b,c] of winLines) { if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]; }
  return null;
}

function minimax(board: TTTCell[], isMax: boolean, depth: number): number {
  const winner = checkWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every(c => c !== null)) return 0;
  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) { if (!board[i]) { board[i] = "O"; best = Math.max(best, minimax(board, false, depth + 1)); board[i] = null; } }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) { if (!board[i]) { board[i] = "X"; best = Math.min(best, minimax(board, true, depth + 1)); board[i] = null; } }
    return best;
  }
}

function getAIMove(board: TTTCell[], difficulty: TTTDifficulty): number {
  const empty = board.map((c, i) => c === null ? i : -1).filter(i => i !== -1);
  if (empty.length === 0) return -1;

  if (difficulty === "easy") return empty[Math.floor(Math.random() * empty.length)];

  if (difficulty === "medium" && Math.random() < 0.4) return empty[Math.floor(Math.random() * empty.length)];

  let bestScore = -Infinity; let bestMove = empty[0];
  for (const i of empty) {
    board[i] = "O";
    const score = minimax(board, false, 0);
    board[i] = null;
    if (score > bestScore) { bestScore = score; bestMove = i; }
  }
  return bestMove;
}

export function TicTacToeGame() {
  const [difficulty, setDifficulty] = useState<TTTDifficulty>("easy");
  const [board, setBoard] = useState<TTTCell[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<TTTCell | "draw" | null>(null);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const reset = () => { setBoard(Array(9).fill(null)); setIsPlayerTurn(true); setWinner(null); };

  useEffect(() => { reset(); }, [difficulty]);

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const move = getAIMove(newBoard, difficulty);
        if (move >= 0) {
          newBoard[move] = "O"; setBoard(newBoard);
          const w = checkWinner(newBoard);
          if (w) { setWinner(w); setScores(s => ({ ...s, ai: s.ai + 1 })); }
          else if (newBoard.every(c => c)) { setWinner("draw"); setScores(s => ({ ...s, draws: s.draws + 1 })); }
          else setIsPlayerTurn(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner, difficulty]);

  const handleClick = (i: number) => {
    if (board[i] || !isPlayerTurn || winner) return;
    const newBoard = [...board]; newBoard[i] = "X"; setBoard(newBoard);
    const w = checkWinner(newBoard);
    if (w) { setWinner(w); setScores(s => ({ ...s, player: s.player + 1 })); }
    else if (newBoard.every(c => c)) { setWinner("draw"); setScores(s => ({ ...s, draws: s.draws + 1 })); }
    else setIsPlayerTurn(false);
  };

  const winningLine = winner && winner !== "draw" ? winLines.find(([a,b,c]) => board[a] === winner && board[b] === winner && board[c] === winner) : null;

  return (
    <div className="text-center">
      <div className="flex justify-center gap-2 mb-4">
        {(["easy","medium","hard"] as TTTDifficulty[]).map(d => (
          <button key={d} onClick={() => setDifficulty(d)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all capitalize ${difficulty === d ? "bg-primary text-primary-foreground shadow-md" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}>
            {d === "easy" ? "🌱" : d === "medium" ? "🌟" : "🔥"} {d}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-6 mb-4 text-sm">
        <span>You (❌): <b>{scores.player}</b></span>
        <span>Draws: <b>{scores.draws}</b></span>
        <span>AI (⭕): <b>{scores.ai}</b></span>
      </div>
      <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-4">
        {board.map((cell, i) => (
          <motion.button key={i} whileTap={{ scale: 0.9 }} onClick={() => handleClick(i)}
            className={`h-20 rounded-xl border-2 text-3xl font-bold transition-all ${
              winningLine?.includes(i) ? "bg-yellow-100 border-yellow-400 dark:bg-yellow-900/30" :
              cell ? "bg-muted/30" : "hover:bg-primary/5 hover:border-primary/30"
            } ${cell === "X" ? "text-blue-500" : cell === "O" ? "text-red-500" : ""}`}>
            {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""}
          </motion.button>
        ))}
      </div>
      {winner && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <p className="font-bold text-lg mb-2">
            {winner === "X" ? "🎉 You win!" : winner === "O" ? "🤖 AI wins!" : "🤝 It's a draw!"}
          </p>
          <Button onClick={reset} variant="outline" size="sm" className="rounded-full gap-2">
            <RotateCcw className="h-4 w-4" /> Play Again
          </Button>
        </motion.div>
      )}
      {!winner && <p className="text-sm text-muted-foreground">{isPlayerTurn ? "Your turn! (❌)" : "AI is thinking... 🤔"}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SPACE DUCK
// ═══════════════════════════════════════════════════════════
export function SpaceDuckGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameRef = useRef<{ duck: { y: number; vy: number }; pipes: { x: number; gapY: number }[]; score: number; running: boolean; frame: number }>({
    duck: { y: 200, vy: 0 }, pipes: [], score: 0, running: false, frame: 0
  });

  const W = 400, H = 400, DUCK_SIZE = 30, GAP = 120, PIPE_W = 50, GRAVITY = 0.4, JUMP = -7;

  const startGame = () => {
    const g = gameRef.current;
    g.duck = { y: 200, vy: 0 }; g.pipes = []; g.score = 0; g.running = true; g.frame = 0;
    setScore(0); setGameOver(false); setStarted(true);
  };

  const jump = useCallback(() => {
    if (!gameRef.current.running) { startGame(); return; }
    gameRef.current.duck.vy = JUMP;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;

    const handler = (e: KeyboardEvent) => { if (e.code === "Space") { e.preventDefault(); jump(); } };
    window.addEventListener("keydown", handler);

    let animId: number;
    const loop = () => {
      const g = gameRef.current;
      ctx.clearRect(0, 0, W, H);

      // Background
      ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, W, H);
      // Stars
      for (let i = 0; i < 30; i++) {
        const sx = (i * 137 + g.frame * 0.2) % W, sy = (i * 97) % H;
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.3})`;
        ctx.fillRect(sx, sy, 2, 2);
      }

      if (g.running) {
        g.frame++;
        // Duck physics
        g.duck.vy += GRAVITY;
        g.duck.y += g.duck.vy;

        // Pipes
        if (g.frame % 100 === 0) {
          g.pipes.push({ x: W, gapY: 80 + Math.random() * (H - GAP - 160) });
        }

        for (const pipe of g.pipes) { pipe.x -= 2.5; }
        g.pipes = g.pipes.filter(p => p.x > -PIPE_W);

        // Collision
        const duckLeft = 60, duckRight = 60 + DUCK_SIZE, duckTop = g.duck.y, duckBottom = g.duck.y + DUCK_SIZE;
        for (const pipe of g.pipes) {
          if (duckRight > pipe.x && duckLeft < pipe.x + PIPE_W) {
            if (duckTop < pipe.gapY || duckBottom > pipe.gapY + GAP) {
              g.running = false; setGameOver(true); setScore(g.score);
            }
          }
          if (Math.abs(pipe.x - 60) < 3 && !("scored" in pipe)) {
            g.score++; setScore(g.score); (pipe as any).scored = true;
          }
        }

        if (g.duck.y < 0 || g.duck.y > H - DUCK_SIZE) {
          g.running = false; setGameOver(true); setScore(g.score);
        }
      }

      // Draw pipes
      ctx.fillStyle = "#22c55e";
      for (const pipe of gameRef.current.pipes) {
        ctx.fillRect(pipe.x, 0, PIPE_W, pipe.gapY);
        ctx.fillRect(pipe.x, pipe.gapY + GAP, PIPE_W, H - pipe.gapY - GAP);
        // Pipe caps
        ctx.fillStyle = "#16a34a";
        ctx.fillRect(pipe.x - 4, pipe.gapY - 20, PIPE_W + 8, 20);
        ctx.fillRect(pipe.x - 4, pipe.gapY + GAP, PIPE_W + 8, 20);
        ctx.fillStyle = "#22c55e";
      }

      // Draw duck 🦆
      const dy = gameRef.current.duck.y;
      ctx.font = `${DUCK_SIZE}px serif`;
      ctx.fillText("🦆", 60, dy + DUCK_SIZE - 4);

      // Score
      ctx.fillStyle = "#fff"; ctx.font = "bold 24px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(`${gameRef.current.score}`, W / 2, 40);
      ctx.textAlign = "start";

      if (!g.running && started) {
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fff"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Game Over!", W / 2, H / 2 - 20);
        ctx.font = "16px sans-serif";
        ctx.fillText(`Score: ${g.score}`, W / 2, H / 2 + 15);
        ctx.fillText("Tap or press Space to restart", W / 2, H / 2 + 45);
        ctx.textAlign = "start";
      }

      if (!started) {
        ctx.fillStyle = "#fff"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("🦆 Space Duck", W / 2, H / 2 - 30);
        ctx.font = "14px sans-serif";
        ctx.fillText("Tap or press Space to fly!", W / 2, H / 2 + 10);
        ctx.fillText("Avoid the pipes!", W / 2, H / 2 + 35);
        ctx.textAlign = "start";
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("keydown", handler); };
  }, [jump, started]);

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-3">Fly through space! Tap or press Space to flap 🦆🚀</p>
      <div className="flex items-center justify-center gap-2 mb-3">
        <Trophy className="h-4 w-4 text-yellow-500" /><span className="font-bold text-sm">Best: {score}</span>
      </div>
      <canvas ref={canvasRef} width={W} height={H} onClick={jump}
        className="mx-auto rounded-2xl border-2 shadow-lg cursor-pointer max-w-full" style={{ touchAction: "none" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MARIO JUMP (Super Jump)
// ═══════════════════════════════════════════════════════════
export function MarioJumpGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameRef = useRef<{ player: { x: number; y: number; vy: number; onGround: boolean }; platforms: { x: number; y: number; w: number }[]; score: number; running: boolean; scrollY: number; frame: number }>({
    player: { x: 185, y: 350, vy: 0, onGround: false }, platforms: [], score: 0, running: false, scrollY: 0, frame: 0
  });

  const W = 400, H = 500;

  const startGame = () => {
    const g = gameRef.current;
    g.player = { x: 185, y: 350, vy: -10, onGround: false };
    g.platforms = [];
    for (let i = 0; i < 8; i++) {
      g.platforms.push({ x: Math.random() * (W - 80), y: 400 - i * 65, w: 70 + Math.random() * 30 });
    }
    g.score = 0; g.scrollY = 0; g.running = true; g.frame = 0;
    setScore(0); setGameOver(false); setStarted(true);
  };

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;

    let moveLeft = false, moveRight = false;
    const keyDown = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") moveLeft = true;
      if (e.code === "ArrowRight" || e.code === "KeyD") moveRight = true;
      if (e.code === "Space" && !gameRef.current.running) startGame();
    };
    const keyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft" || e.code === "KeyA") moveLeft = false;
      if (e.code === "ArrowRight" || e.code === "KeyD") moveRight = false;
    };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    // Touch controls
    let touchX: number | null = null;
    const touchStart = (e: TouchEvent) => {
      if (!gameRef.current.running && started) { startGame(); return; }
      if (!gameRef.current.running) { startGame(); return; }
      touchX = e.touches[0].clientX;
    };
    const touchMove = (e: TouchEvent) => {
      if (touchX === null) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      gameRef.current.player.x = Math.max(0, Math.min(W - 30, x - 15));
    };
    const touchEnd = () => { touchX = null; };
    canvas.addEventListener("touchstart", touchStart);
    canvas.addEventListener("touchmove", touchMove);
    canvas.addEventListener("touchend", touchEnd);

    let animId: number;
    const loop = () => {
      const g = gameRef.current;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#e0f2fe"; ctx.fillRect(0, 0, W, H);

      // Clouds
      ctx.font = "30px serif";
      ctx.fillText("☁️", (g.frame * 0.3) % (W + 50) - 50, 60);
      ctx.fillText("☁️", (g.frame * 0.2 + 200) % (W + 50) - 50, 120);

      if (g.running) {
        g.frame++;
        if (moveLeft) g.player.x -= 5;
        if (moveRight) g.player.x += 5;
        if (g.player.x < -15) g.player.x = W - 15;
        if (g.player.x > W) g.player.x = -15;

        g.player.vy += 0.35;
        g.player.y += g.player.vy;

        // Scroll
        if (g.player.y < H / 2) {
          const shift = H / 2 - g.player.y;
          g.player.y = H / 2;
          g.scrollY += shift;
          g.score = Math.max(g.score, Math.floor(g.scrollY / 10));
          setScore(g.score);
          for (const p of g.platforms) p.y += shift;
          g.platforms = g.platforms.filter(p => p.y < H + 20);
          while (g.platforms.length < 8) {
            const topY = Math.min(...g.platforms.map(p => p.y));
            g.platforms.push({ x: Math.random() * (W - 80), y: topY - 55 - Math.random() * 20, w: 60 + Math.random() * 30 });
          }
        }

        // Platform collision (only falling)
        if (g.player.vy > 0) {
          for (const p of g.platforms) {
            if (g.player.x + 25 > p.x && g.player.x + 5 < p.x + p.w &&
                g.player.y + 30 > p.y && g.player.y + 30 < p.y + 12) {
              g.player.vy = -11;
              g.player.onGround = true;
            }
          }
        }

        if (g.player.y > H + 50) {
          g.running = false; setGameOver(true);
        }
      }

      // Draw platforms
      for (const p of g.platforms) {
        ctx.fillStyle = "#22c55e";
        const r = 6;
        ctx.beginPath();
        ctx.moveTo(p.x + r, p.y);
        ctx.lineTo(p.x + p.w - r, p.y);
        ctx.quadraticCurveTo(p.x + p.w, p.y, p.x + p.w, p.y + r);
        ctx.lineTo(p.x + p.w, p.y + 10);
        ctx.lineTo(p.x, p.y + 10);
        ctx.lineTo(p.x, p.y + r);
        ctx.quadraticCurveTo(p.x, p.y, p.x + r, p.y);
        ctx.fill();
        ctx.fillStyle = "#16a34a";
        ctx.fillRect(p.x, p.y + 8, p.w, 4);
      }

      // Draw player 🏃
      ctx.font = "28px serif";
      ctx.fillText(gameRef.current.player.vy < 0 ? "🦸" : "🏃", g.player.x, g.player.y + 28);

      // Score
      ctx.fillStyle = "#1e293b"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "left";
      ctx.fillText(`⭐ ${g.score}`, 15, 35);

      if (!started) {
        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fff"; ctx.font = "bold 24px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("🦸 Super Jump!", W/2, H/2 - 30);
        ctx.font = "14px sans-serif";
        ctx.fillText("← → or touch to move", W/2, H/2 + 10);
        ctx.fillText("Tap to start!", W/2, H/2 + 35);
        ctx.textAlign = "start";
      }

      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = "#fff"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("Game Over!", W/2, H/2 - 20);
        ctx.font = "16px sans-serif";
        ctx.fillText(`Score: ${g.score}`, W/2, H/2 + 15);
        ctx.fillText("Tap to restart", W/2, H/2 + 45);
        ctx.textAlign = "start";
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      canvas.removeEventListener("touchstart", touchStart);
      canvas.removeEventListener("touchmove", touchMove);
      canvas.removeEventListener("touchend", touchEnd);
    };
  }, [started, gameOver]);

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-3">Jump as high as you can! Use ← → keys or touch to move 🦸</p>
      <canvas ref={canvasRef} width={W} height={H}
        onClick={() => { if (!gameRef.current.running) startGame(); }}
        className="mx-auto rounded-2xl border-2 shadow-lg cursor-pointer max-w-full" style={{ touchAction: "none" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CHESS (Simple)
// ═══════════════════════════════════════════════════════════
type ChessPiece = { type: string; color: "w" | "b"; emoji: string } | null;

const initialBoard = (): ChessPiece[] => {
  const emojis: Record<string, Record<string, string>> = {
    w: { K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙" },
    b: { K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟" },
  };
  const backRow = ["R","N","B","Q","K","B","N","R"];
  const board: ChessPiece[] = Array(64).fill(null);
  for (let i = 0; i < 8; i++) {
    board[i] = { type: backRow[i], color: "b", emoji: emojis.b[backRow[i]] };
    board[8 + i] = { type: "P", color: "b", emoji: emojis.b.P };
    board[48 + i] = { type: "P", color: "w", emoji: emojis.w.P };
    board[56 + i] = { type: backRow[i], color: "w", emoji: emojis.w[backRow[i]] };
  }
  return board;
};

function getBasicMoves(board: ChessPiece[], from: number, piece: NonNullable<ChessPiece>): number[] {
  const moves: number[] = [];
  const r = Math.floor(from / 8), c = from % 8;
  const color = piece.color;

  const addIfValid = (tr: number, tc: number) => {
    if (tr < 0 || tr > 7 || tc < 0 || tc > 7) return false;
    const idx = tr * 8 + tc;
    const target = board[idx];
    if (target && target.color === color) return false;
    moves.push(idx);
    return !target; // continue if empty
  };

  switch (piece.type) {
    case "P": {
      const dir = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
      if (!board[(r + dir) * 8 + c]) {
        moves.push((r + dir) * 8 + c);
        if (r === startRow && !board[(r + 2 * dir) * 8 + c]) moves.push((r + 2 * dir) * 8 + c);
      }
      for (const dc of [-1, 1]) {
        const tc = c + dc, tr = r + dir;
        if (tc >= 0 && tc <= 7 && tr >= 0 && tr <= 7) {
          const target = board[tr * 8 + tc];
          if (target && target.color !== color) moves.push(tr * 8 + tc);
        }
      }
      break;
    }
    case "R":
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        for (let i = 1; i < 8; i++) { if (!addIfValid(r + dr * i, c + dc * i)) break; }
      }
      break;
    case "B":
      for (const [dr, dc] of [[1,1],[1,-1],[-1,1],[-1,-1]]) {
        for (let i = 1; i < 8; i++) { if (!addIfValid(r + dr * i, c + dc * i)) break; }
      }
      break;
    case "Q":
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
        for (let i = 1; i < 8; i++) { if (!addIfValid(r + dr * i, c + dc * i)) break; }
      }
      break;
    case "N":
      for (const [dr, dc] of [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]]) addIfValid(r + dr, c + dc);
      break;
    case "K":
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) addIfValid(r + dr, c + dc);
      break;
  }
  return moves;
}

export function ChessGame() {
  const [board, setBoard] = useState<ChessPiece[]>(initialBoard);
  const [selected, setSelected] = useState<number | null>(null);
  const [validMoves, setValidMoves] = useState<number[]>([]);
  const [turn, setTurn] = useState<"w" | "b">("w");
  const [captured, setCaptured] = useState<{ w: string[]; b: string[] }>({ w: [], b: [] });
  const [status, setStatus] = useState("");

  const reset = () => {
    setBoard(initialBoard()); setSelected(null); setValidMoves([]);
    setTurn("w"); setCaptured({ w: [], b: [] }); setStatus("");
  };

  const handleClick = (idx: number) => {
    const piece = board[idx];

    if (selected !== null && validMoves.includes(idx)) {
      // Move
      const newBoard = [...board];
      const moving = newBoard[selected]!;
      const target = newBoard[idx];

      if (target) {
        setCaptured(prev => ({
          ...prev,
          [turn]: [...prev[turn], target.emoji]
        }));
        if (target.type === "K") {
          setStatus(turn === "w" ? "White wins! 🎉" : "Black wins! 🎉");
        }
      }

      // Pawn promotion
      if (moving.type === "P" && (idx < 8 || idx >= 56)) {
        const emojis = turn === "w" ? "♕" : "♛";
        newBoard[idx] = { type: "Q", color: turn, emoji: emojis };
      } else {
        newBoard[idx] = moving;
      }
      newBoard[selected] = null;

      setBoard(newBoard);
      setSelected(null);
      setValidMoves([]);
      setTurn(turn === "w" ? "b" : "w");
      return;
    }

    if (piece && piece.color === turn) {
      setSelected(idx);
      setValidMoves(getBasicMoves(board, idx, piece));
    } else {
      setSelected(null);
      setValidMoves([]);
    }
  };

  return (
    <div className="text-center">
      <p className="text-muted-foreground mb-3">Play chess! {turn === "w" ? "White" : "Black"}'s turn ♟️</p>
      {status && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-3">
          <p className="font-bold text-lg text-primary">{status}</p>
          <Button onClick={reset} variant="outline" size="sm" className="mt-1 rounded-full gap-2">
            <RotateCcw className="h-4 w-4" /> New Game
          </Button>
        </motion.div>
      )}
      <div className="flex justify-center gap-4 mb-3 text-sm">
        <span>White captured: {captured.w.join(" ") || "—"}</span>
        <span>Black captured: {captured.b.join(" ") || "—"}</span>
      </div>
      <div className="inline-grid grid-cols-8 gap-0 rounded-xl overflow-hidden border-2 shadow-lg">
        {board.map((piece, i) => {
          const r = Math.floor(i / 8), c = i % 8;
          const isLight = (r + c) % 2 === 0;
          const isSelected = selected === i;
          const isValidMove = validMoves.includes(i);
          return (
            <button key={i} onClick={() => !status && handleClick(i)}
              className={`h-10 w-10 md:h-12 md:w-12 flex items-center justify-center text-xl md:text-2xl transition-all ${
                isSelected ? "bg-yellow-300 dark:bg-yellow-700" :
                isValidMove ? (piece ? "bg-red-200 dark:bg-red-900/50" : "bg-blue-200 dark:bg-blue-900/50") :
                isLight ? "bg-amber-100 dark:bg-amber-900/30" : "bg-amber-700/60 dark:bg-amber-800/60"
              }`}>
              {piece?.emoji || (isValidMove ? "•" : "")}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <Button onClick={reset} variant="outline" size="sm" className="rounded-full gap-2">
          <RotateCcw className="h-4 w-4" /> Reset Board
        </Button>
      </div>
    </div>
  );
}
