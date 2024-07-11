# React Native Keycloak Login Demo

This demo showcases how to implement a Keycloak login in a React Native application without redirection, keeping the login process within the app. Utilizing the password grant type, this approach allows for a seamless authentication experience, leveraging Keycloak for secure access management.

## Benefits of Using Keycloak Login Without Redirection

- **Seamless User Experience**: Keeps the authentication process within the app, avoiding the disruption of redirecting to a browser.
- **Enhanced Security**: Leverages Keycloak's robust security features for managing access.
- **Simplified Backend Integration**: Directly communicates with Keycloak server for tokens, simplifying backend requirements.

## Table of Contents

1. [Creating a Realm in Keycloak](#creating-a-realm-in-keycloak)
2. [Configuring a Client and User in Keycloak](#configuring-a-client-and-user-in-keycloak)
3. [Creating the App with Expo](#creating-the-app-with-expo)
4. [Keycloak Configuration](#keycloak-configuration)
5. [AuthContext Implementation](#authcontext-implementation)
6. [Login Screen Implementation](#login-screen-implementation)
7. [Home Screen and App.ts Overview](#home-screen-and-appts-overview)
8. [Using Your Own Keycloak Server Data](#using-your-own-keycloak-server-data)
9. [Further Enhancements](#further-enhancements)
10. [Disclaimer](#disclaimer)

### Creating a Realm in Keycloak

- Navigate to the Keycloak admin console.
- Select "Add Realm".
- Provide a name for your realm and save.

### Configuring a Client and User in Keycloak

- **Client Configuration**:
  - In your realm, go to "Clients" and create a new client.
  - Set "Client ID", "Client Protocol", and "Access Type".
  - Configure "Valid Redirect URIs" and "Web Origins" as needed.
- **User Configuration**:
  - In your realm, go to "Users" and add a new user.
  - Set "Username", "Email", and "Password".
  - Configure roles and groups as required.

### Creating the App with Expo

```bash
npx create-expo-app YourAppName --template
```

### Keycloak Configuration

```typescript
// keycloakConfig.ts
export default {
  issuer: "http://<your-local-ip>:8080/realms/<realmName>",
  clientId: "<client-id>",
  clientSecret: "<client-secret>",
  redirectUrl: "https://<your-app-url>:<port>",
  scopes: ["openid", "profile"],
};
```

### AuthContext Implementation

- Define `AuthContext` for managing authentication state.
- Use AsyncStorage to persist authentication tokens.

### Login Screen Implementation

- Implement login functionality using Axios to communicate with Keycloak.
- Store access token in AsyncStorage.
- Navigate to Home screen upon successful login.

### Home Screen and App.ts Overview

- **HomeScreen**: Displays a welcome message and the user's token.
- **App.ts**: Configures navigation and wraps the app in `AuthProvider`.

### Using Your Own Keycloak Server Data

- Replace placeholders in `keycloakConfig.ts` with your Keycloak server details.
- Note: Use your real local IP instead of 'localhost' to avoid connectivity issues.

### Further Enhancements

- Utilize the access token for authenticated operations.
- Implement refresh token logic to obtain new access tokens.

### Disclaimer

This method exposes sensitive data (e.g., client secret) within the codebase, posing a security risk. As a best practice, consider implementing a backend server to handle Keycloak interactions, keeping sensitive data off the client-side.

---

If you find it beneficial, give it a star :)
