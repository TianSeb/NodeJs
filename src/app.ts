import { server } from "./server/server"
import getDb from "./db/getDB";

const PORT = 8080
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

server.on('error', (err) => {
    console.log('ERROR =>', err);
  });

// Initializing DB
getDb()
