
-- Connect to PostgreSQL and create database
CREATE DATABASE ecommerce;

-- Connect to the ecommerce database
\c ecommerce;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    tag VARCHAR(100) NOT NULL,
    category_id INTEGER REFERENCES category(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamp
CREATE TRIGGER update_product_updated_at
    BEFORE UPDATE ON product
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_category_updated_at
    BEFORE UPDATE ON category
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO category (name) VALUES
    ('Electronics'),
    ('Clothing'),
    ('Books'),
    ('Home & Garden'),
    ('Sports');

-- Insert sample products
INSERT INTO product (name, price, description, image_url, tag, category_id) VALUES
    ('iPhone 13', 999.99, 'Latest Apple smartphone', 'https://example.com/iphone13.jpg', 'electronics', 1),
    ('Samsung TV', 799.99, '55-inch 4K Smart TV', 'https://example.com/samsung-tv.jpg', 'electronics', 1),
    ('Running Shoes', 89.99, 'Professional running shoes', 'https://example.com/shoes.jpg', 'sports', 5),
    ('Garden Tools Set', 149.99, 'Complete garden maintenance kit', 'https://example.com/garden-tools.jpg', 'home', 4),
    ('Python Programming Book', 49.99, 'Learn Python programming', 'https://example.com/python-book.jpg', 'books', 3),
    ('T-Shirt', 24.99, 'Cotton casual t-shirt', 'https://example.com/tshirt.jpg', 'clothing', 2);

-- Create index for better search performance
CREATE INDEX idx_product_name ON product USING GIN (to_tsvector('english', name));
CREATE INDEX idx_product_tag ON product(tag);
CREATE INDEX idx_product_price ON product(price);
