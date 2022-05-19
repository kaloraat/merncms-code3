import cloudinary from "cloudinary";
import Website from "../models/website";

// sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const contact = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, message } = req.body;
    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "Email received from contact form",
      html: `
      <h3>Contact form message</h3>
      <p><u>Name</u></p>
      <p>${name}</p>
      <p><u>Email</u></p>
      <p>Email: ${email}</p>
      <p><u>Message</u></p>
      <p>${message}</p>
      `,
    };
    // send email
    try {
      const data = await sgMail.send(emailData);
      // console.log(data);
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
      res.json({ ok: false });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const createPage = async (req, res) => {
  try {
    // console.log("homepage", req.body);
    const { page } = req.body;
    const found = await Website.findOne({ page });
    if (found) {
      const updated = await Website.findOneAndUpdate({ page }, req.body, {
        new: true,
      });
      return res.json(updated);
    } else {
      const created = await new Website(req.body).save();
      return res.json(created);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const getPage = async (req, res) => {
  try {
    const { page } = req.params;
    const found = await Website.findOne({ page }).populate("fullWidthImage");
    return res.json(found);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
