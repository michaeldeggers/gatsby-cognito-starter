// in __mocks__/aws-amplify.js
export const Auth = {
    currentSession : jest.fn(()=> Promise.resolve(true)),
    signIn: jest.fn(()=> Promise.resolve()),
    signOut: jest.fn(()=> Promise.resolve())
}
