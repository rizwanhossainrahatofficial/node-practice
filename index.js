const express=require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId=require('mongodb').ObjectId;
const app=express();
const cors=require('cors')
const port=5000;

app.use(cors())
app.use(express.json())
 
// user:mydbuser1
// pass:UTdh8uUcndBUwbBu




const uri = "mongodb+srv://mydbuser1:UTdh8uUcndBUwbBu@cluster0.iwcqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


  // perform actions on the collection object
  async function run() {
    try {
      await client.connect();
      const database = client.db("student");
      const userscoleection = database.collection("users");

      // get 
      app.get('/users',async(req,res)=>{
        const cursor=userscoleection.find({})
        const result=await cursor.toArray()
        res.send(result)
      })


      // update state id diye route a pathanor jonno
      app.get('/users/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:ObjectId(id)}
        const user=await userscoleection.findOne(query)
        res.send(user)
      })

      // update
      app.put('/users/:id',async(req,res)=>{
        const id=req.params.id;
        const updateuser=req.body;
        console.log(updateuser)
        const filter = {_id:ObjectId(id)}
        const options = { upsert: true };
        const updateDoc = {
          $set: {
           name:updateuser.name,
           email:updateuser.email
          },
        };
        const result = await userscoleection.updateOne(filter, updateDoc, options);
        res.json(result)
    })

      // post
     app.post('/users',async(req,res)=>{
       const newUser=req.body;
      //  console.log(newUser)
       const result=await userscoleection.insertOne(newUser)
       res.json(newUser)
     })



    //  delete
    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
            // console.log('id',id)
      const query={_id:ObjectId(id)};
      const result=await userscoleection.deleteOne(query);

      // console.log('deleted id ',result)

      res.send(result)
  });


     
    } finally {
      // await client.close();
    }
  }
  run().catch(console.dir);


  client.close();



app.get('/',(req,res)=>{
    console.log("this is node ")
    res.send('this is my page practice')
})

app.listen(port,(req,res)=>{
    console.log("port is 5000")
})