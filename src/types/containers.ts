export type ContainerStatus =
  | "in_transit"
  | "arrived"
  | "placed"
  | "awaiting_dispatch";
export interface GridPosition {
  x: number;
  y: number;
}
export interface Container {
  id: string;
  zone: string;
  status: ContainerStatus;
  lastUpdate: string;
  position: GridPosition | null;
}
