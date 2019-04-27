/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from './wrap-with-provider';
import Amplify from 'aws-amplify';
import { isBrowser } from './src/utils/auth';

const REGION = process.env.GATSBY_REGION || null;
const USER_POOL_ID = process.env.GATSBY_USER_POOL_ID || null;
const APP_CLIENT_ID = process.env.GATSBY_APP_CLIENT_ID || null;
const OAUTH_DOMAIN = process.env.GATSBY_OAUTH_DOMAIN || null;
const OAUTH_SCOPE = process.env.GATSBY_OAUTH_SCOPE || null;
const OAUTH_RESPONSE_TYPE = process.env.GATSBY_OAUTH_RESPONSE_TYPE || null;

const configureAmplify = () => {
  if (isBrowser && REGION !== null) {
    const location = window.location.protocol + '//' + window.location.host;
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: REGION,
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: APP_CLIENT_ID,
        oauth: {
          domain: OAUTH_DOMAIN,
          scope: OAUTH_SCOPE.split(','),
          redirectSignIn: location,
          redirectSignOut: location,
          responseType: OAUTH_RESPONSE_TYPE,
        },
      },
    });
  }
};
configureAmplify();

export const wrapRootElement = wrapWithProvider;
