const { createClient } = require("@astrajs/collections");

exports.handler = async function (event, context) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  });

  const usersCollection = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("users");

  // create a new user (specifying documentId)
  try {
    const user = await usersCollection.update(
      event.queryStringParameters.email,
      {
        email: event.queryStringParameters.email,
        name: event.queryStringParameters.name,
        selectedFont: event.queryStringParameters.selectedFont,
        brightness: event.queryStringParameters.brightness,
        blur: event.queryStringParameters.blur,
        pomodoroTime: event.queryStringParameters.pomodoroTime,
        shortBreakTime: event.queryStringParameters.shortBreakTime,
        longBreakTime: event.queryStringParameters.longBreakTime,
        autoStartBreak: event.queryStringParameters.autoStartBreak,
        showSeconds: event.queryStringParameters.showSeconds,
        is24Hour: event.queryStringParameters.is24Hour,
        selectedAlert: event.queryStringParameters.selectedAlert,
        musicVolume: event.queryStringParameters.musicVolume,
        alertVolume: event.queryStringParameters.alertVolume,
        zip: event.queryStringParameters.zip,
        background: event.queryStringParameters.background,
      }
    );
    // console.log("Updated user data:", user);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (e) {
    console.log("Error", e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
