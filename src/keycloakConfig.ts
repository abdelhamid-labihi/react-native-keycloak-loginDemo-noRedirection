export default {
    issuer: 'http://<localhost>:8080/realms/<realmName>',
    clientId: '<client-id>',
    clientSecret: 'client-secret',
    redirectUrl: 'https://<your-app-url>:<port>',
    scopes: ['openid', 'profile'], //data to be integrated in the Access Token.
  };