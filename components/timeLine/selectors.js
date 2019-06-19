import { STRINGS } from './constants';

const { NAME } = STRINGS;

export const getError = state => state[NAME].error;
export const getIsAuthenticated = state => state[NAME].isAuthenticated;
export const getIsOnlineFriendsFetching = state => state[NAME].isOnlineFriendsFetching;
export const getIsTimelineFetching = state => state[NAME].isTimelineFetching;
export const getIsUserProfileFetching = state => state[NAME].isUserProfileFetching;
export const getIsUserProfilePresent = state => state[NAME].isUserProfilePresent;
export const getOnlineFriendsData = state => state[NAME].onlineFriendsData;
export const getTimelineData = state => state[NAME].timelineData;
export const getUsersProfile = state => state[NAME].usersProfile;
