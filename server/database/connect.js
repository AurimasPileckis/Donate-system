import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import { Users, Posts, Funds } from '../model/index.js'

const database = {}

const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Donate'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql'})

    database.Users = Users(sequelize)
    database.Posts = Posts(sequelize)
    database.Funds = Funds(sequelize)
  
    database.Posts.hasMany(database.Funds)
    database.Funds.belongsTo(database.Posts)

    
    await sequelize.sync({ alter: true })

} catch (error) {
    console.log(error)
    console.log('Failed connect to database')

}
export default database