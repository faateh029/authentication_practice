import express from 'express';
import {sequelize} from './db/dbConnection.js';
import {router} from './routes/route.js'
const PORT = process.env.PORT||8081;
const server = express();
server.use(express.json());
server.use('/api', router)
try {
  await sequelize.authenticate(); 
  // user = await createUserModel(sequelize);
  await sequelize.sync({alter:true});
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
server.listen(PORT , ()=>{
    console.log("server running on port 8081")
})