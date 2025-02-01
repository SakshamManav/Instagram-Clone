const express = require("express");
const router = express.Router();
const multer = require("multer");
require("dotenv").config();


const admin = require("firebase-admin");
const serviceAccount = require(process.env.SERVICEACCOUNTID); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET, 
});

const bucket = admin.storage().bucket(); 



// multer for file uploads


module.exports = {admin,bucket};