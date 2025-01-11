export default class ServerGridMap {
  private map = new Map<string, string[]>();

  set(serverId: string) {
    const serverGrid = Array(9).fill(null);
    this.map.set(serverId, serverGrid);
  }

  get(serverId: string) {
    return this.map.get(serverId);
  }

  delete(serverId: string) {
    this.map.delete(serverId);
  }

  has(serverId: string) {
    return this.map.has(serverId);
  }

  markCell(serverId: string, index: number, clientId: string) {
    const serverGrid = this.get(serverId);
    if (!serverGrid) {
      return;
    }
    serverGrid[index] = clientId;
  }

  clear() {
    this.map.clear();
  }
}
