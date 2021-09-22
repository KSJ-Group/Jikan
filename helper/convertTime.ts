export const millisToMinutesAndSeconds = (millis: number): string => {
  let minutes: number = Math.floor(millis / 60000);
  let seconds: any = ((millis % 60000) / 1000).toFixed(0);
  let time: string = `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
  return time;
}

export const minutesAndSecondsToMillis = (time: string): number => {
  let milliseconds: number = 0;
  let seconds: number = 0;
  if (time.includes(':')) {
    console.log(':');
    let split = time.split(':');
    milliseconds = parseInt(split[0]) * 60000;
    seconds = parseInt(split[1]) * 1000;
  } else {
    if (time.length === 1) {
      milliseconds = parseInt(time.slice(0, 1)) * 60000;
    } else if (time.length === 2) {
      milliseconds = parseInt(time.slice(0, 2)) * 60000;
    }
  }


 return milliseconds + seconds;
}