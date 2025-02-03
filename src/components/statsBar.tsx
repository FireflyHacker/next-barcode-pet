import { PetStats } from "~/index";

const StatsBar = (props: { stats: PetStats }) => {
  const { stats } = props;

  return (
    <div className="grid grid-cols-4 gap-4 w-2/3 mb-6">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex flex-col items-center w-full mb-2">
          <p className="font-Pixelify text-3xl font-bold capitalize">{key}</p>
          <div className="w-full h-4 bg-gray-300 rounded overflow-hidden">
            <div
              className="h-full bg-green-500 transition-width duration-500 rounded"
              style={{ width: `${(value / 120) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsBar;
