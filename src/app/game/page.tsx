"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PetSprite from "../../components/PetSprite";
import StatsBar from "~/components/StatsBar";

const petFaces = {
  idle: "(^-^)", // Neutral happy face
  idle2: "(◕‿◕)", // Slightly different happy face
  sleep: "(-_-)", // Sleeping face
  dance: "♪(┌・。・)┌♪", // Dancing with music notes
  talk: "(^o^)/", // Talking or waving
  excited: "(>w<)", // Excited expression
  sleepy: "(=_=)", // Drowsy look
  bored: "(._.)", // Neutral, bored look
  crying: "(T_T)", // Crying face
  box: "[ ^_^ ]", // Inside a box
  box2: "[ >_< ]", // Inside a box, but struggling
  box3: "[ o_o ]", // Inside a box, surprised
  surprised: "(O_O)", // Shocked look
  eating: "(^～^)", // Eating happily
  waiting: "(¬_¬)", // Impatient, waiting expression
};

const prefixes: Record<string, string> = {
  "!": "play",
  "#": "drugs",
  "*": "affection",
  "?": "talk",
  "~": "glitch",
  $: "glitch",
  "/": "cheat",
};

type PrefixKey = keyof typeof prefixes;

function isPrefixKey(key: string): key is PrefixKey {
  return key in prefixes;
}

