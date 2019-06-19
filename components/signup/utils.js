import { notification } from 'antd';
// notification function
export const openNotificationWithIcon = (type, text, duration = 4.5, children = null) => {
    notification[type]({
        children,
        description: text,
        duration,
        message: type,
    });
};
