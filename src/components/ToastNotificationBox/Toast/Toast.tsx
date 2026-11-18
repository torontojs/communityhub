import useToastNotificationModel, { type ToastNotificationProps } from './ToastModel.ts';
import ToastNotificationView from './ToastView.tsx';
import '../../NotificationBox/initialize-icon-definitions.ts';

const ToastNotification = (props: ToastNotificationProps) => {
	const data = useToastNotificationModel(props);

	// This value allowes interaction into the componentn
	if (!data.isToastActive) {
		return null;
	}

	return <ToastNotificationView {...data} />;
};

export default ToastNotification;
