import { notification } from "antd";
<<<<<<< HEAD

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const Notification = (
    type: NotificationType,
    message: string,
    description?: string
) => {
    notification[type]({
        message,
        description,
        placement: 'topRight',
        duration: 2,
        showProgress: true
    });
};
=======
type NotificationType = "success" | "info" | "warning" | "error";
export const Notification = (
	type: NotificationType,
	message: string,
	description?: string
) => {
	notification[type]({
		message,
		description,
		placement: "topRight",
		duration: 3,
		showProgress: true,
	});
};
>>>>>>> b43c80507ed3d6f4c1319341edecde2d2af7b6e0
