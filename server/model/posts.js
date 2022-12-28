import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        text: {
            type: DataTypes.TEXT, 
            allowNull: false 
        },
        image: {
            type: DataTypes.STRING, 
            allowNull: false 
        },
        amount_goal: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        amount_collected: {
            type: DataTypes.INTEGER
           
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }

    return sequelize.define('posts', Schema)
}

export default Posts