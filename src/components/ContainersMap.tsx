import { useContainersStore } from "@/store/containers.store";

export const ContainersMap = ({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) => {
  const containers = useContainersStore((state) => state.containers);

  const grid = Array.from({ length: 10 }, (_, y) =>
    Array.from({ length: 10 }, (_, x) => {
      const item = containers.find(
        (c) => c.position?.x === x && c.position?.y === y
      );
      return item;
    })
  );

  return (
    <div className="grid grid-cols-10 gap-1 p-2">
      {grid.flat().map((cell, i) => (
        <button
          type="button"
          key={i}
          onClick={() => cell && onSelect(cell.id)}
          className={`w-full h-8 rounded flex items-center justify-center text-xs font-medium
            ${
              cell
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                : "bg-gray-200 cursor-default"
            }
            transition-colors duration-150
          `}
        >
          {cell?.id}
        </button>
      ))}
    </div>
  );
};
