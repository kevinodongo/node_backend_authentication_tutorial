describe("test api calls POST and GET routes",  () => {
    let Secret;
    let db;
    let request;
    let app;
    beforeAll(async () => {
       app = require("../server")
       request = require('supertest');
       db = require("../src/models")
       Secret = db.secret
    })
  
    afterAll(async (done) => {
      await db.mongoose.connection.close();
      done()
    })
  
    it("it should respond with json and status 200", async (done) => {
      const response = request(app).post('/api/secret').send({
        json: true,
        body: JSON.stringify({
          secret: "Hello World",
          expiresAfter: "10",
          expiresAfterViews: "0"
        })
      })
      console.log("[RESPONSE]", response)
      console.log("[RESPONSE]", response.statusCode)
      //expect('Content-Type', /json/)
      done()
    })
  })