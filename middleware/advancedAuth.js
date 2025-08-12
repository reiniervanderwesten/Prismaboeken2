import { auth } from 'express-oauth2-jwt-bearer';

const authMiddleware = auth({
  audience: 'https://book-store-api', // e.g. https://book-store-api
  issuerBaseURL: `https://dev-lcp0ukypytubiwtk.eu.auth0.com/`,
});

export default authMiddleware;