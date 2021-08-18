import { Request, Response } from "express";
import { sanitize } from "sanitizer";
import { ContactModel } from "../database/contact/contact.model";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const HALF_FLAG: any = process.env.HALF_FLAG;
const SENDER_EMAIL: any = process.env.SENDER_EMAIL;
const CIPHERTEXT: any = process.env.CIPHERTEXT;

export const contact = {
  sendMail: (req: Request, res: Response) => {
    if (!req.body.email) {
      return res.status(400).send("Please enter an email address");
    } else {
      if (req.cookies["sendTo"] !== "rudefish") {
        return res.status(200).json({ msg: "Thanks for sharing your secret with us. Did you share with the right person?" });
      } else {
        const contact = new ContactModel({
          email: sanitize(req.body.email),
          name: sanitize(req.body.name),
          body: sanitize(req.body.body),
        });
        contact.save((err) => {
          if (err) {
            return res.status(500).send(err.message);
          } else {
            const mailToSend = {
              to: sanitize(req.body.email),
              from: SENDER_EMAIL,
              subject: "Thanks for contacting us!",
              html: `
                          <p>Unlike so many people that just wants the flag and no communication, you are different. Therefore, you deserve to get the rest of the flag</p>
                          <p>${HALF_FLAG}</p>
                          <p>One of my challenges is differentiating robots from humans. But since you are here, a human, I will let you in on a little secret.</p>
                          <pre>
                              User-Agent: *
                              Disallow: /${CIPHERTEXT}
                          </pre>
                          <p>Does that make sense? I hope so. See you at the other side.</p>
                          <br>
                          <p>rudefish</p>
                          <quote>The best place to hide is in plain sight.</quote>
                          `,
            };
            sgMail
              .send(mailToSend)
              .then((response: any) => {
                return res
                  .status(200)
                  .json({
                    msg: "Thank you for sharing your secret with us. We will reach you via the email you provided shortly.",
                  });
              })
              .catch((error: Error) => {
                return res.status(500).send(error.message);
              });
          }
        });
      }
    }
  },
};
