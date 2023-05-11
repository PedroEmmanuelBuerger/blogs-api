module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
    },
  );
  User.associate = (models) => {
    User.belongsTo(models.BlogPost,
      { foreignKey: 'id', as: 'blogsPosts' });
  };
    return User;
  };