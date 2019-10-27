import { notification } from 'antd';

const createNotification = (
  type: INotificationType,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
  });
};

type INotificationType = 'success' | 'error' | 'info' | 'warn' | 'warning';

export default createNotification;
