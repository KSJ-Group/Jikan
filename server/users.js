const users = [
  {
    id: '1',
    email: 'maurice@moss.com',
    password: 'abcdefg',
    settings: {
      brightness: 100,
      showSeconds: false,
      is24Hour: false,
      blur: false,
      font: 'Courier New',
      background: '/mountains.jpeg',
      timers: {
        pomodoroTime: 150000,
        shortBreakTime: 300000,
        longBreakTime: 900000
      },
      autoStartBreak: false,
      alertSound: 'alarm.wav'
    }
  }
];

module.exports = {
  getUsers: () => users,
  addUser: (user) => users.push(user),
};