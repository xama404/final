'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_tbs = sequelize.define('users_tbs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  users_tbs.associate = function(models) {
    users_tbs.hasMany(models.collections_tbs, { foreignKey: 'user_id' });
  };
  return users_tbs;
};
