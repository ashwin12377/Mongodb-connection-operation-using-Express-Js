const express = require('express');
const app = express();
const path = require("path");

const userModel = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

// info: read users
app.get('/read', async (req, res) =>{
    let allUsers =  await userModel.find()
    // res.render(allUsers);
    res.render("read", {users: allUsers})
})


// info: create users
app.post('/create', async (req, res) =>{

    let {name, email, image} = req.body;

    let createUser = await userModel.create({
        name,
        email,  
        image
    })
    res.send(createUser); 
})

// info: Delete user
app.get('/delete/:id', async (req, res) => {
   let deleteUser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
    console.log("User deleted..!")
})

app.listen(3000, () => {
    console.log("Server running on port 3000...");
});