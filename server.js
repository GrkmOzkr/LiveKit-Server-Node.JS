const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const createToken = (roomName, participantName) => {
  const at = new AccessToken('APIB7mkxVfcNXHo', 'hBPONEbtMxVqcvsNSLKIUDf0ONWiBhaC1E4JCd8Ai3F', {
    identity: participantName,
  });
  at.addGrant({ roomJoin: true, room: roomName });
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
  const { participantIdentity, room, name } = requestData; // Extract room and participantIdentity

  // Generate a token with the extracted room and participantIdentity
  const token = createToken(participantIdentity, room, name);

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
