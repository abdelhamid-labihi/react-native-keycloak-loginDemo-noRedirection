// keycloakConfig.ts
export default {
    issuer: 'http://192.168.1.11:8080/realms/JtPay',
    clientId: 'rn-expo-app',
    redirectUrl: 'https://192.168.1.11:8081',
    scopes: ['openid', 'profile'],
  };