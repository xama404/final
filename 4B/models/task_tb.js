'use strict';
module.exports = (sequelize, DataTypes) => {
  const task_tbs = sequelize.define('task_tbs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    collections_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  task_tbs.associate = function(models) {
    task_tbs.belongsTo(models.collections_tbs, { foreignKey: 'collections_id' });
  };
  return task_tbs;
};
