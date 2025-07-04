const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());

app.use('/path/auth', authRoutes);
app.use('/path/post', postRoutes);

connectDB();

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`server started on port: ${port}`);
    
});
