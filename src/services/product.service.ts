// src/services/product.service.ts
import { Repository } from "typeorm";
import { Product } from "../entities/Product";
import { AppDataSource } from "../config/database";
import { CreateProductDto, ProductFilters, UpdateProductDto, PaginatedResponse } from "../types/product.types";
import { validate } from "class-validator";

export class ProductService {
    private productRepository: Repository<Product>;

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product);
    }

    async findAll(filters: ProductFilters): Promise<PaginatedResponse<Product>> {
        try {
            console.log("Filters received:", filters); // Debugging
        
            const { tag, minPrice, maxPrice, search, page = 1, limit = 10 } = filters;
            
            const queryBuilder = this.productRepository.createQueryBuilder("product")
                .leftJoinAndSelect("product.category", "category"); // Only one join here
        
            if (tag) {
                queryBuilder.andWhere("product.tag = :tag", { tag });
            }
        
            if (minPrice !== undefined) {
                queryBuilder.andWhere("product.price >= :minPrice", { minPrice });
            }
        
            if (maxPrice !== undefined) {
                queryBuilder.andWhere("product.price <= :maxPrice", { maxPrice });
            }
        
            if (search) {
                queryBuilder.andWhere("LOWER(product.name) LIKE LOWER(:search)", { search: `%${search}%` });
            }
        
            const total = await queryBuilder.getCount();
            const totalPages = Math.ceil(total / limit);
            const offset = (page - 1) * limit;
        
            console.log("Executing query..."); // Debugging
            const products = await queryBuilder
                .skip(offset)
                .take(limit)
                .getMany();
            console.log("Products found:", products); // Debugging
        
            return {
                data: products,
                metadata: {
                    currentPage: page,
                    totalPages,
                    totalProducts: total,
                    limit
                }
            };
        } catch (error) {
            console.error("Error in findAll:", error); // Log the actual error
            throw error;
        }
    }
    
    

    async findById(id: number): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { id },
            relations: ["category"]
        });
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(productDto);
        
        const errors = await validate(product);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.toString()}`);
        }

        return this.productRepository.save(product);
    }

    async update(id: number, productDto: UpdateProductDto): Promise<Product> {
        const product = await this.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }

        Object.assign(product, productDto);
        
        const errors = await validate(product);
        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.toString()}`);
        }

        return this.productRepository.save(product);
    }

    async delete(id: number): Promise<void> {
        const result = await this.productRepository.delete(id);
        if (result.affected === 0) {
            throw new Error("Product not found");
        }
    }
}