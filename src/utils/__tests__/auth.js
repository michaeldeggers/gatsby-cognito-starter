import { Auth } from 'aws-amplify';
import { isLoggedIn } from '../auth';

describe('#isLoggedIn()', () => {
    it('should true when user is logged in', async () => {
        const mySpy = jest.spyOn(Auth, 'currentSession').mockImplementation(() => Promise.resolve({user: 'user'}));
        const boolean = await isLoggedIn();
        expect(boolean).toBe(true);
        mySpy.mockRestore();
    });
});
