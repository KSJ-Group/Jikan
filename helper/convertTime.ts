export const millisToMinutesAndSeconds = (millis: number): string => {
  let minutes: number = Math.floor(millis / 60000);
  let seconds: any = ((millis % 60000) / 1000).toFixed(0);
  let time: string = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  return time;
}

export const minutesAndSecondsToMillis = (time: string): number => {
  let timeArr = time.split(':');
  let minutes: number = 0;
  let seconds: number = 0;
  let milliseconds: number = 0;
  if (timeArr[0].length === 1) {
    minutes = parseInt(time.slice(0, 1)) * 60000;
    seconds = parseInt(time.slice(2)) * 1000;
  } else if (timeArr[0].length === 2) {
    minutes = parseInt(time.slice(0, 2)) * 60000;
    seconds = parseInt(time.slice(3)) * 1000;
  }

  milliseconds = minutes + seconds;
  return milliseconds;
}