export { default } from 'next-auth/middleware';



//* : zero or more characters
//+ : one or more characters
//? : zero or one character
export const config = {
    matcher: ['/dashboard/:id*'],
};
