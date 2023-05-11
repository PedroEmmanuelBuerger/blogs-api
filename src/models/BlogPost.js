module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        image: DataTypes.STRING,
        published: DataTypes.DATE,
        updated:  DataTypes.DATE,
      },
      {
        timestamps: false,
        underscored: true,
      });
      BlogPost.associate = (models) => {
        BlogPost.hasMany(models.User,
          { foreignKey: 'id', as: 'users' });
      };

    return BlogPost;
  };