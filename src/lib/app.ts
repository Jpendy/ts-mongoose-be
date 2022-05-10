import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error";
import notFound from "./middleware/not-found";
import authRoutes from './routes/auth';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/auth', authRoutes)

app.use(notFound)
app.use(errorHandler)

export default app;
