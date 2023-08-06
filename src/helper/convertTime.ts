export function millisToMinutesAndSeconds(millis: number): string {
  let minutes: number = Math.floor(millis / 60000);
  let seconds: any = ((millis % 60000) / 1000).toFixed(0);
  let time: string = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return time;
}

export function minutesAndSecondsToMillis(time: string): number {
  let milliseconds: number = 0;
  let seconds: number = 0;
  if (time.includes(":")) {
    let split = time.split(":");
    milliseconds = parseInt(split[0]) * 60000;
    seconds = parseInt(split[1]) * 1000;
  } else {
    milliseconds = parseInt(time) * 60000;
  }
  return milliseconds + seconds;
}
