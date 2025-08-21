import { apiClient } from "@/lib/api";
import { Conversation, Message } from "@/types/message";

export class MessageService {
	async getMessages(conversationId: string): Promise<Message[]> {
		const response = await apiClient.get<Message[]>(
			`/messages/${conversationId}`
		);
		return response;
	}

	async sendMessage(messageData: Partial<Message>): Promise<Message> {
		const response = await apiClient.post<Message>("/messages", messageData);
		return response;
	}

	async getConversations(): Promise<Conversation[]> {
		const response = await apiClient.get<Conversation[]>(
			"/messages/conversations"
		);
		return response;
	}

	async getConversationById(id: string): Promise<Conversation> {
		const response = await apiClient.get<Conversation>(
			`/messages/conversations/${id}`
		);
		return response;
	}

	async markAsRead(messageId: string): Promise<void> {
		await apiClient.put(`/messages/${messageId}/read`);
	}

	async markConversationAsRead(conversationId: string): Promise<void> {
		await apiClient.put(`/messages/conversations/${conversationId}/read`);
	}
}

export const messageService = new MessageService();
