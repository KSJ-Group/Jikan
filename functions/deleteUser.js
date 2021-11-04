const { createClient } = require("@astrajs/collections");

exports.handler = async function (event, context) {
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    // applicationToken: process.env.ASTRA_DB_TOKEN,
    username: process.env.ASTRA_DB_USERNAME,
    password: process.env.ASTRA_DB_PASSWORD,
  });

  const usersCollection = astraClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("users");

  // create a new user (specifying documentId)
  try {
    const user = await usersCollection.delete(
      event.queryStringParameters.email
    );
    return {
      statusCode: 200,
      body: JSON.stringify(user.data),
    };
    console.log("Success");
  } catch (e) {
    console.log("Error", e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
