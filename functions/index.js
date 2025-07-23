const functions = require("firebase-functions");
const { google } = require("googleapis");
const cors = require("cors")({ origin: true });
const stream = require("stream");
require("dotenv").config();

// Function to authenticate Google API
const authenticateGoogle = async () => {
  try {
    const key = require("./currentKey.json");
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const client = await auth.getClient();
    console.log("Authentication successful!");
    return client;
  } catch (error) {
    console.error("Error during authentication:", error.message);
    return null;
  }
};

// Cloud Function to upload CSV to Google Drive
exports.uploadCSVToDrive = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method Not Allowed :(",
      });
    }
    try {
      if (!req.body.csvData) {
        return res.status(400).send("No CSV data provided");
      }

      const auth = await authenticateGoogle();
      const driveService = google.drive({
        version: "v3",
        auth,
      });

      // Get the Base64-encoded CSV data from the request
      const base64Data = req.body.csvData;
      const csvBuffer = Buffer.from(
          decodeURIComponent(escape(atob(base64Data))),
          "utf-8",
      );
      // Prepare a readable stream for the file upload
      const passThroughStream = new stream.PassThrough();
      // passThroughStream.end(decodedData);
      passThroughStream.end(csvBuffer);


      // Define metadata and media for the upload
      const timestamp = Date.now();
      const folderID = "1WpEnsyTS6kqfEVjvAqJYdtbOu-8edx2N"; // Replace with your Folder ID
      const fileMetadata = {
        name: `${timestamp}_data.csv`,
        parents: [folderID], // Added trailing comma
      };

      const media = {
        mimeType: "text/csv",
        body: passThroughStream,
      };

      // Upload file to Google Drive
      const response = await driveService.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id",
      });

      res.status(200).json({
        message: `File uploaded successfully! File ID: ${
          response.data.id
        }`,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({
        message: `Error uploading file to Google Drive: ${
          error.message
        }`,
      });
    }
  });
});
