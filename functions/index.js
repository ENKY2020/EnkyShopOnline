const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mugendievans10@gmail.com",
    pass: "RICH2024!",
  },
});

exports.onProductSubmitted = functions.firestore
  .document("products/{productId}")
  .onCreate(async (snap, context) => {
    const product = snap.data();
    const adminEmail = "mugendievans10@gmail.com";

    console.log("New product submitted:", product);

    try {
      await transporter.sendMail({
        from: "mugendievans10@gmail.com",
        to: adminEmail,
        subject: "New Product Submitted",
        text: `Product Name: ${product.name}\nPrice: ${product.price}\nDescription: ${product.description}`,
      });
      console.log("Notification sent.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

