const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/ErrorHandle');
const connectDB = require('./config/DbConfig');
const Routes = require('./routes/Routes')
//app config
const app = express();
dotenv.config();

// middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

//Connect db
connectDB();


app.use('/api/auth', Routes); 


app.get("/", (req, res)=>{
    res.send("API WORKING")
})
PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

