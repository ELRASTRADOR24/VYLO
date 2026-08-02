"use client";

import { use, useEffect, useState } from "react";
import { useEngineStore } from "@/engine/store";
import { useAppStore } from "@/store/useAppStore";
import { generateRoles, assignWords, UndercoverRole, UndercoverPlayer } from "@/games/undercover/logic";
import { undercoverConfig } from "@/games/undercover/config";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { User, Eye, EyeOff, Skull, Trophy, Share } from "lucide-react";
import { sfxTap, sfxSuccess, sfxError, sfxSuspense, sfxVictory, sfxReveal, sfxJoin, sfxSelect } from "@/lib/audio";

// Fallback local des mots si MongoDB n'est pas dispo
const LOCAL_WORDS = [
  { civilian: "Pomme", undercover: "Poire", category: "Nourriture" },
  { civilian: "Cinéma", undercover: "Théâtre", category: "Loisirs" },
  { civilian: "Océan", undercover: "Mer", category: "Nature" },
  { civilian: "Chien", undercover: "Loup", category: "Animaux" },
];

export default function UndercoverGame({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const { 
    gameState, setGameState, players, initGame, 
    addPlayer, removePlayer, updatePlayer 
  } = useEngineStore();
  const { incrementStat } = useAppStore();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  
  // Phase de distribution
  const playerArray = Object.values(players) as UndercoverPlayer[];
  const activePlayers = playerArray.filter(p => !p.isEliminated);

  useEffect(() => {
    // Initialise le moteur pour Undercover
    initGame(undercoverConfig, "local", roomId);
  }, [roomId, initGame]);

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    const id = `player_${Date.now()}`;
    addPlayer({ id, name: newPlayerName.trim(), isHost: false, isReady: true, isConnected: true, score: 0 });
    setNewPlayerName("");
    sfxJoin();
  };

  const handleStartGame = () => {
    if (playerArray.length < 3) return alert("Il faut au moins 3 joueurs");
    
    // 1. Génération des rôles
    const roles = generateRoles(playerArray.length);
    // 2. Choix d'un mot aléatoire
    const wordPair = LOCAL_WORDS[Math.floor(Math.random() * LOCAL_WORDS.length)];
    // 3. Assignation
    const updatedPlayers = assignWords(players as Record<string, UndercoverPlayer>, roles, wordPair);
    
    // Update store (Note: In a full app, we'd add an action in engine store for bulk update)
    Object.values(updatedPlayers).forEach(p => updatePlayer(p.id, p));
    
    sfxSuspense();
    setGameState("START");
    setCurrentPlayerIndex(0);
    setShowWord(false);
  };

  const nextDistribution = () => {
    if (currentPlayerIndex < playerArray.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setShowWord(false);
    } else {
      setGameState("PLAYING");
    }
  };

  const handleEliminate = (playerId: string) => {
    updatePlayer(playerId, { isEliminated: true } as any);
    
    // Vérification de victoire simplifiée
    const remaining = playerArray.filter(p => p.id !== playerId && !p.isEliminated);
    const undercoversLeft = remaining.filter(p => p.gameRole === "Undercover" || p.gameRole === "MrWhite").length;
    const civiliansLeft = remaining.filter(p => p.gameRole === "Civilian").length;

    if (undercoversLeft === 0) {
      sfxVictory();
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("civilianWins");
      setGameState("END");
    } else if (undercoversLeft >= civiliansLeft) {
      sfxVictory();
      incrementStat("gamesPlayed");
      incrementStat("wins");
      incrementStat("undercoverWins");
      setGameState("END");
    } else {
      sfxError();
      setGameState("PLAYING"); // On continue
    }
  };

  // --- RENDUS SELON L'ÉTAT ---

  if (gameState === "LOBBY") {
    return (
      <main className="min-h-screen pt-20 pb-24 px-6 flex flex-col items-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Lobby - Undercover</h1>
        <p className="text-gray-400 mb-8">Code : {roomId}</p>

        <form onSubmit={handleAddPlayer} className="w-full flex gap-2 mb-8">
          <input 
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Nom du joueur"
            className="flex-1 bg-surface border border-white/5 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
          />
          <Button type="submit" variant="primary">Ajouter</Button>
        </form>

        <div className="w-full space-y-3 mb-8">
          {playerArray.map((p, i) => (
            <Card key={p.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <span className="font-medium text-lg">{p.name}</span>
              </div>
              <button onClick={() => removePlayer(p.id)} className="text-red-400 p-2">✕</button>
            </Card>
          ))}
          {playerArray.length === 0 && (
            <div className="text-center text-gray-500 py-8">Aucun joueur pour le moment.</div>
          )}
        </div>

        {playerArray.length >= 3 && (
          <Button variant="primary" className="w-full text-lg py-4" onClick={handleStartGame}>
            Lancer la partie ({playerArray.length} joueurs)
          </Button>
        )}
      </main>
    );
  }

  if (gameState === "START") {
    const currentPlayer = playerArray[currentPlayerIndex];
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2">Tour de {currentPlayer?.name}</h2>
        <p className="text-gray-400 mb-12">Passez le téléphone à {currentPlayer?.name}.</p>

        <Card className="w-full aspect-square flex flex-col items-center justify-center p-8 mb-8 relative overflow-hidden">
          {showWord ? (
            <div className="animate-in fade-in zoom-in duration-300">
              <span className="text-sm text-primary font-bold tracking-widest uppercase mb-4 block">Votre mot secret</span>
              <h1 className="text-5xl font-black mb-6">{currentPlayer?.word}</h1>
              {currentPlayer?.gameRole === "MrWhite" && (
                <p className="text-red-400 font-medium">Vous êtes Mr White. Essayez de deviner le mot des autres !</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <EyeOff size={48} className="text-white/20 mb-4" />
              <p className="text-lg font-medium text-white/50">Mot caché</p>
            </div>
          )}
        </Card>

        <Button 
          variant={showWord ? "secondary" : "primary"}
          className="w-full py-4 text-lg"
          onClick={() => {
            if (!showWord) { sfxReveal(); setShowWord(true); }
            else { sfxTap(); nextDistribution(); }
          }}
        >
          {showWord ? "J'ai mémorisé mon mot" : "Voir mon mot"}
        </Button>
      </main>
    );
  }

  if (gameState === "PLAYING") {
    return (
      <main className="min-h-screen pt-20 p-6 flex flex-col items-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Phase de débat</h1>
        <p className="text-gray-400 mb-8">Discutez et trouvez les imposteurs !</p>

        <div className="w-full grid grid-cols-2 gap-4 mb-8">
          {playerArray.map(p => (
            <Card key={p.id} className={`p-4 flex flex-col items-center text-center ${p.isEliminated ? 'opacity-30' : ''}`}>
              <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center mb-3">
                {p.isEliminated ? <Skull className="text-red-500" /> : <User className="text-white/70" />}
              </div>
              <span className="font-bold">{p.name}</span>
              {p.isEliminated && <span className="text-xs text-red-400 uppercase font-bold mt-1">{p.gameRole}</span>}
            </Card>
          ))}
        </div>

        <Button variant="primary" className="w-full py-4 text-lg bg-red-500 hover:bg-red-600 border-red-500 text-white" onClick={() => { sfxSuspense(); setGameState("VOTING"); }}>
          Passer au vote
        </Button>
      </main>
    );
  }

  if (gameState === "VOTING") {
    return (
      <main className="min-h-screen pt-20 p-6 flex flex-col items-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Qui éliminer ?</h1>
        <p className="text-red-400 mb-8">Attention, l'élimination est définitive.</p>

        <div className="w-full space-y-3">
          {activePlayers.map(p => (
            <Card 
              key={p.id} 
              className="p-4 flex justify-between items-center cursor-pointer hover:border-red-500/50 transition-colors"
              onClick={() => {
                if(confirm(`Éliminer ${p.name} ?`)) {
                  handleEliminate(p.id);
                }
              }}
            >
              <span className="font-bold text-lg">{p.name}</span>
              <Skull className="text-white/20" />
            </Card>
          ))}
        </div>
        
        <Button variant="secondary" className="w-full mt-8" onClick={() => setGameState("PLAYING")}>
          Annuler (Retour au débat)
        </Button>
      </main>
    );
  }

  if (gameState === "END") {
    // Determine winner purely for display
    const remaining = playerArray.filter(p => !p.isEliminated);
    const undercoversLeft = remaining.filter(p => p.gameRole === "Undercover" || p.gameRole === "MrWhite").length;
    const isCivilianWin = undercoversLeft === 0;

    const handleShare = async () => {
      const shareData = {
        title: "Soirée VYLO",
        text: `Nous venons de jouer à Undercover ! Les ${isCivilianWin ? "Civils" : "Imposteurs"} ont gagné. Rejoins-nous !`,
        url: "https://vylo.app"
      };
      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          console.error("Partage annulé", err);
        }
      } else {
        alert("Le partage natif n'est pas supporté sur cet appareil.");
      }
    };

    return (
      <main className="min-h-screen flex flex-col items-center py-10 px-6 max-w-md mx-auto">
        <h1 className="text-3xl font-black mb-8">Bilan de la soirée</h1>
        
        <Card className="w-full flex flex-col items-center p-8 mb-8 overflow-hidden relative shadow-glow">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
          <Trophy size={48} className={isCivilianWin ? "text-blue-400 mb-4" : "text-red-400 mb-4"} />
          <h2 className="text-2xl font-bold mb-2 text-center">
            Victoire des {isCivilianWin ? "Civils" : "Imposteurs"} !
          </h2>
          <p className="text-foreground/50 text-sm mb-6 text-center">
            Une partie mémorable.
          </p>
          
          <div className="w-full space-y-2">
            {playerArray.map(p => (
              <div key={p.id} className="flex justify-between items-center text-sm py-2 border-b border-white/5 last:border-0">
                <span className="font-bold flex items-center gap-2">
                  {p.isEliminated && <Skull size={14} className="text-red-500" />} {p.name}
                </span>
                <span className={`font-bold ${p.gameRole === "Civilian" ? "text-blue-400" : "text-red-400"}`}>
                  {p.gameRole} {p.word && p.word !== "^^" ? `(${p.word})` : ""}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Button variant="primary" className="w-full py-4 text-lg mb-4 flex items-center justify-center gap-2" onClick={handleShare}>
          <Share size={20} /> Partager le résumé
        </Button>

        <Button variant="surface" className="w-full py-4 text-lg" onClick={() => setGameState("LOBBY")}>
          Rejouer
        </Button>
      </main>
    );
  }

  return null;
}
