const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to serve static files (HTML, CSS, etc.)
app.use(express.static('public'));  // Put your HTML/CSS in the 'public' folder

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Contact route to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Setup email transport configuration (using Gmail as an example)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',  // replace with your email
            pass: 'your-email-password',   // replace with your email password or app-specific password
        },
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',  // where you want to receive messages
        subject: `New Contact Form Submission from ${name}`,
        text: `You received a message from: \n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

