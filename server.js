
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const UserModel = require('./schema.js')
const bcrypt = require("bcrypt")

app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mongoose = require('mongoose');
const { collection } = require('./schema.js')

// Replace <connection_string> with your actual MongoDB connection string
const uri = "MONGODB URI";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



app.get('/', (req,res)=>{
    res.send(database.users)
})

app.post('/signin', async (req,res)=> {
    const {email, password} = req.body
    try{
    const user = await UserModel.findOne( {email} )
     if( !user){
        return res.status(400).json({message:"invalid data"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password );
    if (!isPasswordValid){
        return res.status(401).json({message: 'Invalid eamail or password'})
     }
    
    res.status(200).json({ message: 'Sign-in successful' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' });
}
        
})

app.post('/register', async (req,res)=>{
    const {email, name, password} = req.body

    if(!name || !email || !password ){
        return res.status(400).json({message:"invalid data"})
    }

    const hashPsswd = await bcrypt.hash(password, 10)
  

   const newUser = new UserModel({
            username : name,
            email,
            password:hashPsswd,
    })
    try {
        const savedUser = await newUser.save();

        res.status(201).json({name:savedUser.username, email:savedUser.email});
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})


app.get('/profile/:id', (req,res)=>{
    const { id } = req.params
    collection.findOne({_id : id}, (err , user) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
  
          if (user) {
            console.log(user)
            res.json(user);
          } else {
            res.status(404).json("No such user");
          }
        });
      });


app.put('/image', (req,res) =>{
    const { id } = req.body
    let found = false
    database.users(user => {
        if (user._id === id){
            found = true
            user.entries++
            return res.json(user.entries)
        }   
    })
    if (!found){
        res.status(404).json("No such user")}
})

const PORT = 3100

app.listen(PORT, () =>{
    console.log(`app is running on port ${PORT}`)
})


// / res = this is wroking
// /signin = post success/faild 
// /register = post user 
// /porifile/:userid = get user 
// /image =  put user




 // if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    //     res.json(database.users[0])
    // }else {
        // res.status(400).json('Invalid Credential')
    // } 


