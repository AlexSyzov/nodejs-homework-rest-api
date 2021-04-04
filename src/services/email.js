const MailGen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const config = require("../config/email.json");

require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = MailGen;

  constructor(env) {
    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "stage":
        this.link = config.stage;
        break;
      case "production":
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }

  #createTemplate(verifyToken, name = "Guest") {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "salted",
      product: {
        name: "Email verification",
        link: this.link,
      },
    });

    const template = {
      body: {
        name,
        intro: "Let's do a little verification! :)",
        action: {
          instructions: "To finish the registration click the button",
          button: {
            color: "#22BC66",
            text: "Сonfirm your account",
            link: `${this.link}/api/auth/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have some questions? Just reply to this email, we'd love to help!",
      },
    };

    return mailGenerator.generate(template);
  }

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: "sashasyzov@gmail.com",
      subject: "Registration verification",
      html: emailBody,
    };

    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
