export const generateCommentData = (id, post) => ({
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    firstName: 'Justice',
    id,
    lastName: 'Otuya',
    post,
});

export const generateData = (id, post) => ({
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    comment: 0,
    comments: [],
    email: 'jotuya2@gmail.com',
    favouriteCount: 0,
    favourited: false,
    firstName: 'Justice',
    id,
    isCommentOpen: false,
    lastName: 'Otuya',
    liked: false,
    likes: 0,
    post,
});

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const getFormattedDate = (date, prefomattedDate = false, hideYear = false) => {
    const day = date.getDate().toLocaleString();
    const month = MONTH_NAMES[date.getMonth().toLocaleString()];
    const year = date.getFullYear().toLocaleString();
    const hours = date.getHours().toLocaleString();
    let minutes = date.getMinutes().toLocaleString();

    if (minutes < 10) {
        // Adding leading zero to minutes
        minutes = `0${minutes}`;
    }

    if (prefomattedDate) {
        // Today at 10:20
        // Yesterday at 10:20
        return `${prefomattedDate} at ${hours}:${minutes}`;
    }

    if (hideYear) {
        // 10. January at 10:20
        return `${day}. ${month} at ${hours}:${minutes}`;
    }

    // 10. January 2017. at 10:20
    return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
};

// --- Main function
export const timeAgo = dateParam => {
    if (!dateParam) {
        return null;
    }

    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const isToday = today.toDateString() === date.toDateString();
    const isYesterday = yesterday.toDateString() === date.toDateString();
    const isThisYear = today.getFullYear() === date.getFullYear();

    if (seconds < 5) {
        return 'now';
    } if (seconds < 60) {
        return `${seconds} seconds ago`;
    } if (seconds < 90) {
        return 'about a minute ago';
    } if (minutes < 60) {
        return `${minutes} minutes ago`;
    } if (isToday) {
        return getFormattedDate(date, 'Today'); // Today at 10:20
    } if (isYesterday) {
        return getFormattedDate(date, 'Yesterday'); // Yesterday at 10:20
    } if (isThisYear) {
        return getFormattedDate(date, false, true); // 10. January at 10:20
    }

    return getFormattedDate(date); // 10. January 2017. at 10:20
};