export default function GamePage() {
  const [stats, setStats] = useState({
    hunger: 120,
    happiness: 120,
    energy: 120,
    health: 120,
  });
  const [shake, setShake] = useState<boolean>(false);
  const [petMood, setPetMood] = useState<keyof typeof petFaces>("idle");
  const [chatMessage, setChatMessage] = useState<string>("");
  const [scannedCodes, setScannedCodes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [enteredText, setEnteredText] = useState("");
  const [serialConnected, setSerialConnected] = useState(false);
  const [cheatMenuOpen, setCheatMenuOpen] = useState(false);

  // Debugging inputs
  const [hungerDecayRate, setHungerDecayRate] = useState(1 / 36); // ~1 per 36 min
  const [happinessDecayRate, setHappinessDecayRate] = useState(1 / 8); // ~1 per 8 min
  const [energyRegenRate, setEnergyRegenRate] = useState(1 / 12); // ~1 per 12 min
  const [timeMultiplier, setTimeMultiplier] = useState(1);

  /*
   * Calculations for the stats + decay + mood
   */

  // Automatic Stat Decay and Regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        hunger: Math.max(0, prev.hunger - hungerDecayRate * timeMultiplier),
        happiness: Math.max(
          0,
          prev.happiness - happinessDecayRate * timeMultiplier,
        ),
        energy: Math.min(120, prev.energy + energyRegenRate * timeMultiplier),
        health: prev.health,
      }));
    }, 60000); // Runs every 1 minute

    return () => clearInterval(interval);
  }, [hungerDecayRate, happinessDecayRate, energyRegenRate, timeMultiplier]);

  useEffect(() => {
    // Determine pet mood based on stats
    if (stats.hunger < 30) setPetMood("bored");
    else if (stats.energy < 30) setPetMood("sleepy");
    else if (stats.happiness < 30) setPetMood("crying");
    else setPetMood("idle");
  }, [stats]);

  const updateStat = (stat: keyof typeof stats, amount: number) => {
    setStats((prev) => ({
      ...prev,
      [stat]: Math.max(0, Math.min(120, prev[stat] + amount)), // Clamp between 0 and 120
    }));
  };

  const kick = () => {
    updateStat("happiness", -10);
    new Audio("/sfx/hurt.ogg").play();
    setShake(true);
    setTimeout(() => setShake(false), 1000);
  };

  /*
   * Action Functions
   */
  const processAction = (receivedData: string) => {
    let prefix = receivedData.charAt(0);
    const barcode = receivedData.slice(1);
    const barcodeLength = receivedData.length;
    if (isPrefixKey(prefix)) {
      switch (prefix) {
        case "!":
          setChatMessage(
            `Thank you for the ${prefixes[prefix]}! (${receivedData})`,
          );
          playWithPet(barcodeLength);
          break;
        case "#":
          setChatMessage(
            `Thank you for the ${prefixes[prefix]}! (${receivedData})`,
          );
          giveDrugs(barcodeLength);
          break;
        case "*":
          setChatMessage(
            `Thank you for the ${prefixes[prefix]}! (${receivedData})`,
          );
          giveAffection(barcodeLength);
          break;
        case "?":
          talkToPet();
          break;
        case "~":
          triggerGlitch();
          break;
        case "$":
          triggerGlitch();
          break;
        case "/":
          triggerCheat(barcode);
          break;
        default:
          setChatMessage(
            `Thank you for the ${prefixes[prefix]}! (${receivedData})`,
          );
          giveFood(barcodeLength);
          break;
      }
    } else {
      setChatMessage(`Yummy! (${receivedData})`);
      giveFood(barcodeLength);
    }
    prefix = "";
    setScannedCodes((prev) => [receivedData, ...prev.slice(0, 4)]);

    // // Play scan sound effect
    // new Audio("/scan-sound.mp3").play();
  };

  const giveFood = (barcodeLength: number) => {
    const foodBonus = Math.min(barcodeLength, 5); // Longer food = more full
    updateStat("hunger", foodBonus);
  };

  const playWithPet = (barcodeLength: number) => {
    const energyCost = -Math.min(barcodeLength, 5); // Longer play drains more energy
    const happinessGain = Math.max(2, barcodeLength / 2); // More engagement, more fun
    updateStat("energy", energyCost);
    updateStat("happiness", happinessGain);
  };

  const giveDrugs = (barcodeLength: number) => {
    const healthBoost = Math.min(barcodeLength, 10); // More medicine = stronger healing
    const energyBoost = barcodeLength > 10 ? 5 : 0; // If barcode is long, act like caffeine
    updateStat("energy", energyBoost);
    updateStat("health", healthBoost);
  };

  const giveAffection = (barcodeLength: number) => {
    const happinessBoost = Math.max(1, barcodeLength / 5); // Gentle happiness increase
    updateStat("happiness", happinessBoost);
  };

  const talkToPet = () => {
    // This function adds a small amount of happiness and can trigger dialogue events
    setChatMessage(`Sup?`);
    updateStat("happiness", 2);
  };

  const triggerGlitch = () => {
    // Randomized glitch responses; could hint at CTF clues
    setChatMessage(`H̵̗͙͊͠ẽ̵͍̐l̴̳͋͆ṕ̶̞̕ͅ ̶̡̻̈́̑M̷̹̓̀ê̵̙̲̂`);
  };

  const triggerCheat = (barcode: string) => {
    setChatMessage(`Invalid Cheat Code: ${barcode}`);
  };

  /*
   * HID Input (or input from keyboard for testing)
   */
  const handleScan = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const receivedData = enteredText;
      if (!receivedData) return;

      processAction(receivedData);
    }
  };

  /*
   * Serial connection
   */
  const connectSerial = async () => {
    try {
      if ("serial" in navigator) {
        const port = await navigator.serial.requestPort(); // Must be triggered by user gesture
        await port.open({ baudRate: 9600 });
        setSerialConnected(true);

        const reader = port.readable?.getReader();
        let buf = "";

        if (reader) {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break; // Exit loop when the reader is closed

            if (value) {
              buf += new TextDecoder().decode(value);

              if (buf.includes("\n") ?? buf.includes("\r")) {
                const receivedData = new TextDecoder().decode(value).trim();
                buf = "";

                if (receivedData) {
                  processAction(receivedData);
                }
              }
            }
          }
        }
      } else {
        window.alert("ERROR: Web Serial API not supported");
      }
    } catch (error) {
      window.alert(`Error accessing serial port`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 relative">
      {/* Cheat Menu Toggle Button */}
      <button
        className="absolute top-4 left-4 px-3 py-2 bg-gray-800 text-white rounded"
        onClick={() => setCheatMenuOpen(true)}
      >
        ⚙️ Cheats
      </button>

      {/* Cheat Menu Sidebar */}
      {cheatMenuOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 shadow-lg relative"
          >
            <button
              className="absolute top-4 right-4 text-xl text-red-500"
              onClick={() => setCheatMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-500 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={4}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Cheat Menu</h2>

            {/* Testing Buttons */}
            <div className="flex space-x-2 mb-4">
              <button
                className="w-full py-2 bg-blue-500 text-white rounded"
                onClick={() => updateStat("hunger", 10)}
              >
                Feed
              </button>
              <button
                className="w-full py-2 bg-red-500 text-white rounded"
                onClick={() => updateStat("hunger", -10)}
              >
                UnFeed
              </button>
            </div>
            <div className="flex space-x-2 mb-4">
              <button
                className="w-full py-2 bg-yellow-500 text-white rounded"
                onClick={() => updateStat("happiness", 10)}
              >
                Play
              </button>
              <button
                className="w-full py-2 bg-red-500 text-white rounded"
                onClick={kick}
              >
                Kick
              </button>
            </div>
            <div className="flex space-x-2 mb-4">
              <button
                className="w-full py-2 bg-purple-500 text-white rounded"
                onClick={() => updateStat("energy", 10)}
              >
                Rest
              </button>
              <button
                className="w-full py-2 bg-red-500 text-white rounded"
                onClick={() => {
                  updateStat("energy", -10);
                  updateStat("hunger", -10);
                  updateStat("happiness", 10);
                }}
              >
                Run
              </button>
            </div>

            {/* Hunger Decay Rates */}
            <label>Hunger Decay Rate:</label>
            <input
              type="number"
              value={hungerDecayRate}
              onChange={(e) => setHungerDecayRate(parseFloat(e.target.value))}
              className="w-full p-1 text-black mb-2 rounded"
            />
            <label>Happiness Decay Rate:</label>
            <input
              type="number"
              value={happinessDecayRate}
              onChange={(e) =>
                setHappinessDecayRate(parseFloat(e.target.value))
              }
              className="w-full p-1 text-black mb-2 rounded"
            />
            <label>Energy Regen Rate:</label>
            <input
              type="number"
              value={energyRegenRate}
              onChange={(e) => setEnergyRegenRate(parseFloat(e.target.value))}
              className="w-full p-1 text-black mb-2 rounded"
            />
            <label>Time Speed Multiplier:</label>
            <input
              type="number"
              value={timeMultiplier}
              onChange={(e) => setTimeMultiplier(parseFloat(e.target.value))}
              className="w-full p-1 text-black mb-2 rounded"
            />

            <label>Barcode Input:</label>
            {/* Barcode Input */}
            <input
              ref={inputRef}
              type="text"
              onKeyDown={handleScan}
              className="w-full p-1 text-black mb-2 rounded"
              value={enteredText}
              onChange={(e) => setEnteredText(e.target.value)}
            />

            {/* Debug Log */}
            <div className="w-full text-sm bg-black text-white p-2 m-2 rounded">
              <p className="font-bold">Scanned Codes:</p>
              {scannedCodes.map((code, index) => (
                <p key={index}>{code}</p>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* ASCII Pet */}
      <PetSprite animation={petMood} />

      {/* Chat Bubble */}
      {chatMessage && (
        <motion.div
          className="bg-blue-500 p-4 rounded-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {chatMessage}
        </motion.div>
      )}

      {/* Serial Connection Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        onClick={connectSerial}
      >
        {serialConnected ? "Serial Connected" : "Connect Barcode Scanner"}
      </button>
    </div>
  );
}
