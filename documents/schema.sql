SET FOREIGN_KEY_CHECKS = 0;
DROP SCHEMA IF EXISTS `restaurant-management-web-application`;
CREATE SCHEMA `restaurant-management-web-application`;
USE `restaurant-management-web-application`;

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
INSERT INTO `account` 
VALUES 
  (
    1, 'Somsri_Roksuay', 'Somsri5134', 
    'employee', 'Somsri', 'Roksuay', '0235323476'
  ), 
  (
    2, 'Somsak_Nokaew', 'Somsak2321', 
    'employee','Somsak', 'Nokaew', '0909012321'
  ),
  (
	3, 'Sukron_Muu', 'Sukron4234',
    'member', 'Sukron', 'Muu', '0612212258'
  ),
  (
	4,'Kasem_Saard', 'Kasem213',
    'member', 'Kasem', 'Saard', '0816522855'
  );

DROP TABLE IF EXISTS `serviced_customer`;
CREATE TABLE `serviced_customer`(
	`serviced_id` INT(10) AUTO_INCREMENT,
    `account_id` INT(10),
    `check_in` DATETIME,
    `check_out` DATETIME,
    PRIMARY KEY (`serviced_id`),
    FOREIGN KEY `customer_member_id` (`account_id`)
    REFERENCES `customer_member`(`account_id`)
);
INSERT INTO `serviced_customer` 
VALUES 
  (1, null, "2022-02-02 15:24:36", "2022-01-02 18:47:21"), 
  (2, 3, "2022-04-06 16:43:24", "2022-04-06 17:47:31");

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
INSERT INTO `employee` 
VALUES 
  (
    1, 'chef', 6000.00, 'female', 
    'somsri234@gmail.com', '2020-04-06', '900/30 Bangpee Bangkok'
  ), 
  (
    2, 'service_staff', 4000.00, 'male', 
    'somkuan2123@gmail.com', '2020-03-02', '42/20 Samut Prakan'
  );

DROP TABLE IF EXISTS `customer_member`;
CREATE TABLE `customer_member` (
	`account_id` INT(10),
    `register_date` DATE,
    `expire_date` DATE,
    PRIMARY KEY (`account_id`),
    FOREIGN KEY `account_account_id` (`account_id`)
    REFERENCES `account`(`account_id`)
);
INSERT INTO `customer_member` 
VALUES 
  (
    3, '2022-04-04', '2022-05-04'
  ), 
  (
    4, '2022-04-08', '2022-05-08'
  );

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
	`order_id`  INT(10) AUTO_INCREMENT,
    `ordering_time` DATETIME,
    `served_time` DATETIME,
    `quantity_item` INT(10),
    `total_price` FLOAT(8, 2),
    `status` ENUM('created', 'pending', 'served', 'billing', 'completed') NOT NULL,
    `serviced_id` INT(10) NOT NULL,
    `table_id` INT(10) NOT NULL,
    PRIMARY KEY (`order_id`),
    FOREIGN KEY `serviced_customer_id` (`serviced_id`)
    REFERENCES `serviced_customer`(`serviced_id`),
    FOREIGN KEY `table_table_id` (`table_id`)
    REFERENCES `table`(`table_id`)
);
INSERT INTO `order` 
VALUES 
   (
	1, '2022-02-02 15:42:54', '2022-02-02 16:22:52',
    6, 700, 'completed', 1, 2
   ),
   (
    2, '2022-04-06 16:48:21', '2022-04-06 17:02:56',
	3, 225, 'completed', 2, 4
   );

DROP TABLE IF EXISTS `table`;
CREATE TABLE `table` (
	`table_id` INT(10) AUTO_INCREMENT,
    `status` ENUM('ready', 'not_ready') NOT NULL,
    PRIMARY KEY (`table_id`)
);
INSERT INTO `table` 
VALUES 
  (1, 'ready'), 
  (2, 'ready'), 
  (3, 'ready'), 
  (4, 'ready'), 
  (5, 'ready'), 
  (6, 'ready'), 
  (7, 'ready'), 
  (8, 'ready'),
  (9, 'ready'), 
  (10, 'ready'), 
  (11, 'ready'), 
  (12, 'ready'),
  (13, 'ready'),
  (14, 'ready'),
  (15, 'ready');

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
INSERT INTO `order_item` 
VALUES 
  (1, 100.00, 4, 400.00, 1, 1),
  (2, 150.00, 2, 300.00, 1, 2),
  (3, 65.00, 1, 65.00, 2, 1),
  (4, 80.00, 2, 160.00, 2, 3);

DROP TABLE IF EXISTS `receipt`;
CREATE TABLE `receipt` (
	`receipt_id` INT(10) AUTO_INCREMENT,
    `create_date` DATETIME,
    `receipt_no` CHAR(10) UNIQUE,
    `order_id` INT(10) NOT NULL,
    PRIMARY KEY (`receipt_id`),
    FOREIGN KEY `receipt_order_order_id` (`order_id`)
    REFERENCES `order`(`order_id`)
);
INSERT INTO `receipt` 
VALUES 
  (
    1, '2022-01-02 18:47:21', 
    '6451845751', 1
  ), 
  (
    2, '2022-04-06 17:47:31', 
    '2254815495', 2
  );
  
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
	`menu_id` INT(10) AUTO_INCREMENT,
    `menu_name` VARCHAR(255),
    `menu_price` FLOAT(8, 2),
    `menu_status` ENUM('ready', 'not_ready', 'deleted'),
    `create_date` DATE,
    `image_file_path` VARCHAR(255),
    `member_price` FLOAT(8, 2),
    `delete_date` DATE,
    PRIMARY KEY (`menu_id`)
);
INSERT INTO `menu` 
VALUES 
  (
    1, 'Cup of Ice', 3.00, 'ready', '2020-04-02', '/images/menu_1651596019878_glass-with-ice-soda-cup-q1yMx63-600.jpg', null, null
  ), 
  (
    2, 'Coca Cola', 19.00, 'ready', '2020-04-03', '/images/menu_1651595954493_coke-soda-q13q2x2-600.jpg', null, null
  ), 
  (
    3, 'Parmesan Spaghetti', 140.00, 'ready', '2020-04-03', '/images/menu_1651595932850_294-2948315_spagetti-aglio-olio-spaghetti-aglio-e-olio.png', 130.00, null 
  ),
  (
    4, 'Mixed Cheese Burger (Checken, meat, beacon)', 289.00, 'ready', '2020-04-03', '/images/menu_1651595658587_burger_sandwich_PNG4135.png', null, null 
  ),
  (
    5, 'Pizza with Pepper Roni & Mushroom', 479.00, 'ready', '2020-04-04', '/images/menu_1651595767583_delicious-italian-food_1147-165.png', 419.00, null
  ), 
  (
    6, 'French Fries', 79.00, 'ready', '2020-04-04', '/images/menu_1651595810068_585abfc54f6ae202fedf2935.png', null, null
  ), 
  (
    7, 'Mixed Salad With Chicken Breast', 90.00, 'ready', '2020-04-05', '/images/menu_1651595877196_grilled-chicken-salad-png-19.png', 75.00, null
  );

DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
	`token_id` INT(10) AUTO_INCREMENT,
    `token` VARCHAR(255) UNIQUE,
    `start_date` DATETIME,
    `end_date` DATETIME,
    `account_id` INT(10) NOT NULL,
    PRIMARY KEY (`token_id`),
    FOREIGN KEY `account_account_id` (`account_id`)
    REFERENCES `account`(`account_id`)
);

SET FOREIGN_KEY_CHECKS = 1;