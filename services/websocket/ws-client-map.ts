import WebSocket from 'ws';

export default class WebSocketClientIdMap {
    private map = new Map<string, WebSocket>();
    
    set(clientId: string, wsClient: WebSocket) {
        this.map.set(clientId, wsClient);
    }
    
    get(clientId: string) {
        return this.map.get(clientId);
    }
    
    delete(clientId: string) {
        this.map.delete(clientId);
    }

    has(clientId: string) {
        return this.map.has(clientId);
    }

    clear() {
        this.map.clear();
    }
}