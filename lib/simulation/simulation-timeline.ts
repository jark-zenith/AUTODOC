import type { SimulationEvent } from "./simulation-events";

export type SimulationTimeline = {
  currentTimeMinutes: number;
  durationMinutes: number;
  events: SimulationEvent[];
};

export function formatSimulationTime(minutes: number): string {
  const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
  const remainingMinutes = (minutes % 60).toString().padStart(2, "0");
  return `T+${hours}:${remainingMinutes}`;
}
