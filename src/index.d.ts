export type PetStats = {
    hunger: number, 
    happiness: number, 
    energy: number, 
    health: number,
}

export type PetStat = keyof PetStats;

export type PetAnimations =
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
    | "waiting";