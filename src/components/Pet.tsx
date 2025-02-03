import { useState } from "react";
import PetSprite from "./PetSprite";

const Pet = () => {
  const [animation, setAnimation] = useState<
    | "idle"
    | "idle2"
    | "sleep"
    | "dance"
    | "talk"
    | "excited"
    | "sleepy"
    | "bored"
    | "crying"
    | "box"
    | "box2"
    | "box3"
    | "surprised"
    | "eating"
    | "waiting"
  >("idle");

  return (
    <div className="flex flex-col items-center">
      <PetSprite animation={animation} />

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => setAnimation("idle")}>Idle</button>
        <button onClick={() => setAnimation("idle2")}>Idle 2</button>
        <button onClick={() => setAnimation("sleep")}>Sleep</button>
        <button onClick={() => setAnimation("dance")}>Dance</button>
        <button onClick={() => setAnimation("talk")}>Talk</button>
        <button onClick={() => setAnimation("excited")}>Excited</button>
        <button onClick={() => setAnimation("sleepy")}>Sleepy</button>
        <button onClick={() => setAnimation("bored")}>Bored</button>
        <button onClick={() => setAnimation("crying")}>Crying</button>
        <button onClick={() => setAnimation("box")}>Box</button>
        <button onClick={() => setAnimation("box2")}>Box 2</button>
        <button onClick={() => setAnimation("box3")}>Box 3</button>
        <button onClick={() => setAnimation("surprised")}>Surprised</button>
        <button onClick={() => setAnimation("eating")}>Eating</button>
        <button onClick={() => setAnimation("waiting")}>Waiting</button>
      </div>
    </div>
  );
};

export default Pet;
