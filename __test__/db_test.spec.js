describe("test db connection",  () => {
    let Secret;
    let db;
    beforeAll(async () => {
       const app = require("../server")
       db = require("../src/models")
       Secret = db.secret
    })
  
    afterAll(async (done) => {
      await db.mongoose.connection.close();
      done()
    })
  
      // let us a simple test for our db
      it('should post a secret to collections', async (done) => {
        let secret = new Secret({
          _id: "602beab88e3b5815b4861975",
          hash: "87a88e7928b120ededac5ca240b9b02550ae78b5",
          secretText: "728b40925188c12add07ee5e4d844f69",
          expiresAt: "2021-02-16T15:56:32.185Z",
          remainingViews: "5",
          createdAt: "2021-02-16T15:54:32.198Z",
        })
        
        // * test post request
       const post_response = await secret.save(secret)
       expect.objectContaining(post_response)
    
    
       // * test get request
       const get_response = await Secret.findOne({ _id: "602beab88e3b5815b4861975"})
       expect.objectContaining(get_response)
    
        
      // * test deleting request
       const delete_response = await Secret.findOneAndDelete({ _id: "602beab88e3b5815b4861975"})
       expect.objectContaining(delete_response)
  
       done()
      });
  })