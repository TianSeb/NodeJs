import { server } from "./server/server"

const PORT = 3000
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})