import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`mongodb+srv://luis:${process.env.DATABASE_PASSWORD}@cursonode-r2590.mongodb.net/apicommerce?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
