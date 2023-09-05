const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser

const createToken = () => {
  // if this room doesn't exist, it'll be automatically created when the first
  // client joins
  return new AccessToken('APIB7mkxVfcNXHo', 'hBPONEbtMxVqcvsNSLKIUDf0ONWiBhaC1E4JCd8Ai3F', {
    identity: 'quickstart-username',
  }).toJwt();
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

  // You can remove this line if requestData is not used
  // const requestData = req.body;

  res.json({ token: createToken() });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
