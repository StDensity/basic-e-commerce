import express from "express";
import db from "./db/connection.js";
import cartRouter from "./routes/cartRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
db();

const app = express();

// TO enable cross origin resource sharing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/users`, userRouter);
app.use(`/api/cart`, cartRouter);
app.use(`/api/products`, productRouter);
app.use(`/api/orders`, orderRouter);
app.use(`/api/account`, authRouter);

app.listen(3000);
