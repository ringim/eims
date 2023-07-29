const functions = require("firebase-functions");
const admin = require("firebase-admin");

// additional imports 


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.deleteUser = functions.https.onCall(async (data, context) => {
  const uid = data.uid;

  try {
    await admin.auth().deleteUser(uid);
    console.log(`User with uid ${uid} has been deleted.`);
    return {success: true};
  } catch (error) {
    console.error(`Error deleting user with uid ${uid}:`, error);
    return {success: false, error: error.message};
  }
});

exports.updateUser = functions.https.onCall(async (data, context) => {
  const {uid, userData} = data;
  console.log("--------payload to update user: ", data);
  try {
    await admin.auth().updateUser(uid, {
      email: userData?.email,
      password: userData?.password,
    });
  } catch (error) {
    console.log("updating user failed: ", error);
    throw new functions.https.HttpsError(
        "internal",
        "An error occured while updating the user data.",
    );
  }
});
