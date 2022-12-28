import { DataTypes } from 'sequelize'

const Funds = (sequelize) => {
    const Schema = {
      
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transfer: {
            type: DataTypes.STRING,
            allowNull: false
        }        

    }

    return sequelize.define('funds', Schema)
}

export default Funds