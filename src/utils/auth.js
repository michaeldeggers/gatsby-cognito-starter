import Amplify, { Auth } from 'aws-amplify';

export const isBrowser = typeof window !== 'undefined';

let profile = null;

const configureAmplify = () => {
    if (isBrowser) {
        const env = window._env_;
        const location = window.location.protocol + '//' + window.location.host;
        if (env !== undefined) {
            Amplify.configure({
                Auth: {
                    mandatorySignIn: true,
                    region: env.REGION,
                    userPoolId: env.USER_POOL_ID,
                    userPoolWebClientId: env.APP_CLIENT_ID,
                    oauth: {
                        domain: env.OAUTH_DOMAIN,
                        scope: env.OAUTH_SCOPE.split(','),
                        redirectSignIn: location,
                        redirectSignOut: location,
                        responseType: env.OAUTH_RESPONSE_TYPE,
                    },
                },
            });
        }
    }
};

export const getCurrentAuthenticatedUser = () => {
    if (!isBrowser) {
        return;
    }
    return new Promise((resolve, reject) => {
        if (profile) {
            resolve(profile);
        }
        Auth.currentAuthenticatedUser()
            .then(user => {
                profile = user;
                resolve(user);
            })
            .catch(e => {
                console.log(e);
                reject(e);
            });
    });
};

export const isLoggedIn = () => {
    if (!isBrowser) {
        return false;
    }

    if (profile) {
        return true;
    }

    Auth.currentSession()
        .then(user => {
            profile = user;
            return true;
        })
        .catch(e => {
            if (e !== 'No current user') {
                console.log(e);
            }
            return false;
        });
};

export const signIn = () => {
    if (!isBrowser) {
        return;
    }
    return new Promise((resolve, reject) => {
        Auth.federatedSignIn()
            .then(user => resolve(user))
            .catch(e => reject(e));
    });
};

export const signOut = () => {
    return new Promise((resolve, reject) => {
        Auth.signOut()
            .then(() => {
                resolve(null);
            })
            .catch(e => {
                console.log(e);
                reject(e);
            });
    });
};

configureAmplify();
