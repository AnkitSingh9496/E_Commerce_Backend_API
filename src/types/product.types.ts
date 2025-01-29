// src/types/product.types.ts
export interface CreateProductDto {
    name: string;
    price: number;
    description?: string;
    categoryId?: number;
    image_url?: string;
    tag: string;
}

export interface UpdateProductDto extends Partial<CreateProductDto> {}

export interface ProductFilters {
    tag?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginationMetadata {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    metadata: PaginationMetadata;
}