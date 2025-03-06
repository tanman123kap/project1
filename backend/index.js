const express = require("express");
const mongoose = require("mongoose");
const proModel = require("./model/project.model");
const cors = require("cors");
const app = express();

app.use(cors(
    {
        origin: ["https://project1-lpbh.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());

app.get("/", async (req, res) => {
    res.json("app");
});

app.post("/entry", async (req, res) => {
    try {
        const { _id, date, amount, status } = req.body;
        const entryData = {
            _id: Number(_id),
            date: new Date(date),
            amount: Number(amount),
            status: String(status)
        };
        const data = await proModel.create(entryData);
        if(data) {
            res.status(201).json(data);
        } else {
            res.status(404).json("provide data");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

app.post("/show", async (req, res) => {
    try {
        const { _id, date1, date2, amount1, amount2, status } = req.body;
        const query = {};

        if (_id) query._id = Number(_id);
        if (date1 && date2) {
            query.date = { $gte: new Date(date1), $lte: new Date(date2) };
        };
        if (amount1 && amount2) {
            query.amount = { $gte: amount1, $lte: amount2 };
        };
        if (status) query.status = String(status);

        // Fetch data from database
        const data = await proModel.find(query);
        if(data.length !== 0) {
            res.status(200).json(data);
            console.log(query.length, query);
        } else {
            res.status(404).json("Not found")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

mongoose.connect("mongodb+srv://tanu1829asdf:tamanna.2003@project1.xelrw.mongodb.net/entry?retryWrites=true&w=majority&appName=Project1").then(() => {
    console.log("database connected...");
    app.listen(5000, () => {
        console.log("Server live at port 5000...");
    });
});