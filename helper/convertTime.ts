export const millisToMinutesAndSeconds = (millis: number): string => {
  let minutes: number = Math.floor(millis / 60000);
  let seconds: any = ((millis % 60000) / 1000).toFixed(0);
  let time: string = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  return time;
}

export const minutesAndSecondsToMillis = (time: string): number => {
  let milliseconds: number = 0;
  if (time.length === 1) {
    milliseconds = parseInt(time.slice(0, 1)) * 60000;
    console.log(milliseconds);
  } else if (time.length === 2) {
    milliseconds = parseInt(time.slice(0, 2)) * 60000;
    console.log(milliseconds);
  }

 return milliseconds;
}