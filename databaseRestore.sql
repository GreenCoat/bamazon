DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL(10,2),
	stock_quantity INTEGER(11),
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Banana", "Food", 2.00, 20),
("Bread", "Food", 1.50, 25),
("Apples", "Food", 1.00, 30),
("Limes", "Food", .20, 50),
("Cookies", "Food", 4.00, 10),
("Ear Buds", "Electronics", 5.00, 15),
("Headphones", "Electronics", 25.00, 10),
("Game", "Electronics", 60.00, 10),
("Phone Case", "Electronics", 4.00, 15),
("USB Cable", "Electronics", 2.00, 15);