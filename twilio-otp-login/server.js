// server.js
const express = require('express');
const twilio = require('twilio');

const app = express();
const port = 3001;

app.use(express.json());

// Replace with your Twilio account SID and auth token
const client = new twilio('ACc8c97f30c6e28dee5d16e41c828a5f84', 'a5a4d91c63ebca16560f9cc8bae19969');

app.post('/send-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a random OTP

  // Store the OTP securely (e.g., in a database)

  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      from: '+16317496738',
      to: phoneNumber,
    })
    .then((message) => {
      console.log(message.sid);
      res.send({ success: true, message: 'OTP sent successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send({ success: false, message: 'Failed to send OTP' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
