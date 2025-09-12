const express = require('express');
const cors = require('cors');
const login = require('./routes/login.js');
const signup = require('./routes/signup.js');
const userStasts = require('./routes/platform_stats.js') 
const getPosts = require('./routes/getposts.js')
const createPost = require('./routes/createPost.js')



const app = express();
const port = 8000;


app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));


// login 
app.post('/login', login);

// signup
app.post('/sign-up', signup);

// get users count
app.get('/users-stats', userStasts );

// get posts
app.get('/getposts', getPosts);

// create post 
app.post('/create', createPost);



app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
