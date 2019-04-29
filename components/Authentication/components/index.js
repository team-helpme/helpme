import { authorize, logout, parseHash,getBaseUrl } from './auth0';
import {
 setToken, unsetToken, getUserFromServerCookie, getUserFromLocalCookie
} from './auth';

export { authorize, logout, parseHash, setToken, unsetToken, getUserFromServerCookie, getUserFromLocalCookie,getBaseUrl };
