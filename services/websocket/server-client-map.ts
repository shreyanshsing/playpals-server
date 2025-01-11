export class GameClientMap {
  clients: Map<string, string[]>;

  constructor() {
    this.clients = new Map();
  }

  getClients(gameId: string) {
    return this.clients.get(gameId) || [];
  }

  async addClient(gameId: string, clientId: string) {
    if (!this.clients.has(gameId)) {
        this.clients.set(gameId, [clientId]);
    } else {
      const clients = this.clients.get(gameId)!;
      if (!clients.includes(clientId)) {
        clients.push(clientId);
      }
    }
  }

  removeClient(gameId: string, clientId: string) {
    if (this.clients.has(gameId)) {
      const clients = this.clients.get(gameId)!;
      const index = clients.indexOf(clientId);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      if (clients.length === 0) {
        this.clients.delete(gameId);
      }
    }
  }

  removeGame(gameId: string) {
    this.clients.delete(gameId);
  }

  clear() {
    this.clients.clear();
  }
}
