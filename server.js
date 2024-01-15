const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const twilio = require('twilio'); 
const dotenv = require('dotenv')

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Catch-all route that serves 'index.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle SMS requests
app.post('/send-sms', (req, res) => {
  const { to, body } = req.body;

  // Replace these values with your Twilio Account SID, Auth Token, and Twilio phone number
  const accountSid = process.env.Account_SID;
  const authToken = process.env.AuthToken;
  const twilioPhoneNumber = process.env.twilioPhoneNumber;

  // Create a Twilio client
  const client = twilio(accountSid, authToken);

  // Send an SMS
  client.messages.create({
    body: body,
    from: twilioPhoneNumber, 
    to: to
  })
  .then(message => {
    console.log('SMS sent successfully:', message.sid);
    res.status(200).json({ success: true, message: 'SMS sent successfully' });
  })
  .catch(error => {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, message: 'Error sending SMS' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
