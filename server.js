// server.js
const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser


const createToken = () => {
  // if this room doesn't exist, it'll be automatically created when the first
  // client joins
  const roomName = 'quickstart-room';
  // identifier to be used for participant.
  // it's available as LocalParticipant.identity with livekit-client SDK
  const participantName = 'quickstart-username';

  const at = new AccessToken('APIB7mkxVfcNXHo', 'hBPONEbtMxVqcvsNSLKIUDf0ONWiBhaC1E4JCd8Ai3F', {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
}

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
}));

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to My Server');
});

// Modify this route to accept POST requests
app.post('/getToken', (req, res) => {
  // Handle POST request data here
  // You can access the JSON data sent in the request body using req.body
  // For example, you can parse it and return a response
  const requestData = req.body;

  // Call your createToken function with requestData if needed
  // const token = createToken(requestData);

  // Send a response, for example:
  // res.json({ token });

  // Don't forget to handle errors and validation
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})