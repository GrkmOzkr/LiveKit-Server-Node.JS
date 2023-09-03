// server.js
import express from 'express';
import { AccessToken } from 'livekit-server-sdk';


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

// Define a default route
app.get('/', (req, res) => {
  res.send('Welcome to My Server');
});

app.get('/getToken', (req, res) => {
  res.send(createToken());
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})