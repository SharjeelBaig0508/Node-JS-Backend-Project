/* Node Imports */
var dotenv = require("dotenv");
dotenv.config();
var path = require("path");

/* Framework Imports */
var admin = require("firebase-admin");

/* Local Imports */

var firebase_creds = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url
}

admin.initializeApp({
  credential: admin.credential.cert(firebase_creds),
  storageBucket: `${firebase_creds.project_id}.appspot.com`
});

const bucket = admin.storage().bucket();

uploadImage = async (images) => {
  var images_urls = []
  var promises = []

  await images.map(async (image) => {
    const filename = `${Date.now()}_${Math.random() * 10000}${path.extname(image.originalname)}`;
    var imageRef = bucket.file('images/'+filename, {
      public: true,
      metadata: {
        contentType: image.mimetype
      }
    });
    promises.push(
      imageRef.save(image.buffer, (err) => {
        if (err) {
          console.error(`Error Uploading: ${filename} with error: ${error}`);
          return;
        }
        imageRef.makePublic();
        images_urls.push(imageRef.publicUrl());
      })
    );
  });
  await Promise.all(promises);
  return images_urls;
}

module.exports = {
  uploadImage
}