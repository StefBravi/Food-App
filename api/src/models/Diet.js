const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('diet', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            auto_increment: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          create: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
          }
        }, {timestamps:false}
        );
      }