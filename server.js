const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const createToken = (participantName, roomKey, playerName) => {
  const at = new AccessToken('APIB7mkxVfcNXHo', 'hBPONEbtMxVqcvsNSLKIUDf0ONWiBhaC1E4JCd8Ai3F', {
    identity: participantName,
  });

  // You can add the playerName to the token as needed
  at.addGrant({ roomJoin: true, room: roomKey, name: playerName });

  return at.toJwt();
}

const app = express();
const port = 3000;

app.use(bodyParser.json()); // JSON parsing middleware

app.use(cors({
  origin: '*',
}));

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to My Server');
});

// Modify this route to accept POST requests
app.post('/getToken', (req, res) => {
  console.log('Received POST request to /getToken');

  const requestData = req.body;
  const { participantName, roomKey, playerName } = requestData; // Extract room, participantIdentity, and playerName

  // Generate a token with the extracted room, participantIdentity, and playerName
  const token = createToken(participantName, roomKey, playerName);

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
