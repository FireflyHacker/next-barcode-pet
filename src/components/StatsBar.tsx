import { PetStats } from "~/index";
import { StatValueBar } from "./StatsValueBar";
const StatsBar = (props: { stats: PetStats }) => {
  const { stats } = props;
  return (
    <div className="grid grid-cols-4 gap-4 w-2/3 mb-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center w-full mb-2">
          <p className="font-Pixelify text-4xl capitalize">{key}</p>
          <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
            <StatValueBar value={value} />
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsBar;
