# panel-realtime-api

Project: panel-realtime-api

## Setup

1. Fill Postgres credentials em `.env`
2. Create Postgres database: panel_realtime
3. Install:
   ```bash
   npm install
   ```
4. Run:
   ```bash
   npm run dev
   ```

## WebSocket

Connect to `http://<server>:<port>` via socket.io client.
After connect:

- `socket.emit('join-empresa', empresa_id)`
- Listen to `evento` (all) or `evento:<tipo>` (typed).
