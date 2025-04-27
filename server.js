const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Twilio configuration (from .env)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const userPhoneNumber = process.env.USER_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

let latestMoisture = 0;
let isSMSSentLow = false;
let isSMSSentHigh = false;

app.post('/soil-moisture', (req, res) => {
  const moisture = req.body.moisture;
  latestMoisture = moisture; // Update latest moisture value

  if (moisture < 10 && !isSMSSentLow) {
    sendSMS('Critical alert! Soil moisture is under 10%. Turn on the pump!');
    isSMSSentLow = true;
    isSMSSentHigh = false;
  } else if (moisture > 23 && !isSMSSentHigh) {
    sendSMS('Soil moisture is above 60%. Turn off the pump.');
    isSMSSentHigh = true;
    isSMSSentLow = false;
  }

  res.sendStatus(200);
});

// Get current soil moisture
app.get('/soil-moisture', (req, res) => {
  res.json({ moisture: latestMoisture });
});

// Receive pump control command
app.post('/pump', (req, res) => {
  const { action } = req.body;

  if (action === 'on') {
    console.log('Pump ON command received.');
  } else if (action === 'off') {
    console.log('Pump OFF command received.');
  } else {
    return res.status(400).send('Invalid action.');
  }

  res.send('Pump action processed.');
});

// Function to send SMS using Twilio
function sendSMS(message) {
  client.messages.create({
    to: userPhoneNumber,
    from: twilioPhoneNumber,
    body: message
  })
  .then((message) => {
    console.log('Twilio response:', message.sid);
  })
  .catch((error) => console.error('Error sending SMS:', error.message));
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
