// src/utils/database.utils.ts
import { QueryRunner } from "typeorm";
import { AppDataSource } from "../config/database";

export class DatabaseUtils {
    // Test database connection
    static async testConnection(): Promise<boolean> {
        try {
            await AppDataSource.query('SELECT 1');
            return true;
        } catch (error) {
            console.error('Database connection test failed:', error);
            return false;
        }
    }

    // Get database transaction
    static async getTransaction(): Promise<QueryRunner> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }

    // Perform database health check
    static async healthCheck(): Promise<{
        status: string;
        message: string;
        timestamp: Date;
    }> {
        try {
            const isConnected = await this.testConnection();
            return {
                status: isConnected ? 'healthy' : 'unhealthy',
                message: isConnected ? 'Database connection successful' : 'Database connection failed',
                timestamp: new Date(),
            };
        } catch (error) {
            return {
                status: 'error',
                message: 'Database health check failed',
                timestamp: new Date(),
            };
        }
    }
}