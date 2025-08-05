import {Sequelize} from 'sequelize';
  export const sequelize = new Sequelize("auth1" , "postgres", "123" ,{
  host: 'localhost',
  dialect: 'postgres'
});
