export class WebSocketClient {
	private ws: WebSocket | null = null;
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 5;
	private reconnectDelay = 1000;

	constructor(private url: string) {}

	connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.ws = new WebSocket(this.url);

				this.ws.onopen = () => {
					console.log("WebSocket connected");
					this.reconnectAttempts = 0;
					resolve();
				};

				this.ws.onclose = () => {
					console.log("WebSocket disconnected");
					this.handleReconnect();
				};

				this.ws.onerror = (error) => {
					console.error("WebSocket error:", error);
					reject(error);
				};
			} catch (error) {
				reject(error);
			}
		});
	}

	private handleReconnect(): void {
		if (this.reconnectAttempts < this.maxReconnectAttempts) {
			this.reconnectAttempts++;
			console.log(
				`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
			);

			setTimeout(() => {
				this.connect();
			}, this.reconnectDelay * this.reconnectAttempts);
		}
	}

	send(data: any): void {
		if (this.ws && this.ws.readyState === WebSocket.OPEN) {
			this.ws.send(JSON.stringify(data));
		}
	}

	onMessage(callback: (data: any) => void): void {
		if (this.ws) {
			this.ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					callback(data);
				} catch (error) {
					console.error("Failed to parse WebSocket message:", error);
				}
			};
		}
	}

	disconnect(): void {
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
	}
}
