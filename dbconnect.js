const{Sequelize} = require("sequelize");

const sequelize = new Sequelize("firstdb", "root","amisha@1234",{
    host: "localhost",
    dialect:"mysql",
})

sequelize.authenticate().then(()=>{
    console.log("Connected to mysql successfully");
}).catch((err)=>{
    console.log("unable to connect due to error " + err);
});

module.exports = sequelize;