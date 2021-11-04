import axios from "axios";

// .netlify/functions/...

// SELECT key, text_value FROM "ServerlessKeyspace".users;
// DROP TABLE "ServerlessKeyspace".users;

// async function verifyUser(email, name) {
//   // console.log("------------------------");
//   // console.log("Verify User:", email);
//   return await axios
//     .get(".netlify/functions/verifyUser", { params: { email: email } })
//     .then((response) => {
//       // console.log("User exists!");
//       console.log(response);
//       return true;
//     })
//     .catch((err) => {
//       console.log("User does not exist!");
//       return false;
//     });
// }

// async function updateUserData(
//   email,
//   firstName,
//   selectedFont,
//   brightness,
//   blur,
//   pomodoroTime,
//   shortBreakTime,
//   longBreakTime,
//   autoStartBreak,
//   showSeconds,
//   is24Hour,
//   selectedAlert,
//   musicVolume,
//   alertVolume,
//   zip,
//   background
// ) {
//   // console.log("Updating User Data:", email);
//   return await axios
//     .get(".netlify/functions/updateUserData", {
//       params: {
//         email: email,
//         name: firstName,
//         selectedFont: selectedFont,
//         brightness: brightness,
//         blur: blur,
//         pomodoroTime: pomodoroTime,
//         shortBreakTime: shortBreakTime,
//         longBreakTime: longBreakTime,
//         autoStartBreak: autoStartBreak,
//         showSeconds: showSeconds,
//         is24Hour: is24Hour,
//         selectedAlert: selectedAlert,
//         musicVolume: musicVolume,
//         alertVolume: alertVolume,
//         zip: zip,
//         background: background,
//       },
//     })
//     .then((response) => {
//       // console.log("Successfully updated user data");
//       return true;
//     })
//     .catch((err) => {
//       console.log("Unable to retrieve user data!", err);
//     });
// }

async function getUserData(email) {
  // console.log("Get User Data:", email);
  return await axios
    .get(".netlify/functions/getUserData", { params: { email: email } })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("Unable to retrieve user data!", err);
    });
}

async function addNewUser(
  email,
  firstName,
  selectedFont,
  brightness,
  blur,
  pomodoroTime,
  shortBreakTime,
  longBreakTime,
  autoStartBreak,
  showSeconds,
  is24Hour,
  selectedAlert,
  musicVolume,
  alertVolume,
  zip,
  background
) {
  // console.log("Add New User");
  return await axios
    .get(".netlify/functions/addNewUser", {
      params: {
        email: email,
        name: firstName,
        selectedFont: selectedFont,
        brightness: brightness,
        blur: blur,
        pomodoroTime: pomodoroTime,
        shortBreakTime: shortBreakTime,
        longBreakTime: longBreakTime,
        autoStartBreak: autoStartBreak,
        showSeconds: showSeconds,
        is24Hour: is24Hour,
        selectedAlert: selectedAlert,
        musicVolume: musicVolume,
        alertVolume: alertVolume,
        zip: zip,
        background: background,
      },
    })
    .then((response) => {
      // console.log("Add new user:", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function postUserSettings(
  email,
  firstName,
  selectedFont,
  brightness,
  blur,
  pomodoroTime,
  shortBreakTime,
  longBreakTime,
  autoStartBreak,
  showSeconds,
  is24Hour,
  selectedAlert,
  musicVolume,
  alertVolume,
  zip,
  background
) {
  console.log("Post User Settings");
  return axios
    .get(".netlify/functions/updateUserData", {
      params: {
        email: email,
        name: firstName,
        selectedFont: selectedFont,
        brightness: brightness,
        blur: blur,
        pomodoroTime: pomodoroTime,
        shortBreakTime: shortBreakTime,
        longBreakTime: longBreakTime,
        autoStartBreak: autoStartBreak,
        showSeconds: showSeconds,
        is24Hour: is24Hour,
        selectedAlert: selectedAlert,
        musicVolume: musicVolume,
        alertVolume: alertVolume,
        zip: zip,
        background: background,
      },
    })
    .then((response) => {
      // console.log("Successfully updated in database", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function deleteUser(email) {
  axios
    .get(".netlify/functions/deleteUser", { params: { email: email } })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getUserData,
  addNewUser,
  postUserSettings,
  deleteUser,
};
