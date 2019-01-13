-- This is the code that was used in MySQL

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('dell laptop','computers',500.00,50);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('washer','home',500.00,10);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('apple watch','wearables',450.00,25);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('fitbit watch','wearables',150.00,100);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('crayons','school',10.00,50);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('tide detergent','cleaning supplies',4.00,30);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('white curtain','home',20.00,35);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('softner','cleaning supplies',7.00,45);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('iphone xr','phones',750.00,25);

INSERT INTO products (product_name,department_name,price,stock_quantity)
VALUES('raisins','snacks',1.50,100);