const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")('sk_test_51PPEcLKztv8p0nMgtkDr5XXn82kguSKrnpP41ge4cnyijJgKhQt3hUCwdEigazeWumN2sNr3ce0qA7N2MCOn5HHK00888tOAri');
// middleware
// secret Key

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://b9a12realstate.netlify.app",
      "https://trila-real-estate.vercel.app",
    ],
  })
);
app.use(express.json());

//   ORIGINAL MONGODB CODE

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USERPASS}@cluster0.gnmxrsr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // app.get("",(req,res)=>{

    // })

    const Allstate = client.db("Alldata").collection("Allproperty");
    const Alluser = client.db("Alldata").collection("users");
    const wishlist = client.db("Alldata").collection("Wishlist");
    const reviewlist = client.db("Alldata").collection("reviews");
    const Offer = client.db("Alldata").collection("Offer");

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
    app.get("/somestate", async (req, res) => {
      const arraydata = Allstate.find().limit(4);
      const data = await arraydata.toArray();
      res.send(data);
    });
    app.get("/allstate", async (req, res) => {
      const arraydata = Allstate.find();
      const data = await arraydata.toArray();
      res.send(data);
    });
    app.get("/allwish", async (req, res) => {
      const arraydata = wishlist.find();
      const data = await arraydata.toArray();
      res.send(data);
    });
    app.get("/latestreview", async (req, res) => {
      const arraydata = reviewlist.find().limit(3);
      const data = await arraydata.toArray();
      res.send(data);
    });
    app.get("/allreview", async (req, res) => {
      const arraydata = reviewlist.find();
      const data = await arraydata.toArray();
      res.send(data);
    });
    app.get("/Alloffer", async (req, res) => {
      const arraydata = Offer.find();
      const data = await arraydata.toArray();
      res.send(data);
    });
    app.post("/adduser", (req, res) => {
      const { email, photourl, username, roll } = req.body;
      const fulldata = {
        useremail: email,
        userphoto: photourl,
        username: username,
        userroll: roll,
      };
      Alluser.insertOne(fulldata);
    });
    app.post("/addwish", (req, res) => {
      const data = req.body;

      wishlist.insertOne(data);
    });
    app.post("/addreview", (req, res) => {
      const data = req.body;
      const review = reviewlist.insertOne(data);
      res.send(review);
    });
    app.post("/addoffer", (req, res) => {
      const data = req.body;
      const dataa = Offer.insertOne(data);
      res.send(dataa);
    });
    app.post("/addproperty", (req, res) => {
      const data = req.body;
      Allstate.insertOne(data);
      res.send("sucsess");
    });
    app.delete("/deletereview/:id", (req, res) => {
      const id = req.params.id;
      reviewlist.findOneAndDelete({ _id: new ObjectId(id) });
      // console.log(id);
      // // const dataa= Offer.insertOne(data);
      res.send("delete sucsessfull");
    });
    app.delete("/deletewish/:id", (req, res) => {
      const id = req.params.id;
      wishlist.findOneAndDelete({ _id: new ObjectId(id) });
      res.send("delete sucsessfull");
    });
    app.delete("/deletestate/:id", (req, res) => {
      const id = req.params.id;
      Allstate.findOneAndDelete({ _id: new ObjectId(id) });
      res.send("delete sucsessfull");
    });
    app.put("/updatestate/:id", (req, res) => {
      const id = req.params.id;
      const data = req.body; 
      const newvalues = {
        $set: { Pricerange: data.price, Propertyimage: data.image,Propertylocation:data.proplocation,Propertytitle:data.poptitle  },
      };
      Allstate.updateOne({ _id: new ObjectId(id) }, newvalues);
      res.send("update sucsessfull");
    });
    app.put("/updateoffer/:id", (req, res) => {
      const id = req.params.id;
      const data = req.body; 
     
      const newvalues = {
        $set: { status:data.status  },
      };
      Offer.updateOne({ _id: new ObjectId(id) }, newvalues);
      res.send("update sucsessfull");
   
    });
    
    app.put("/updatestatus/:id", (req, res) => {
      const id = req.params.id;
      const data = req.body; 
     
      const newvalues = {
        $set: { status:data.status  },
      };
      Allstate.updateOne({ _id: new ObjectId(id) }, newvalues);
      res.send("update sucsessfull");
   
    });
// payment intent
app.post('/create-payment-intent', async (req, res) => {
  const { price} = req.body;
  const amount = parseInt(price * 100);
 const paymentIntent = await stripe.paymentIntents.create({
  amount: amount,
  currency: 'usd',
  payment_method_types: ['card']
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  })
  
  })
    app.get("/user", async (req, res) => {
      const arraydata = Alluser.find();
      const data = await arraydata.toArray();
      res.send(data);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch();

app.get("/", (req, res) => {
  res.send("server runing");
});

app.listen(port, () => {
  console.log(`Doctor Server is running${port}`);
});
