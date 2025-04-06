import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();

(async () => {
  try {
    console.log("Sending test email...");
    await utils.sendMessage("Test Subject", "This is a test email.");
    console.log("Email sent successfully.");
  } catch (err) {
    console.error("Error sending test email:", err);
  }
})();
