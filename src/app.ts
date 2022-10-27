import { server } from "./server/server"

//-------------------------------------------- 
// Server Init
const PORT = 8080
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

server.on('error', (err) => {
    console.log('ERROR =>', err);
  });