import { NAME } from './constants';

export const getIsAuthenticated = state => state[NAME].isAuthenticated;
export const getUserProfile = state => state[NAME].userProfile;
