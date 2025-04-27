
# VertePower - Smart Water Irrigation System

**VertePower** is a smart water irrigation system that helps monitor and manage soil moisture levels. It integrates with Blynk for real-time monitoring and control, and sends SMS alerts when the soil moisture falls below or rises above predefined thresholds. The system uses an ESP8266 microcontroller and a soil moisture sensor to detect the moisture levels, and it controls a water pump for irrigation. The backend is built using Node.js and Express, with Twilio for SMS notifications.

## Features

- Real-time soil moisture monitoring.
- Control the water pump remotely via a dashboard.
- Automated SMS alerts when moisture levels are critical (below 10%) or above the threshold (above 60%).
- Dashboard to view soil moisture levels and control the pump.
- Service worker support for background notifications.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (for the dashboard and interaction).
- **Backend**: Node.js, Express.
- **Database**: No database is required for this application.
- **SMS Service**: Twilio for SMS alerts.
- **IOT**: ESP8266, Blynk (for remote control and monitoring), and a soil moisture sensor.

## File Structure

```
VertePower/
│
├── frontend/
│   ├── index.html         # Main HTML file (Dashboard)
│   ├── style.css          # Styles for the dashboard
│   └── script.js          # JavaScript for frontend interactions
│
├── backend/
│   ├── server.js          # Node.js backend with Express
│   ├── .env               # Environment variables (e.g., Twilio keys, IP)
│   └── package.json       # NPM dependencies
│
└── .gitignore             # Ignore .env file to prevent secrets from being pushed
```

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- Twilio account for SMS functionality
- Blynk account for IoT integration
- ESP8266 microcontroller and soil moisture sensor

### 1. Clone the Repository

```bash
git clone https://github.com/Natthyx/VertePower.git
cd VertePower
```

### 2. Install Backend Dependencies

Navigate to the `backend` directory and install the required dependencies.

```bash
cd backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory and add the following values (replace with your actual credentials):

```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
USER_PHONE_NUMBER=your_phone_number
```

### 4. Upload Arduino Code to ESP8266

- Open the `VertePower.ino` (Arduino sketch) in the Arduino IDE.
- Make sure to install the **ESP8266 board** and select your correct board model.
- Upload the code to your ESP8266.

### 5. Start the Backend Server

Navigate to the `backend` folder and run the server:

```bash
node server.js
```

The server will run on `http://localhost:3000`.

### 6. Access the Frontend

Open the `frontend/index.html` file in a web browser. This will serve as your dashboard for monitoring the soil moisture and controlling the pump.

### 7. Test the System

- When the soil moisture goes below 10%, you should receive an SMS notification to turn on the water pump.
- When the moisture level exceeds 60%, you will receive another SMS to turn off the pump.

### 8. Enable Secret Scanning

To prevent secrets from being pushed to the repository, enable **Secret Scanning** in the GitHub repository settings under **Security & Analysis**.

## Troubleshooting

- **No SMS received?** Check if your Twilio credentials are correct in the `.env` file.
- **Pump not turning on/off?** Ensure the Blynk app is properly set up, and check the microcontroller wiring.

## Contributing

Feel free to fork this repository, submit issues, and create pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
