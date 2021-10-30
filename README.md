# Jikan ⏲

**Deployed Link:** [https://jikan-timer.com](https://jikan-timer.com)

**Jikan** is a clock and timer web application inspired by the Pomodoro Technique.
The timer is fully customizable, allowing users to control how they want to manage their time.
Since work environment is a huge factor in productivity, users can also customize a variety of
settings to set the mood and to match user preference.

**_So what is the pomodoro technique?_** |
Pomodoro Technique is a productivity method in which a certain time can be set to be productive (default 25 minutes),
and after that time is up, you can take a break that is also set to be a certain time (default 5 minutes). By repeating this process
over and over in intervals, you are able to work more efficiently and productively, because working consistently for hours without
breaks will show a steady decline in productivity. Additionally, with a bit of self-discipline, you can force yourself to not use
your phone or other distractions during your short Pomodoro time, as you know you will have a break coming up.

The pomodoro technique is not a perfect surefire way to be productive. You will need to have discipline and willpower
to want to be productive. Try it today by visiting the link below!

⏰ ****[https://jikan-timer.com](https://jikan-timer.com/)**** ⏰

For more detailed information on the pomodoro technique, visit the following link: [Article](https://www.forbes.com/sites/bryancollinseurope/2020/03/03/the-pomodoro-technique/)

**_But there are already so many other pomodoro timer websites! Why Jikan?_** |
Jikan is different because it not only acts as a fully functional pomodoro timer, but also comes with a fully customizable user experience.
With additional features like setting background images, playing music, displaying the weather, changing the font, and more, Jikan
allows for a variety of customizable features that can be catered to the user's preference. The initial idea behind Jikan was
have it open on an external monitor or another device, but it can also be run in a background tab or window.

## Preview

#### Clock

![image](https://i.imgur.com/ir5izFp.png)

#### Pomodoro Timer w/ Settings Open

![image](https://i.imgur.com/70sHa2o.png)

#### Mobile Friendly!

![image](https://i.imgur.com/jD2jUeX.png)

## Features

#### Clock

- Main clock
  - Settings
    - Show seconds
    - 12hr / 24hr format
    - Change font
    - Select music (YouTube live streams)
    - Adjust music volume
    - Set weather (zipcode)
    - Brightness of webpage
    - Background blur
    - Change background image (Pexels API image or solid color)
- Pomodoro Timer
  - Settings
    - Set custom times for pomodoro, short break, long break
    - Turn on auto-start breaks
    - Change font
    - Select music (YouTube live streams)
    - Adjust music volume
    - Set weather (zipcode)
    - Brightness of webpage
    - Background blur
    - Change background image (Pexels API image or solid color)

## Tech Stack

**Client:** React, TypeScript, Next.js, Sass, Styled-Components, React-bootstrap, Axios

**Server:** Next.js, Pexels API, WeatherAPI

## Installation

Warning: This app is still currently in development!

Install Jikan with npm

```bash
 git clone https://github.com/KSJ-Group/Jikan.git
 cd jikan
 npm install
 npm run dev
```

## Authors

- Seiji Matsumoto - [@SeijiMatsumoto](https://www.github.com/SeijiMatsumoto)
- Katie Law - [@katscap](https://www.github.com/katscap)
- June Lee - [@juneisenuj](https://www.github.com/juneisenuj)

## Footnotes

This application is now only maintained and updated by Seiji Matsumoto.
For any bug reports or feature requests, please contact Seiji at [seijim27@gmail.com](mailto:seijim27@gmail.com).

### Future Plans

- Fix bugs
- Add authentication that allows users to retrieve settings data from database
- Create React Native application
- Change music UI
- Revamp settings panel
