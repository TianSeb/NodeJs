import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_,res) => {
    console.log('pinging all over the world');
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})
