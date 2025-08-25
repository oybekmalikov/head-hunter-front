export interface Message {
	id: string;
	conversationId: string;
	senderId: string;
	content: string;
	type: "text" | "file" | "image";
	isRead: boolean;
	createdAt: Date;
}

export interface Conversation {
	id: string;
	participants: string[];
	lastMessage?: Message;
	unreadCount: number;
	createdAt: Date;
	updatedAt: Date;
}
