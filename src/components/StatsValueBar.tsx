import { col } from "framer-motion/client";

type StatValueBarProps = {
  value: number;
};

export const StatValueBar = ({ value }: StatValueBarProps) => {
  let color = "bg-green-500";
  if (value < 60) {
    color = "bg-orange-500";
  }
  if (value < 30) {
    color = "bg-red-500";
  }
  return (
    <div
      className={`h-full ${color} transition-width duration-500 rounded`}
      style={{ width: `${(value / 120) * 100}%` }}
    ></div>
  );
};
