const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json())

const uri =`mongodb+srv://admin:gohSE782nH1jB7zL@cluster0.acwv6or.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });






async function run() {
    try {
        await client.connect();
        const blogCollection = client.db('blogs').collection('blog');


        app.get('/posts', async(req, res) =>{
            const query= {};
            const cursor = blogCollection.find(query);
            const getPost = await cursor.toArray();
            res.send(getPost)
           })
     
      // create a document to 
              //POST  data 
              app.post('/posts', async(req, res)=>{
                const newPost= req.body;
                const result = await blogCollection.insertOne(newPost);
                res.send(result);
            })
        
     
    } finally {
        
    }
  }
  run().catch(console.dir);



app.get('/', (req, res)=>{
    res.send("server is running")
})

app.listen(port,()=>{
    console.log('listening port',port)
})
