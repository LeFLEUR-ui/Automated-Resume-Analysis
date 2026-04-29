from fastapi import WebSocket
from typing import Dict, Set

class ConnectionManager:
    def __init__(self):
        # user_id -> set of active WebSockets
        self.active_connections: Dict[int, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = set()
        self.active_connections[user_id].add(websocket)
        await self.broadcast_status(user_id, True)

    def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:
                del self.active_connections[user_id]
                # We should broadcast async, but disconnect is synchronous here.
                # Usually we handle it in the websocket endpoint.
                
    async def send_personal_message(self, message: dict, user_id: int):
        if user_id in self.active_connections:
            # Use list() to avoid "Set changed size during iteration" errors
            for connection in list(self.active_connections[user_id]):
                try:
                    await connection.send_json(message)
                except Exception:
                    if connection in self.active_connections[user_id]:
                        self.active_connections[user_id].remove(connection)

    async def broadcast_status(self, user_id: int, is_online: bool):
        # Notify all connected clients about the status change
        message = {"type": "status", "user_id": user_id, "is_online": is_online}
        for uid in list(self.active_connections.keys()):
            if uid != user_id:
                for connection in list(self.active_connections[uid]):
                    try:
                        await connection.send_json(message)
                    except Exception:
                        if connection in self.active_connections[uid]:
                            self.active_connections[uid].remove(connection)

    def is_user_online(self, user_id: int) -> bool:
        return user_id in self.active_connections

manager = ConnectionManager()
