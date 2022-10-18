import productsRoute from "../../src/routes/product.routes"

const request = require("supertest")
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/productos", productsRoute)

test("get productRoute returns db length 3", done => {
    request(app)
      .get("/api/productos/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res:any) => {
        expect(Object.keys(res.body.data)).toHaveLength(3)
        done()
      })
  });
  
  test("post to productRoute returns 201", done => {
    request(app)
      .post("/api/productos/")
      .send({  
        "title": "mayonesa",
        "price": 200,
        "url": "www.elMorza.com"
       })
       .expect(201,done);
  });