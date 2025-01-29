// src/config/database.ts
import { DataSource } from "typeorm";
import { Product } from "../entities/Product";
import { Category } from "../entities/Category";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS,
    database: process.env.DB_NAME || "ecommerce",
    synchronize:false, // Set to false in production
    logging: process.env.NODE_ENV === "development",
    
    entities: [Product, Category],
    migrations: ["src/migrations/*.ts"],
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Database connection function
export const initializeDatabase = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log("Database has been initialized!");
    } catch (error) {
        console.error("Error during database initialization:", error);
        throw error;
    }
};