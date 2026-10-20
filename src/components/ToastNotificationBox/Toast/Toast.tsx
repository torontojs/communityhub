import useToastNotificationModel, { type ToastNotificationProps } from './ToastModel.ts';
import ToastNotificationView from './ToastView.tsx';

const ToastNotification = (props: ToastNotificationProps) => {
  const data = useToastNotificationModel(props);

  if (!data.isToastActive) {
    return null;
  }

  return (
    <ToastNotificationView {...data} />
  );
};

export default ToastNotification;