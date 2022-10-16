import { server } from "./server/server"
import getDb from "./db/getDB";

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

// Initializing DB
getDb()
