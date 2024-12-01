const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
const db = admin.firestore();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mugendievans10@gmail.com", // Your Gmail address
    pass: "RICH2024!", // Your Gmail password
  },
});

// Handle product submissions
exports.onProductSubmitted = functions.firestore
  .document("products/{productId}")
  .onCreate(async (snap) => {
    const product = snap.data();
    const adminEmail = "mugendievans10@gmail.com"; // Admin email

    try {
      await transporter.sendMail({
        from: "mugendievans10@gmail.com",
        to: adminEmail,
        subject: "New Product Submitted",
        text: `A new product has been submitted:
        Name: ${product.name}
        Price: ${product.price}
        Description: ${product.description}`,
      });
      console.log("Notification sent to admin.");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

// Manage product status changes
exports.onProductStatusChanged = functions.firestore
  .document("products/{productId}")
  .onUpdate(async (change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== after.status) {
      const sellerEmail = after.sellerEmail;

      try {
        await transporter.sendMail({
          from: "mugendievans10@gmail.com",
          to: sellerEmail,
          subject: "Product Status Update",
          text: `Your product "${after.name}" has been updated to "${after.status}".`,
        });
        console.log("Notification sent to seller.");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  });

