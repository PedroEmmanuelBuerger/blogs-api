module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define(
      'PostCategory',
      {
        postId: {
            allowNull : false,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        categoryId: {
            allowNull : false,
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
      },
      {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
      },
    );
  
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
          as: 'categories',
          through: PostCategory,
          foreignKey: 'postId', 
          otherKey: 'categoryId', 
        });
        models.Category.belongsToMany(models.BlogPost, {
          as: 'BlogPosts',
          through: PostCategory,
          foreignKey: 'categoryId',
          otherKey: 'postId',
        });
      };
    
    return PostCategory;
  };