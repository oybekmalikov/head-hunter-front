import { notification } from "antd";
import '@ant-design/v5-patch-for-react-19';
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
