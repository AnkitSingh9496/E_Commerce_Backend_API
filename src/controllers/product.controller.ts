// // src/controllers/product.controller.ts
// import { Request, Response } from "express";
// import { ProductService } from "../services/product.service";
// import { CreateProductDto, ProductFilters, UpdateProductDto } from "../types/product.types";

// export class ProductController {
//     private productService: ProductService;

//     constructor() {
//         this.productService = new ProductService();
//     }

//     async getProducts = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const filters: ProductFilters = {
//                 tag: req.query.tag as string,
//                 minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
//                 maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
//                 search: req.query.search as string,
//                 page: req.query.page ? Number(req.query.page) : 1,
//                 limit: req.query.limit ? Number(req.query.limit) : 10
//             };

//             const products = await this.productService.findAll(filters);
//             res.json(products);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     };

//     async getProductById = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const id = Number(req.params.id);
//             const product = await this.productService.findById(id);
            
//             if (!product) {
//                 res.status(404).json({ message: "Product not found" });
//                 return;
//             }
            
//             res.json(product);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     };

//     async createProduct = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const productDto: CreateProductDto = req.body;
//             const product = await this.productService.create(productDto);
//             res.status(201).json(product);
//         } catch (error) {
//             if (error instanceof Error) {
//                 res.status(400).json({ message: error.message });
//             } else {
//                 res.status(500).json({ message: "Internal server error" });
//             }
//         }
//     };

//     async updateProduct = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const id = Number(req.params.id);
//             const productDto: UpdateProductDto = req.body;
//             const product = await this.productService.update(id, productDto);
//             res.json(product);
//         } catch (error) {
//             if (error instanceof Error) {
//                 if (error.message === "Product not found") {
//                     res.status(404).json({ message: error.message });
//                 } else {
//                     res.status(400).json({ message: error.message });
//                 }
//             } else {
//                 res.status(500).json({ message: "Internal server error" });
//             }
//         }
//     };

//     async deleteProduct = async (req: Request, res: Response): Promise<void> => {
//         try {
//             const id = Number(req.params.id);
//             await this.productService.delete(id);
//             res.status(204).send();
//         } catch (error) {
//             if (error instanceof Error && error.message === "Product not found") {
//                 res.status(404).json({ message: error.message });
//             } else {
//                 res.status(500).json({ message: "Internal server error" });
//             }
//         }
//     };
// }



// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { CreateProductDto, ProductFilters, UpdateProductDto } from "../types/product.types";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    getProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            const filters: ProductFilters = {
                tag: req.query.tag as string,
                minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
                maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
                search: req.query.search as string,
                page: req.query.page ? Number(req.query.page) : 1,
                limit: req.query.limit ? Number(req.query.limit) : 10
            };

            const products = await this.productService.findAll(filters);
            res.json(products);
        } catch (error) {
            console.error("Error in getProducts:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    getProductById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.findById(id);
            
            if (!product) {
                 res.status(404).json({ message: "Product not found" });
            }
            
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    createProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const productDto: CreateProductDto = req.body;
            const product = await this.productService.create(productDto);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : "Internal server error" });
        }
    };

    updateProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            const productDto: UpdateProductDto = req.body;
            const product = await this.productService.update(id, productDto);
            res.json(product);
        } catch (error) {
            res.status(error instanceof Error && error.message === "Product not found" ? 404 : 400).json({ message: error instanceof Error ? error.message : "Internal server error" });
        }
    };

    deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = Number(req.params.id);
            await this.productService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(error instanceof Error && error.message === "Product not found" ? 404 : 500).json({ message: error instanceof Error ? error.message : "Internal server error" });
        }
    };
}