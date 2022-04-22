SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `web-database`;
CREATE SCHEMA `web-database`;
USE `web-database`;

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account`(
	`account_id` INT(10) AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `type` ENUM('employee', 'member') NOT NULL,
    `fname` VARCHAR(255) NOT NULL,
    `lname` VARCHAR(255) NOT NULL,
    `phone_number` CHAR(10) NOT NULL,
    PRIMARY KEY (`account_id`)
);


DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`(
	`customer_id` INT(10) AUTO_INCREMENT,
    `type` ENUM('member', 'normal'),
    `check_in` DATETIME,
    `check_out` DATETIME,
    PRIMARY KEY (`customer_id`)
);


DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
	`account_id` INT(10),
    `role` ENUM('chef', 'waitress', 'service_staff', 'cleaner') NOT NULL,
    `salary` FLOAT(8, 2),
    `gender` ENUM('male', 'female') NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `hire_date` DATE,
    `address` VARCHAR(255),
    PRIMARY KEY (`account_id`),
    FOREIGN KEY `account_account_id` (`account_id`)
    REFERENCES `account`(`account_id`)
);


DROP TABLE IF EXISTS `customer_member`;
CREATE TABLE `customer_member` (
	`account_id` INT(10),
    `customer_id` INT(10),
    `expire_date` DATE,
    `register_date` DATE,
    PRIMARY KEY (`account_id`, `customer_id`),
    FOREIGN KEY `account_account_id` (`account_id`)
    REFERENCES `account`(`account_id`),
    FOREIGN KEY `customer_customer_id` (`customer_id`)
    REFERENCES `customer`(`customer_id`)
);


DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
	`order_id`  INT(10) AUTO_INCREMENT,
    `ordering_time` DATETIME,
    `served_time` DATETIME,
    `quantity_item` INT(10),
    `total_price` FLOAT(8, 2),
    `status` ENUM('created', 'pending', 'served', 'completed') NOT NULL,
    `customer_id` INT(10) NOT NULL,
    `table_id` INT(10) NOT NULL,
    PRIMARY KEY (`order_id`),
    FOREIGN KEY `customer_customer_id` (`customer_id`)
    REFERENCES `customer`(`customer_id`),
    FOREIGN KEY `table_table_id` (`table_id`)
    REFERENCES `table`(`table_id`)
);


DROP TABLE IF EXISTS `table`;
CREATE TABLE `table` (
	`table_id` INT(10) AUTO_INCREMENT,
    `status` ENUM('ready', 'not_ready') NOT NULL,
    PRIMARY KEY (`table_id`)
);


DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item` (
	`item_no` INT(10) AUTO_INCREMENT,
    `price` FLOAT(8, 2),
    `amount` INT(10),
    `total_price` FLOAT(8, 2),
    `order_id` INT(10),
    `menu_id` INT(10) NOT NULL,
    PRIMARY KEY (`item_no`, `order_id`),
    FOREIGN KEY `order_order_id` (`order_id`)
    REFERENCES `order`(`order_id`),
    FOREIGN KEY `menu_menu_id` (`menu_id`)
    REFERENCES `menu`(`menu_id`)
);


DROP TABLE IF EXISTS `receipt`;
CREATE TABLE `receipt` (
	`receipt_id` INT(10) AUTO_INCREMENT,
    `total_price` FLOAT(8, 2),
    `create_date` DATETIME,
    `receipt_no` CHAR(10) UNIQUE,
    `order_id` INT(10) NOT NULL,
    PRIMARY KEY (`receipt_id`),
    FOREIGN KEY `receipt_order_order_id` (`order_id`)
    REFERENCES `order`(`order_id`)
);


DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
	`menu_id` INT(10) AUTO_INCREMENT,
    `menu_name` VARCHAR(255),
    `menu_price` FLOAT(8, 2),
    `menu_status` ENUM('ready', 'not_ready'),
    `create_date` DATETIME,
    `image_file_path` VARCHAR(255),
    `member_price` FLOAT(8, 2),
    PRIMARY KEY (`menu_id`)
);


SET FOREIGN_KEY_CHECKS = 1;