import express from 'express';
import userRoutes from './routes/user.js';
import recruiterRoutes from './routes/recruiter.js';
import companyRoutes from './routes/company.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.connect(process.env.DBURI);

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/recruiter", recruiterRoutes);
app.use("/company", companyRoutes);