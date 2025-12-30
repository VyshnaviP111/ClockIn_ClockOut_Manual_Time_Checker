
export interface TimeEntry {
  id: string;
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  label?: string;
}

export interface DurationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
}
