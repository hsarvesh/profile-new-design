const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function generateJwks() {
  const { publicKey } = crypto.generateKeyPairSync('ed25519');
  const jwk = publicKey.export({ format: 'jwk' });
  
  // Compute kid based on public key x coordinate
  const hash = crypto.createHash('sha256').update(jwk.x).digest('base64url');
  jwk.kid = hash;
  
  const jwks = {
    keys: [jwk]
  };
  
  const dir = path.join(__dirname, '..', '.well-known');
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(dir, 'http-message-signatures-directory'), 
    JSON.stringify(jwks, null, 2), 
    'utf8'
  );
  console.log('Successfully generated JWKS at .well-known/http-message-signatures-directory');
}

generateJwks();
