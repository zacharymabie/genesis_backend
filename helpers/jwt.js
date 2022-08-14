const jwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt
    .expressjwt({
      secret,
      algorithms: ["HS256"],
      isRevoked: isRevoked,
    })
    .unless({
      path: [
        { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
        { url: /\/api\/v1\/posts(.*)/, methods: ["GET", "OPTIONS"] },
        // {url: /\/api\/v1\/categories(.*)/, methods:['GET', 'OPTIONS']},
        `${api}/users/login`,
        `${api}/users/register`,
        `${api}/users/get/count`,
      ],
    });
}

async function isRevoked(req, payload, done) {
  if (!payload.payload.isAdmin) {
    return true;
  } else {
    return;
  }
}

module.exports = authJwt;
