const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
require('./database');


const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();