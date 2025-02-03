// import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "../styles/PetSprite.css"; // Import the CSS file

type AnimationType = "idle" | "idle2" | "sleep" | "dance" | "talk" | "excited" | "sleepy" | "bored" | "crying" | "box" | "box2" | "box3" | "surprised" | "eating" | "waiting";

const SPRITE_MAP = {
  idle:         { frames: 10, row: 0, duration: 1 },
  idle2:        { frames: 10, row: 1, duration: 1 },
  sleep:        { frames: 4, row: 2, duration: 3 },
  dance:        { frames: 4, row: 3, duration: 1 },
  talk:         { frames: 8, row: 4, duration: 1.5 },
  excited:      { frames: 12, row: 5, duration: 1 },
  sleepy:       { frames: 12, row: 6, duration: 6 },
  bored:        { frames: 9, row: 7, duration: 3 },
  crying:       { frames: 4, row: 8, duration: 1 },
  box:          { frames: 12, row: 9, duration: 1 },
  box2:         { frames: 4, row: 10, duration: 4 },
  box3:         { frames: 4, row: 11, duration: 1 },
  surprised:    { frames: 12, row: 12, duration: 1 },
  eating:       { frames: 15, row: 13, duration: 3 },
  waiting:      { frames: 6, row: 14, duration: 5 },
};

interface PetSpriteProps {
  animation: AnimationType;
}

const PetSprite: React.FC<PetSpriteProps> = ({ animation }) => {
  const [sprite, setSprite] = useState(SPRITE_MAP.idle);

  useEffect(() => {
    if (SPRITE_MAP[animation]) {
      setSprite(SPRITE_MAP[animation]);
    } else {
      console.warn(`Unknown animation '${animation}', falling back to idle.`);
      setSprite(SPRITE_MAP.idle);
    }
  }, [animation]);

  // Calculate total movement distance based on frames
  const totalMoveDistance = sprite.frames * 32;

  const FRAME_SIZE = 32;
  return (
<div
    style={{
      width: `${FRAME_SIZE * 4}px`, // ✅ Ensures the wrapper is big enough
      height: `${FRAME_SIZE * 4}px`,
      display: "flex", // Prevents layout shifting
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden", // ✅ Prevents clipping
    }}
  >
    <div
      className="pet-sprite"
      style={{
        backgroundPositionY: `-${sprite.row * FRAME_SIZE}px`,
        animation: `sprite-animate ${sprite.duration}s steps(${sprite.frames}) infinite`,
        "--totalMoveDistance": `-${totalMoveDistance}px`,
        transform: "scale(4)",
      } as React.CSSProperties}
    />
  </div>
  );
};

export default PetSprite;
