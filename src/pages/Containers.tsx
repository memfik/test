import { useState } from "react";
import { ContainersTable } from "../components/ContainersTable";
import { ContainersMap } from "../components/ContainersMap";
import { ContainerModal } from "../components/ContainerModal";
import { useRealtime } from "../hooks/useRealtime";

export const Containers = () => {
  useRealtime();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-4 flex flex-col gap-6">
      <div>
        <ContainersTable onSelect={setSelected} />
      </div>
      <div>
        <ContainersMap onSelect={setSelected} />
      </div>
      <ContainerModal id={selected} onClose={() => setSelected(null)} />
    </div>
  );
};
