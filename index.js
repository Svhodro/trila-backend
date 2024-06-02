const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require("cors");
require('dotenv').config()

// middleware

app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://amazon-clone-sporsho.netlify.app",
        // "https://cardoctor-bd.firebaseapp.com",
      ],
    })
  );
  app.use(express.json());

//   ORIGINAL MONGODB CODE


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USERPASS}@cluster0.gnmxrsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // app.get("",(req,res)=>{
      
    // })
   

    const Allstate = client.db('Alldata').collection('Advaticement');
    const Alluser = client.db('Alldata').collection('users');
    const wishlist = client.db('Alldata').collection('Wishlist');
   


    
   

  
    // app.get("/Category",async(req,res)=>{
    //   const arraydata = Category.find();
    //   const data = await arraydata.toArray();      
    //   res.send(data);
    // })
    // app.post('/addcard',(req,res)=>{
    //         const data=req.body
    //         console.log(data)
    //         Cart.insertOne(data) 
    // })
    // app.get('/usercart',async(req,res)=>{
    //   const arraydata = Cart.find();
    //   const data = await arraydata.toArray();      
    //   res.send(data);
    // })
    app.get('/somestate',async(req,res)=>{
      const arraydata = Allstate.find().limit(4);
        const data = await arraydata.toArray();      
        res.send(data);
    })
    app.get('/allstate',async(req,res)=>{
      const arraydata = Allstate.find();
        const data = await arraydata.toArray();      
        res.send(data);
    })
    app.post('/adduser',(req,res)=>{
              const {email,photourl,username,roll}=req.body
              const fulldata={
                useremail:email,
                userphoto:photourl,
                username:username,
                userroll:roll
              }
              Alluser.insertOne(fulldata) 
      })
      app.post('/addwish',(req,res)=>{
        const {email,photourl,username,roll}=req.body
        const fulldata={
          useremail:email,
          userphoto:photourl,
          username:username,
          userroll:roll
        }
        // wishlist.insertOne(fulldata) 
})
      app.get('/user',async(req,res)=>{
        const arraydata = Alluser.find()
          const data = await arraydata.toArray();      
          res.send(data);
      })
    
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch();





app.get('/',(req,res)=>{
    res.send("server runing")
})

  app.listen(port, () => {
    console.log(`Doctor Server is running${port}`);
  });