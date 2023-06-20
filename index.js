const express = require("express");
const fs = require("fs");
const privateKey = fs.readFileSync("private_key.pem", "utf-8");
const multer = require("multer");
const upload = multer().single("pdfFile");
const { createHash, createSign, createVerify } = require("crypto");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

//complete
app.post("/pdf", upload, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No PDF file uploaded");
    }
    const { buffer } = req.file;
    const hash = createHash("sha256").update(buffer).digest();

    const signer = createSign("RSA-SHA256");
    signer.update(hash);
    const signature = signer.sign(privateKey, "base64");

    const signedPdf = {
      originalname: req.file.originalname,
      signature,
    };
    res.json(signedPdf);
  } catch (error) {
    console.error("Error signing PDF:", error);
    res.status(500).send("Error signing PDF");
  }
});

//complete
app.post("/pdf/verify", upload, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No PDF file uploaded");
    }
    const { buffer } = req.file;
    const hash = createHash("sha256").update(buffer).digest();
    const verifier = createVerify("RSA-SHA256");
    verifier.update(hash);

    const publicKey = fs.readFileSync("certificate.pem", "utf-8"); // Replace with the path to your public key file
    const signature = req.body.signature; // Assuming the signature is passed in the request body

    const isVerified = verifier.verify(publicKey, signature, "base64");
    const verificationResult = {
      originalname: req.file.originalname,
      isVerified,
    };

    res.json(verificationResult);
  } catch (error) {
    console.error("Error verifying PDF signature:", error);
    res.status(500).send("Error verifying PDF signature");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
