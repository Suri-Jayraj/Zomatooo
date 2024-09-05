
import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
    clientId: '5e6ea530-2d58-463a-9516-f219f6780b9f', // Application (client) ID
    authority: 'https://login.microsoftonline.com/db945842-b28d-43d0-83b9-0dcd8e433825', //  tenant ID
    redirectUri: 'http://localhost:4200/Landing'// Your redirect URI
    },
    cache: {
        cacheLocation: 'localStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to true if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) { 
                    return; 
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            },
            piiLoggingEnabled: false,
        }
    }
};
