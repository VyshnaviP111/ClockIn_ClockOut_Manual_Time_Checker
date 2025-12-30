
import { DurationResult } from '../types';

/**
 * Converts HH:mm string to total minutes since midnight
 */
export const timeStringToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours * 60) + minutes;
};

/**
 * Calculates duration between two time strings. 
 * If end time is before start time, it assumes it's the next day.
 */
export const calculateDuration = (startTime: string, endTime: string): DurationResult => {
  const start = timeStringToMinutes(startTime);
  const end = timeStringToMinutes(endTime);
  
  let totalMinutes = end - start;
  
  // Handle cross-day scenario (e.g. 11:00 PM to 1:00 AM)
  if (totalMinutes < 0) {
    totalMinutes += 24 * 60;
  }
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return { hours, minutes, totalMinutes };
};

/**
 * Formats minutes into a readable string
 */
export const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};
