import Amplify, { Auth } from "aws-amplify"

export const isBrowser = typeof window !== "undefined"

let profile = null

if (isBrowser) {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: window._env_.REGION,
      userPoolId: window._env_.USER_POOL_ID,
      userPoolWebClientId: window._env_.APP_CLIENT_ID,
      oauth: {
        domain: window._env_.OAUTH_DOMAIN,
        scope: window._env_.OAUTH_SCOPE.split(','),
        redirectSignIn: window.location.protocol + "//" + window.location.host,
        redirectSignOut: window.location.protocol + "//" + window.location.host,
        responseType: window._env_.OAUTH_RESPONSE_TYPE,
      },
    },
  })
}

export const getCurrentAuthenticatedUser = () => {
  if (!isBrowser) {
    return
  }
  return new Promise((resolve, reject) => {
    if (profile) {
      resolve(profile)
    }
    Auth.currentAuthenticatedUser().then(user => {
      profile = user
      resolve(user)
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}


export const isLoggedIn = () => {
  if (!isBrowser) {
    return;
  }

  if (profile) {
    return true;
  }

  Auth.currentSession()
    .then((user) => {
      profile = user;
      return true;
    })
    .catch((e) => {
      if (e !== "No current user") {
        console.log(e)
      }
      return false
    })
}

export const signIn = () => {
  if (!isBrowser) {
    return
  }
  return new Promise((resolve, reject) => {
    Auth.federatedSignIn()
      .then(user => resolve(user))
      .catch(e => reject(e))
  })
}

export const signOut = () => {
  return new Promise((resolve, reject) => {
    Auth.signOut().then(() => {
      resolve(null)
    }).catch(e => {
      console.log(e)
      reject(e)
    })
  })
}
