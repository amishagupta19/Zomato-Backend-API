const { Sequelize, DataTypes} = require("sequelize");

const sequelize = require("./dbconnect");

const User = sequelize.define("Users", {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME,
    }
});


const Menu = sequelize.define("Menu",{
    item_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    item_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    
    item_description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    item_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_rating:{
        type: DataTypes.INTEGER,
        unique: true
    },
    item_availability:{
        type: DataTypes.INTEGER,
        unique: false
    },
    is_veg:{
        type: DataTypes.BOOLEAN,
        unique: false
    },
    restaurant_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME,
    }
});

const Restaurant = sequelize.define("Restaurant",{
    restaurant_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    rest_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    
    rest_address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rest_rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    rest_phone:{
        type: DataTypes.STRING,
        unique: true
    },
    rest_status:{
        type: DataTypes.BOOLEAN,
        unique: false
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME,
    }
});

const Order = sequelize.define("Order",{
    order_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurant_id:{
        type:DataTypes.STRING,
        allowNull: false
    },
    item_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME,
    }
});

const Order_details = sequelize.define("Order_details",{
    order_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt:{
        type: DataTypes.TIME
    },
    updatedAt:{
        type: DataTypes.TIME,
    }
});

Menu.belongsTo(Restaurant, {foreignKey:"Restaurant_id"});
Restaurant.hasMany(Menu,{foreignKey:"Restaurant_id"});

User.hasMany(Order, {foreignKey:"id"});
Order.belongsTo(User, {foreignKey:"id"});
Order_details.belongsTo(Order, {foreignKey:"order_id"});
Order.hasMany(Order_details, {foreignKey:"order_id"});
module.exports = { User: User, Restaurant: Restaurant, Menu: Menu, Order:Order, Order_details:Order_details};
