import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
var counter = 0;
let paramBody,key;
let insertObj = {};
var testArray = [
                  
                  { "key1": "First Value 1 "},
                  { "key2": "First Value 2" },
                  {  "key3": "First Value 3"},
                  { "key4": "First Value 4" }
                  
                ]

app.get('/post/:id', (req, res) => {
  const postIndex = Number(req.params.id)
  res.send(testArray[postIndex])
})

app.get('/posts', (req, res) => {
  res.send(testArray)
})

app.post('/post', (req, res) => {
  paramBody = req.body;
  key = "key" + testArray.length
  insertObj = {
    key : paramBody
  }
  testArray.push(req.body);
  res.send(req.body)
})

app.put('/post/:id', (req, res) => {
  const putIndex = Number(req.params.id)

    if( testArray[putIndex]){

      key = "key" + testArray.length
      testArray[putIndex][key] = paramBody;
      res.send("Post updated.")

    }else{

      res.send("Post to be updated could not be found")

    }
})

/*
app.delete('/post/:id', (req, res) => {
  const delIndex = Number(req.params.id)
  if( testArray[delIndex]){

    paramBody = req.params.body;
    key = "key" + testArray.length

    insertObj = {
      key : paramBody
    }

    testArray[delIndex] = '';
    res.send("Post deleted")

  }else{

    res.send("Post to be deleted could not be found")

  }
})
*/

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
