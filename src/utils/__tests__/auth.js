import Amplify, { Auth } from 'aws-amplify';
import { isLoggedIn } from '../auth';

describe('#isLoggedIn()', () => {
    it('should true when user is logged in', async () => {
        const user = {};
        const mySpy = jest.spyOn(Auth, 'currentSession').mockImplementation(() => Promise.resolve(user));
        expect(await isLoggedIn()).toReturn();
        expect(mySpy).toBeCalled();
        mySpy.mockRestore();
    });
});
