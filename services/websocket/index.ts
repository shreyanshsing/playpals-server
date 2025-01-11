import express from "express";
import http from "http";
import WebSocket from "ws";
import { GameClientMap } from "./server-client-map";
import { getGameStatus, updateGameStatus, updatePlayer } from "./handlers";
import { getRandomLightColor } from "../../utils/utils";
import { WebSocketMessageType } from "./enum";
import ServerGridMap from "./sever-grid-map";
import WebSocketClientIdMap from "./ws-client-map";

const app = express();
const port = process.env.WEBSOCKET_PORT;
const gameClientMap = new GameClientMap();
const serverGridMap = new ServerGridMap();
const clientSocketMap = new WebSocketClientIdMap();

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

const setGame = async(gameId: string, clientId: string) => {
  if (!serverGridMap.has(gameId)) {
    serverGridMap.set(gameId);
    console.log("updated game grid map", serverGridMap);
    return;
  } else {
    console.log("Game already exists");
    const status = await getGameStatus(gameId);
    const ws = clientSocketMap.get(clientId);
    ws?.send(
      JSON.stringify({
        type: status,
        grid: serverGridMap.get(gameId),
      })
    );
  }
};

const addClientToGame = (gameId: string, clientId: string) => {
  gameClientMap.addClient(gameId, clientId);
  console.log("updated game client map", gameClientMap);
};

const generateSymbolForPlayers = () => {
  return Math.round(Math.random()) === 0 ? ["X", "O"] : ["O", "X"];
};

const generateColorForPlayers = () => {
  return [getRandomLightColor(), getRandomLightColor()];
};

const updatePlayers = (
  clientIds: string[],
  symbols: string[],
  colors: string[]
) => {
  clientIds.forEach((clientId, index) => {
    updatePlayer(clientId, symbols[index], colors[index]);
  });
};

const prepareGame = (
  gameId: string,
  clients: WebSocket[],
  clientIds: string[]
) => {
  const symbols = generateSymbolForPlayers();
  const colors = generateColorForPlayers();
  updateGameStatus(gameId, WebSocketMessageType.GAME_LIVE);
  updatePlayers(clientIds, symbols, colors);
  notifyClients(clients);
};

const notifyClients = (clients: WebSocket[]) => {
  clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: WebSocketMessageType.GAME_START,
      })
    );
  });
};

const startGame = (gameId: string) => {
  const [c1, c2] = gameClientMap.getClients(gameId);
  const client1 = clientSocketMap.get(c1)!;
  const client2 = clientSocketMap.get(c2)!;
  prepareGame(gameId, [client1, client2], [c1, c2]);
};

const checkAndStartGame = (gameId: string) => {
  console.log("Checking game status and starting game");
  const clients = gameClientMap
    .getClients(gameId)
    .map((clientId) => clientSocketMap.get(clientId))
    .filter(Boolean);
  if (clients.length === 2) {
    console.log("Starting game, both clients connected");
    startGame(gameId);
  }
};

const checkGameStatusAndProcess = async (gameId: string, clientId: string) => {
  const status = await getGameStatus(gameId);
  console.log("Game status:", status);
  if (status === WebSocketMessageType.GAME_LIVE) {
    const client = clientSocketMap.get(clientId)!;
    client.send(
      JSON.stringify({
        type: WebSocketMessageType.GAME_LIVE,
        grid: serverGridMap.get(gameId),
      })
    );
    return;
  }
  addClientToGame(gameId, clientId);
  checkAndStartGame(gameId);
};

const sendOpponentMove = (gameId: string, index: number, clientId: string) => {
  console.log("Sending opponent move");
  const [opponentId] = gameClientMap
    .getClients(gameId)
    .filter((id) => id !== clientId);
  console.log("Opponent id", opponentId);
  const client = clientSocketMap.get(opponentId)!;
  console.log("Opponent client socket", client.readyState);
  client.send(
    JSON.stringify({
      type: WebSocketMessageType.GRID_MARKED,
      index,
      clientId,
    })
  );
};

const resolveActions = ({
  type,
  serverId,
  clientId,
  ws,
  index,
}: {
  type: WebSocketMessageType;
  serverId?: string;
  clientId?: string;
  index: number;
  ws: WebSocket;
}) => {
  console.log("Resolving actions");
  switch (type) {
    case WebSocketMessageType.SET_GAME:
      setGame(serverId!, clientId!);
      break;
    case WebSocketMessageType.JOIN_GAME:
      checkGameStatusAndProcess(serverId!, clientId!);
      break;
    case WebSocketMessageType.MARK_GRID:
      serverGridMap.markCell(serverId!, index, clientId!);
      sendOpponentMove(serverId!, index, clientId!);
      break;
  }
};

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("New client connected");

  // Message handler
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    const { gameId, type, index, clientId } = JSON.parse(message.toString());
    clientSocketMap.set(clientId, ws);
    resolveActions({ type, serverId: gameId, ws, clientId, index });
  });

  // Handle client disconnect
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

export const startWebsocketServer = () => {
  // Start the server
  server.listen(port, () => {
    console.log(`websocket running at http://localhost:${port}`);
  });
};
