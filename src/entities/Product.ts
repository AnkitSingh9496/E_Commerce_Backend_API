import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Category } from "./Category";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    name!: string;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price!: number;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    description?: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsString()
    image_url?: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    tag!: string;

    @ManyToOne(() => Category, category => category.products, { nullable: true })
    @JoinColumn({ name: 'category_id' }) 
    category?: Category;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
