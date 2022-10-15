import { Router } from "express"

const productsRoute = Router()

productsRoute.get('/', (req,res) => {

    return res.json('OK')
})

// GET /api/productos

// GET /api/productos:id
// POST /api/productos:id
// PUT /api/productos:id
// DELETE /api/productos:id

export default productsRoute
