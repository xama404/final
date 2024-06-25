'use strict';
module.exports = (sequelize, DataTypes) => {
  const collections_tbs = sequelize.define('collections_tbs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  collections_tbs.associate = function(models) {
    collections_tbs.belongsTo(models.users_tbs, { foreignKey: 'user_id' });
    collections_tbs.hasMany(models.task_tbs, { foreignKey: 'collections_id' });
  };
  return collections_tbs;
};
