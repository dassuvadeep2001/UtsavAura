// mailer.js
const nodemailer = require('nodemailer');

class Mailer {
    constructor(service, user, pass) {
        this.transporter = nodemailer.createTransport({
            service: service, 
            auth: {
                user: user, 
                pass: pass, 
            },
        });
    }

    async sendMail(mailObj) {
        const mailOptions = {
            from: this.transporter.options.auth.user, 
            to: mailObj.to, 
            subject: mailObj.subject, 
            text: mailObj.text, 
            html: mailObj.html, 
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports = Mailer;