import { Router } from "express"
import productsRoute from "./product.routes"

const routes = Router()

routes.use('/api/productos',productsRoute)

export default routes
