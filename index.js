const express = require("express");
const {User, Menu, Restaurant} = require("./model");
const app = express();
const PORT = 8000;

app.listen(PORT, (err) => {
    if (err) console.log("Error" + err);
    else console.log("server started successfully on port " + PORT);
});

app.use(express.json());

// Handle JSON parse errors
// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         return res.status(400).send({ message: "Bad request: Malformed JSON" });
//     }
//     next();
// });

app.post("/registerUser", async (req, res) => {
    const { name, email, password, phone_number } = req.body;
    // console.log(req.body);
    console.log(name,email);
    try {
        const newUser = await User.create({
            name,
            email,
            password,
            phone_number
        });
        res.status(201).send("User created successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while creating user");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const findUser = await User.findOne({ where: { email } });
        if (findUser) {
            const data = JSON.parse(JSON.stringify(findUser));
            if (data.password === password) {
                res.status(200).send("Logged in successfully");
            } else {
                res.status(401).send("Invalid username or password");
            }
        } else {
            res.status(404).send("User does not exist, kindly register");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred during login");
    }
});

app.post("/registerRestaurant", async (req, res) => {
    const { rest_name, rest_address, rest_rating, rest_status, rest_phone } = req.body;
    console.log(req.body);
    try {
        const newRestaurant = await Restaurant.create({
            rest_name,
            rest_address,
            rest_rating,
            rest_status,
            rest_phone
        });
        res.status(201).send("Restaurant added successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while adding restaurant");
    }
});

app.post("/addmenu", async (req, res) => {
    const {
        restaurant_id,
        item_name,
        item_price,
        item_description,
        item_availability,
        is_veg,
        item_rating
    } = req.body;

    try {
        const newItem = await Menu.create({
            restaurant_id,
            item_name,
            item_price,
            item_description,
            item_availability,
            is_veg,
            item_rating
        });
        res.status(201).send("Menu item added successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while adding menu item");
    }
});

app.post('/createdOrder', async (req, res) => {
    const { id, order_status, item_id, quantity, price, payment_method } = req.body;

    try {
        const newOrder = await Order_details.create({
            id,
            order_status,
            item_id,
            quantity,
            price,
            payment_method
        });

        if (newOrder) {
            try {
                const restaurant_id_data = await Menu.findByPk(item_id);
                if (!restaurant_id_data) {
                    return res.status(404).send("Menu item not found");
                }

                const restaurant_id = restaurant_id_data.restaurant_id;

                const order_id = newOrder.order_id;
                const createOrder = await Order.create({
                    order_id,
                    restaurant_id,
                    item_id,
                    id,
                    order_status
                });

                res.status(200).send("Order placed successfully");
            } catch (err) {
                console.log(err);
                res.status(500).send("Error occurred while creating order");
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred, please try again");
    }
});
