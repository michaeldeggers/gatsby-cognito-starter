import { Auth } from 'aws-amplify';

export const isBrowser = typeof window !== 'undefined';

let profile = null;

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
