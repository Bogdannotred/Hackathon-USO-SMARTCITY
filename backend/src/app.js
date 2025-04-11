// backend/src/app.js
const express = require('express');
const app = express();
const db = require('./db'); //Import database connection
const userRoutes = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors()); // Enable CORS (for development - restrict in production)
app.use('/api/users', userRoutes);


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  //Your login logic here (fetch user from DB and compare passwords)
  try{
      const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      if(user.rows.length > 0 && user.rows[0].password === password){ //Insecure password comparison - use bcrypt in production
          res.json({token: "sometoken"}); //Insecure token - use JWT in production
      }else{
          res.status(401).json({error: "Invalid credentials"});
      }

  }catch(error){
      console.error(error);
      res.status(500).json({error: "Server error"});
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
