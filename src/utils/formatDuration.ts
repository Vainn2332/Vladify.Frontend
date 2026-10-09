// "00:03:20" (TimeSpan hh:mm:ss) -> "3:20"
export function formatDuration(duration: string): string {
  const [, minutes = "0", seconds = "0"] = duration.split(":");

  return `${parseInt(minutes)}:${seconds.slice(0, 2)}`;
}
