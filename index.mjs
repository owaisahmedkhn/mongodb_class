import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(cors())
app.use(express.json())
//// mongodb connection code /////////////////////////////////////////////////////////////////////////////////////////////


//mongoose.connect("mongodb+srv://owaisahmedkhn:dbowais123@cluster0.rygcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");



//let dbUrl = "mongodb+srv://owaisahmedkhn:dbowais123@cluster0.9qvbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// let dbURI = 'mongodb://localhost/mydatabase';
//mongoose.connect(dbUrl);

//let dbURI = "mongodb+srv://dbuser:dbpassword123@cluster0.9qvbs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const dbUrl = "mongodb+srv://owaisahmedkhn:owaisahmedkhn@cluster0.rygcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 


mongoose.connect(dbUrl);
//mongoose.connect(dbUrl);

const myTimeout = setTimeout(myGreeting, 5000);

function myGreeting() {
  console.log(mongoose.connection.readyState);
}
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
  console.log("Mongoose is connected");
  // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
  console.log('Mongoose connection error: ', err);
  process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
      console.log('Mongoose default connection closed');
      process.exit(0);
  });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////


const postSchema = new mongoose.Schema({
  "text": String,
  "createdOn": { type: Date, default: Date.now }
});
const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/post/:id', (req, res) => {
  //const postIndex = Number(req.params.id)
 // res.send(testArray[postIndex])
})

app.get('/posts', (req, res) => {
  //res.send(testArray)
})

app.post('/post', (req, res) => {
  
  if(req.body.text || req.body.text.length > 255){
    res.status(400).send("Incorrect response. Please make sure the data is not empty and it must not exeeds 200 characters. e.g : This is your post data");
    return;
  }
  
  ///// creating post object for insertion in datatbase as part of schema defined above
  
  let newPost = new Post({
    "text" : req.body.text
  })
   
  
  newPost.save( (err,saved)=>{
    if(!err){
      res.send("Your Post is saved in our database");
    }else{
      res.status(500).send("Post could not be saved. please try again");
    }
  });
  

})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
