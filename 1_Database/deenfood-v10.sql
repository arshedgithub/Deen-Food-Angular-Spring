-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: deenfood
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Prima'),(2,'Harischandra'),(3,'Marina'),(4,'Lakulunu'),(5,'Fortune'),(6,'Bakersville'),(7,'Star'),(8,'Mauripan'),(9,'Wijaya');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customerstatus`
--

DROP TABLE IF EXISTS `customerstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customerstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customerstatus`
--

LOCK TABLES `customerstatus` WRITE;
/*!40000 ALTER TABLE `customerstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `customerstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Admin');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` char(4) DEFAULT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `callingname` varchar(45) DEFAULT NULL,
  `photo` longblob,
  `gender_id` int NOT NULL,
  `dobirth` date DEFAULT NULL,
  `nic` char(12) DEFAULT NULL,
  `address` text,
  `mobile` char(10) DEFAULT NULL,
  `land` char(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `emptype_id` int NOT NULL,
  `designation_id` int NOT NULL,
  `doassignment` date DEFAULT NULL,
  `description` text,
  `empstatus_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_gender_idx` (`gender_id`),
  KEY `fk_employee_designation1_idx` (`designation_id`),
  KEY `fk_employee_empstatus1_idx` (`empstatus_id`),
  KEY `fk_employee_emptype1_idx` (`emptype_id`),
  CONSTRAINT `fk_employee_designation1` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`id`),
  CONSTRAINT `fk_employee_empstatus1` FOREIGN KEY (`empstatus_id`) REFERENCES `empstatus` (`id`),
  CONSTRAINT `fk_employee_emptype1` FOREIGN KEY (`emptype_id`) REFERENCES `emptype` (`id`),
  CONSTRAINT `fk_employee_gender` FOREIGN KEY (`gender_id`) REFERENCES `gender` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'2180','Arshed Ahmed','Arshed',_binary 'data:image/jpeg;base64,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',1,'2001-10-08','200128202020','99c Makuluwa','0760060474','','arshed@gma.cm',1,1,'2024-08-06','some ',1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empstatus`
--

DROP TABLE IF EXISTS `empstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empstatus`
--

LOCK TABLES `empstatus` WRITE;
/*!40000 ALTER TABLE `empstatus` DISABLE KEYS */;
INSERT INTO `empstatus` VALUES (1,'Assigned'),(2,'Unassigned'),(3,'Suspended'),(4,'Resignation');
/*!40000 ALTER TABLE `empstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emptype`
--

DROP TABLE IF EXISTS `emptype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emptype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emptype`
--

LOCK TABLES `emptype` WRITE;
/*!40000 ALTER TABLE `emptype` DISABLE KEYS */;
INSERT INTO `emptype` VALUES (1,'Permanent'),(2,'Volunteer'),(3,'Contract');
/*!40000 ALTER TABLE `emptype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Male'),(2,'Female'),(3,'Other');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grn`
--

DROP TABLE IF EXISTS `grn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grn` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grnnumber` varchar(45) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `grand_total` decimal(10,2) DEFAULT NULL,
  `grnstatus_id` int NOT NULL,
  `purchaseorder_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_grn_grnstatus1_idx` (`grnstatus_id`),
  KEY `fk_grn_purchaseorder1_idx` (`purchaseorder_id`),
  KEY `fk_grn_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_grn_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_grn_grnstatus1` FOREIGN KEY (`grnstatus_id`) REFERENCES `grnstatus` (`id`),
  CONSTRAINT `fk_grn_purchaseorder1` FOREIGN KEY (`purchaseorder_id`) REFERENCES `purchaseorder` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grn`
--

LOCK TABLES `grn` WRITE;
/*!40000 ALTER TABLE `grn` DISABLE KEYS */;
INSERT INTO `grn` VALUES (9,'3902','2024-08-09','wopef',37500.00,1,1,1),(12,' 3948o','2024-08-11','dkjgl',80000.00,1,1,1);
/*!40000 ALTER TABLE `grn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grnitem`
--

DROP TABLE IF EXISTS `grnitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grnitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unitcost` decimal(10,2) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `linecost` decimal(10,2) NOT NULL,
  `grn_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`id`,`linecost`),
  KEY `fk_grnitem_grn1_idx` (`grn_id`),
  KEY `fk_grnitem_ingredient1_idx` (`ingredient_id`),
  CONSTRAINT `fk_grnitem_grn1` FOREIGN KEY (`grn_id`) REFERENCES `grn` (`id`),
  CONSTRAINT `fk_grnitem_ingredient1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grnitem`
--

LOCK TABLES `grnitem` WRITE;
/*!40000 ALTER TABLE `grnitem` DISABLE KEYS */;
INSERT INTO `grnitem` VALUES (24,750.00,50.00,37500.00,9,2),(25,800.00,100.00,80000.00,12,2);
/*!40000 ALTER TABLE `grnitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grnstatus`
--

DROP TABLE IF EXISTS `grnstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grnstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grnstatus`
--

LOCK TABLES `grnstatus` WRITE;
/*!40000 ALTER TABLE `grnstatus` DISABLE KEYS */;
INSERT INTO `grnstatus` VALUES (1,'Pending'),(4,'Approved'),(5,'Recieved'),(6,'Closed');
/*!40000 ALTER TABLE `grnstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingcategory`
--

DROP TABLE IF EXISTS `ingcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingcategory`
--

LOCK TABLES `ingcategory` WRITE;
/*!40000 ALTER TABLE `ingcategory` DISABLE KEYS */;
INSERT INTO `ingcategory` VALUES (1,'Rice flour'),(2,'Coconut oil'),(3,'Salt'),(4,'Vegetables'),(5,'Food Extracts & Essence'),(6,'Food Coloring'),(7,'Spice');
/*!40000 ALTER TABLE `ingcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingcategorybrand`
--

DROP TABLE IF EXISTS `ingcategorybrand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingcategorybrand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ingcategory_id` int NOT NULL,
  `brand_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ingcategory_has_brand_brand1_idx` (`brand_id`),
  KEY `fk_ingcategory_has_brand_ingcategory1_idx` (`ingcategory_id`),
  CONSTRAINT `fk_ingcategory_has_brand_brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_ingcategory_has_brand_ingcategory1` FOREIGN KEY (`ingcategory_id`) REFERENCES `ingcategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingcategorybrand`
--

LOCK TABLES `ingcategorybrand` WRITE;
/*!40000 ALTER TABLE `ingcategorybrand` DISABLE KEYS */;
INSERT INTO `ingcategorybrand` VALUES (1,1,1),(2,1,2),(3,2,3),(4,3,4),(5,2,1),(6,2,5),(7,5,6),(8,5,7),(9,5,8),(10,6,6),(11,6,7),(12,7,9);
/*!40000 ALTER TABLE `ingcategorybrand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ingcategory_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `photo` longblob,
  `unittype_id` int NOT NULL,
  `qoh` decimal(9,2) DEFAULT NULL,
  `rop` decimal(9,2) DEFAULT NULL,
  `cost` decimal(7,2) DEFAULT NULL,
  `ingstatus_id` int NOT NULL,
  `dointroduced` date DEFAULT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ingredient_unittype1_idx` (`unittype_id`),
  KEY `fk_ingredient_ingcategory1_idx` (`ingcategory_id`),
  KEY `fk_ingredient_ingstatus1_idx` (`ingstatus_id`),
  KEY `fk_ingredient_brand1_idx` (`brand_id`),
  KEY `fk_ingredient_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_ingredient_brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
  CONSTRAINT `fk_ingredient_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_ingredient_ingcategory1` FOREIGN KEY (`ingcategory_id`) REFERENCES `ingcategory` (`id`),
  CONSTRAINT `fk_ingredient_ingstatus1` FOREIGN KEY (`ingstatus_id`) REFERENCES `ingstatus` (`id`),
  CONSTRAINT `fk_ingredient_unittype1` FOREIGN KEY (`unittype_id`) REFERENCES `unittype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,1,1,'Prima Rice Flour 1kg','some desc',_binary 'data:image/jpeg;base64,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',3,2810.00,20.00,10.00,1,'2024-08-05',1),(2,2,3,'Marina Coconut Oil 1l','coconut oil most using ',_binary 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDABoSExcTEBoXFRcdGxofJ0AqJyMjJ084PC9AXVJiYVxSWllndJR+Z22Mb1laga+CjJmepqemZHy2w7ShwZSjpp//2wBDARsdHSciJ0wqKkyfalpqn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5//wgARCAImAu4DASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/2gAMAwEAAhADEAAAAeIG0QPeV4qdGidWUqYodOnWXPmoJQpzp1KeRH2OU4n9Bjk6GaVydY2xNiaCUyQn1GuJe3ns5enneX0Sjm2AcMHYQrIw2GDtq2wMhYBOBjgBsKHxMVyRFgS1AJmwu2MC5PWBLMAHYxwDhg7Y06CVXDViDHmmdM6V1MpdMVKErOj1z0YRV0fWRkidMedgmYlsiYekmL6LWVebDldTaRhzIlELHJuhrDgBHTLbQZK5HFYE2VjEECOAnasuMYjUcCBX0bYUQqXNdNhsuMj4RjjbEAbA2wNiAMABsIKYitlEOxzrZeHfnNZ2ZkFjWjQthio0rOiPPgAzV0BhjLFANZR5NLVzSxKxUpovD5ZrdhXWZY6jPYZleAEEt9jYjkB2wVZRsNYcJy13LU0OhJZ0WoXU6yRgMVIUfWRbLctl1NsZQSkrGbqQiRTMm8HAm2wcANgZcRpSQZeMzPPoxVoRavXGeqIxWdjAdEsaUChSqABB0w1DlVLGTnRpaGMZFQtROhr0FaFnQEpQRykiRLMES1dH1GysmI0rIdAUGpmmMjCmTPEL8/QHMLDhgMNKSjBhaaB4suGeXK+swQK/L1zlTo5Xsctt8121mOeFYmaGYS4z0vCAuNsUxYRB1JCoOieKzBpNN0yuSWIEZiSoxqdZFKyahDrrrBjlAlPN65VUiLNLJzrHCCxRRJWpM6lDMo4VpSwSxp0kWHNjpHKJeo8lh3TWOwWwkJK5RpSMwYUhYZ9IWYo0JZBYeboMvJeazXSJ1RehG1kBGMuoc7VaWb5bEn0LjXnZVV1RaqJCy754Wp0slptRKrpQu0ZWYQgUULIQO2wsgquVkCUiqYnG7IwuZVhpaOj2O03syOCbI0uO1OEe5Jwp1UGwXN6FI1FBEHAVQKSVKpmrVXRJFbVWhE1XJs0S0+e0s2sIbQvZHWaV0WdllnUWdRKlUepT6BiwthU04d0x2LzsOrEqgMPNyqztgxrpZCuJs6ywrkSmNLGZQERK9BkyFNprHbKmR7FmxlzTYcrrHCgYKIoJaqIAM8mqqg2UmwiqodSgOAQRsMMoY0mQQtlmDWVM0zokXs4T2c2N1vzNrN5TtGFuKrV4qy9AVtZ2YGGECPVzym3GZfLDDpgHYwIMRhsAO0sXbmJ1txY7380npP5WPX3kuelPjJ06DD1iSom8WEyWCkXOZZO2hDjKq1RAdOHCYplK4MJQVBcybUDJosZbWatA1XIo6wy0mpCtLLy06cJsAx6FDbk6hgw1mTOkvO2TOqtMjhHM88jQtlnSaHQ/J0WeHiNZ22BjgbY22NtjbY22NtjbY22NtjOLBZskZ2ghMwXbmy9jcOr0W8wnqv4+PabxGPa3jUPV3nE7tyOdAm8oFGiIvjmXsEvEezRIVWkanPZy6753y9dmuYuRYwBqZEI6KRmvWEYqeaw88hE1GNFpRrqbg6i6wvczJnnVk5aBnYy+QDuvMbaNtq22NtjbYG2McTA6FBFYgm2yNfnJ1jnVXjsgxxtsbbGwwcMEbG2wdsbbUcMMUxZufHW3Fj0H8zHqt5OPZPjE9k+R0HpmbDKUBoYrMkRm0cz3CiqYnVdLNK6Wa1XOkqGkwodRUo8vIeucqPDoPGw3XntgHDGwwcMEDBwwSpGykwITEE2xAGAp2NiDYhdtk22BtjbY22NsQbEBGMQTbY22BtjbYIONtjEY9Hs8InuQ8sWOoylp4s/KTrfjKdp4Sd7ebj1D5ZPTPmFfSPnMd443OvcxOgwMtVUx5N5+nby8vp8Ry7ZkYkLejQ8pPS5Tm1cS15Ck4GIMQwTiKrKq45NiRcwFxBtsYHAOAcCbbG2xtsbbG2IMcDEAOxscDEAxxtgHbVtsYbRtsZlw5RrGDEnmANsAMAbZSVw5nizc5Ker4ndL2+d0+cAjWMy0j1Wbc9Sku1KWm1dCyWxef0iePH3oHjHq6zzG70jhn3svmn0lOFurJyjqSznFUEzZFzAAbAzYXNhM+VM4FzYXPhQ+VM+Ez4TPhM2FDknrEgaIAEVgdAIIMcZg1UotklLpkSDChjoXHC44GIAdgVSgqUkbbDOjS+08a+bfNz9Uu2VdO2pQrA6OnmrZQRSr6NBn8+J6252MoMr0jWxsSTnbJKfWF4V7yeWnrhPGX2geJvZQ8nelJOIdSrz6igwyHAmIykjBIwSGDeXStGxVIdU04JdcUiKrZMVxLVKzalJTbPU+fp5kjhqOGjbYGINtgY4FeclJbB2K5lePSasvN0mODq757YT5kt0NMSXPWujqkc6s/KM3q8T0ebWeano9Op5A9lTyW9GQl+Hls9zeGx728ix6J4+obbUNsbbBBwAwEWoiEumZzJ3MvmJ62Txx7CnkH00PPN8S6JIei/l2O6XOgZBLHC5Gy4YqSlIuvS0MPytEUnpXmHoJLw6srnbY22Ntie1FnqiJnEFGvnVuPo4s16qmpuvn7JRwulm6pehLNSOe6c9IWb0o364XNkDyYoDrEj0hfK5Pf5DieNYSxSX1yj7yNsbHG2AQvNHWPMSX018vL6h8t5v0951LnuPNS5rMqjE4UNhFpiC9OOKXog8tfVU8oepM88eipwnqQiXFItcDr5umWuImocnVzXM8Rc7bG2x19IPLsM2sAaus83L6iR4zdUrJt1HOp9CGXj3pcth6IWxqfN6Ft54Oym3nEZDlA6ghKlTtkysDmemlSXRzy9ZhXWWGKggooeGNVMq2cPN63nyoKRz0ZLzsgWnc3XKuablGPMnbXztXpP5Rs9U+XrPTHn9KWBUwd1hrTjnkOezUZK6ljpegrpbFBZodGONe7JwHtxxbtBSYfl1L0O885rAs/JVKwOzrBlVABD9PD02J1RnZ1S4wvdbzbWdqxnZ0DlOb1NCljkGxipog4APFlgO1YboNnL0T5+e/QMa9MFdGLFTR4+nmmoowztabtTll6Z1jxx7EDzRV5rmFpRjqnM9Z2I9+1ODtdtziPYhz2PNzrdPM2pd/Nea7pC9nnj0dZJOjllpDs1nAl+azBnqbVwjMC1imdECMTleksemmsSPRJYomzTtOqPOkqK2UqXEZcjU5OizLWea3TxdB0FdvDHm6UcDkG5bSxvq64X64wbnRI5+fTpaXNZ1CK5vUeO9VGbWeKnVghVsppsMUJDk9SUvE3aSaPWPMVqY1z92aoN2y3hbc3SrATSySMuWVDlr0xzq551sflpOa7a8b2dPJ1U1nyR3chPEKhwPQE551aC6zsurayqLGWqFIkhhTvzdRXHZ0ofnLty1BKnPY3Rz1LdHF1JzNTmzrv517tZWoSyTCeaJlpe2qN155DxyvufcuomNTKs6tbn7y7c19c6zbWIjbOgItnTvDqsadeXWY9vm2xvoDTSV2trIWN7Y1Gy5242mqiCS9Kw6dZa8W1ntPJXWdw98M6lNhjo1ufWdrctGemYrrPm36icXF63nS0Urna9/B6m8aenWTbNE9JRBp3K9vD0V0IiZ26adzQZhWcLiBBrPoRseqwqkoXq5OxZQ6kjmoLS3UNvE+G0MdGDQleVeXQsDvJ9DitHVSFZFry1zpqB948432N2aXPrPRCNs6DdKk7RrYefUrkPRyY36TcV98/OpP1NZ4uitSHN2zrm1lSfdzdRHHmzrkrz2zt0aeb0U5Og6Lc7M2yU3jQvzryhlztfT8v0N402kuK6Jc94VKvZ22ebbtFkDcEDbCOQGRhLDn9Pmld2eQzmsse1eizm6IdFIE5s3oETy6Wty0stKktZ5ef0POt6eLt5NNs2s9DrPOuwV4ZKW53xvrtyW6c6wt55cSlNOaPBx4rD2cJmujnM7Ogc1T0+WuuOP0JtqVOWnxyLmAiPOWnn9nnZ1FgDrjVeXSFVO71PC3JWsDvHQit0xwReU2vbw+hYmGlaYW5HZDrqhC6y2m8HKaJVR5pHOjSa5ppOtPzLGQ9UuqmojXJUCXj3Tue+Z67OpsVi/NSvTA8z0/PVF6qbefWqS5CpmVrGpy2zW6vPbWe+EXzrToip0xZOrzrQsYgjUlqbp43i9Z9SZodW8SPH0R0mZ0cAIjRtKvl+l5+dTrBrK0v051zdDbWQKGzlHVy89s86Wckeya+d19Kk80VSF4az2dfGkvo84qgaLLQ88Du3KozRmdcpvFEnUh2tXWeHsj1I0Lc2NFsnHpLXTUZkeDz056evKl12aXXcnI9zlykuXs1cMztka9bOVunjivXw1ltAUzoPqSQh08e5Qs0ol0wpKydOylI3Nn3LZy9aNKWkus9gpCV2yyjj7eXN5PR1afJzRdBpbvzU1mwU6gOFchieHXpPMS7RNjozkhXVztTJAUkqArRmwsysqHHoXl65VZ6bRrZlMSbSrz6MqnltyuRwMDi7Obc5h1V6TUrudkWlFLcnRqJQLmeeaS756IztYKqqtHq55Y2Wsr5+S5tC9KSN2zrhZph7+b0K5+zn6LhPPsmdWpbbzzboCLMbOqZKhh0QlvMc+a0gc6aoewuadMDFNZyhF5Nty6HDQWQjNMy2bnx0tzGzoWJLIiwUAF1K1y93N2WcPQnTrNFadkZ8fpKhy42FhXO6mL5tBMFqTfMSgWyrRrZTkvz2I80dOpE5nOTJu/M0lqo8aFzHqiS8xXdEZ2dW5+kqi0E5fSnLuhLwJ01c3L2+THbbzTrPsPwdax6OamdL0o6Hn08a09sbZlNlKSSzu3nd/bnkOELY84dQzec1SVSoHA0r4aUlWhSVpwNA21lOrk7E5evl6AkHUlyYxPs565vRPPb56eg1eceuawzVK25+nnpVaeDFDD89o6nHW9u+Yt1FOKPotqeI3qcCcxSlbo5rHNrRGrLApOgvZDHTXl7ZeXswlNYunDzWOsyToB1PXlmujm6Jy1aZTkVDz6Nl0rsbWTXslvMelW1mavOUZZinCR3jq6NAlELEV6scr1SUAAZkMrI6h7+DqGBS5HPM2MV0rGZLtB86u3Oc66NFrCQSdGxNsJcA+SYPVdBt5tualj7yuuuid2PIwjrIvbrJT9LL5vP39B4Y9vhTkfsccsktebpA/P0cdisZazHo5/UmphbZsKpRZAUTzW6UWHW2mqNCadM4lepucXJIKjne8QxCbbG2xgcAgheWS2iaqEYJzCtsPx9QOY1UmrKZlI7IRthz2ShVmmIsYsUbnaOhuc1cxNjbE5rubEZXEYMederay7c1lPL1wsrYAKNzxw99+ek6gkotKqRltvO5b8Nnd2zbOuelOTOrGDnS6jWS3LYnyenxZ3zmdc61Z1sd421mTPI1FxEbGxwAwBjoGOBiAY5BjgHZS8xZZufF9JxtiItQRXoBF8Jdgc6OACVYwYAIaXMoijQYsedku3PjoMXrOGsSgOochMCDBQUy4MC0vRJuXeGBnrMG5/ZladZ503NRZeWvPc7U0zY0sJTHn9Cc83RZmumvIJOyDooZygB1yMcDELtsbbAxwMRG2xgcDbUMcA7SbbDNPVUxxQKwqWJE1EsmyjGZlYqZSCoxVgqVg7FQygdpNFn5jZ0nmx0LPaj6IzaKhyu5HTOgz7xPk6+Mj6nn+gt4000PP7+KI0j0HTNHl6ChuXQpQ831/LlXEtOMq9bw6ZFYtZyHa5OGDhhcryhs1LqZJ51FxyjHA2xgcm2wDsYEG2IMTAOwSgqmligUgDkmtgTJWWmiVrkOa64DbEGwCRoZctHYo2zR0I0+mGwWycGXFfq5+nQErjZOJEupzJ04V89Ojxsrx9fKcuBuughudXZLOw8i6lil7meIMrKTeZVtgM8il68eOtI0rJVo59ZSeZTbYwINjjbYOGDhjA4AOBjgY4BAHyYcAgD4TUApKynLhzNpSpwKo8LZa2TwbpkRpzwuzlbyrVEcEHhuHToblY6dA1RcxNbEkLCziPQV5aNpSlksmOlLIFW1lijBUqJgRhguwyHDBK4fISjwx0nlNdCpSEXoJzayiAg22NtjbY22Nhg4Y22BjgY4BGGwA+TD5CEHC5sCqEoFI2GsnJ0gOjVe3K9dJi6SlWPPZ200WkYto4uecx0GDFjE1UISiF95QUFcVtrFTYZdonthl2MNjbajtow2rbYsm0u2yZth67Uy7IstlG2jbY22MNjbYx2NtgbYB2NtgbYw2MdgnYLbG21h2wo2gLtQbYY7CjaXbbOlOxtsDbQ22XbaM20OdqJ23P/8QAKxAAAgIBAwMEAQUBAQEAAAAAAAECERIDECETIDEiMDJBQAQjM0JQFGBD/9oACAEBAAEFAt6Z05i0WLSSIxiZGW6FvQ4k01uoSYtBkdFHTiYx7sR6aOmYjW0WL2HKvZ8lb0UUUUUV+FycnJyclstiZbLZkU2LTFUTKRbLPI0eDwRfsSSFpREkWZidlMVnJXfRLZMX5tFFFFdtFe1ZfddHk5YjkTs+o+KHAS2XbKQ/PG17Z82J2WWX3yjZ0zpi4G6OohST/Avur8uyyy+zzshC872LZySHq85O8lba7L2ts8CPva2XtZe17WeTBGJyZMtPsf8AlUYmBiYj89li85WWLk4vglqWWrZey7nzFRZZY62bFR5KHxu7IlbWtqMRe3NtLqSM5CbFvfY17t++4jjs7LER5KFtKaPUyhxplFMaZyuz7jyc1Kj6yLPJdOO9HO17NkV2X7DkkW2W0VZ6UZc8ey+yitrtWhMlYtQr30WUYmA00J0IullYhCjtRxt9WXEtFioW92nMyG2Q0x8GW9jW8iOy7mIc0jmRils7ESF5PHuXy5cCqqKPBLzpzZaftVvkJ9lnBVFpJ+oVsSrazIvax8ngrdXveI7kRhJi0kJJCGjLAUk1vjt5fKF7KikV2+Y1vXs8vb0xfB5GkyXBkLkenzjKLs8lFFFMxOOzIyPvZGQp85oys+Qo0WjMttfI/rY+SuK3ZdtMtVeJi5EY0VvZZRieDJmQpD53Wy7mXW9otDoXfWz3lJIviVnqFZhtJZEotCYptrMmuIcra0jJHLGQMXtJM8bX2WWRiXRdn3aIzo8OqOGSG7H6ijgcUNF8vkWlyc7tn39FIpGJiY7P1d9bXtRTMWYsxZTFY2hS2veL2oSGUrbjFOSTuxPbITI2yUaZakl4iqTP7UYbUtrLMhq9vosQyKsbPBXrldRsb5btWolUfR/b72uhLKSiol73y/L5ER2+1yV2tWlyXsjhGRTMd26E9+SyzjZs5ZTOLGPULkxJuUmJGNnjarPBGXKkmOCZjTXqe1ikNjbF8bOSrPiKV7X2WR4XB9K2ZCjcIqx87WKt/vyYtPEhHFN7Ld7IQz7FYmIW8vO3LOCyyxkWSF52ooopnIt62kxNEp4nURkWWWsslEjNMcUYHwn5V8KopyLIplGNmAoUcIyOGsXWBRijCJ04nRR0eaHBEbOYuaTjF1GPjmpJPZcbPgsXpKbdUXtTLrd2jyL2XujgsssyMjyeHLay/abbMGVIlDIjHFvTTaioioascWhUiErLokrURK23yq7LMjIavZujqEZWZs6sjrM6x1TqI6iMomS7a5cUzEopmLMWVwqiLks6nPVIyy3k91vXvIs8n1svZszRkhsjyeBngjtONrEUKE+cmmvLdDlYvKuRTKKK2UzglEoXHsWWWZGbOozqs6p1Tqo6kTKJa7GjEooUhtM4Mk+6/wABbWJ99ltnkq1EpyHFpfSZXLRb2W7QuE7mKKRx2ZGQ+RqmXtX4tmbOrI6rOqdU6iMkZRONqK2oooowMSjE5G2ZGRZfZZZe9maHMUzItseoiI3T5MBJVweC9/I+GnfY+TKi9leyRWyQ4mLJMjIT/KSK2e1mbOrI60jrs651zrROrEziZIvtxRijExMTExMRp7qIoIxRFGp6YOj6iuVstnsuS3EVMxRVdjHEUSuS0J7NHIpCY0SiZP8AJQt37dlmTOpIWtI65/0HXOujqxOpEyRZffQuFOLkLSFppCiUV2PaMrOYNTsstpxlayRdlFjkOe0R+b2kXQpXtw/yltZJ/jWZM6kjqyOszrnXOsjrROpEzRZYu+jExPrFo5PkpemKR4HLahiEyRyJkiiiLK/KszMv8GzJmbNLUdrdsc0nmjJFl9r53oooxEit6Fs4lEXa/wB9OiGshSTLJzSG7ZZkzNnUZ1GdU6p1TqIzRkiyy+2yyy9lx/4O371mTM2Zs6h1TqnUOoZmRkWXtHSch6I12qLZgV/46yzIyZmdQgrntqeezRj6ZQHAcDBihJnSmVX/AI/TdTW2q+d15hGo3WzEiC2cUx6EWP8ATs6U0PejFmL/ANZbV7+nrEtZU3b3j8o+Gi6LEKSQ9VC1V2T01I6bT6cWdCJ0WdOYosxR00dJHROizpSMZFfk0UUUUYnTkdKRhJFe2kUUP3V3x+URjQ+BSFGzErmDossvfJdjWy3oaFE6aHpROhE/5zoM6MjpyKf4tEYiW1EojiUUUUUV2R2Y/dXevMXvIhHac9o7ZbK9taLIazQtWLOpE6iLQmLdi7qKKMUdKJ0EdA6MjpSMGU/dRHsZL2UhLZj91bN9qIRpNtCkXbRqatEVYlSepRm5EeyXiXEhQbOnI9RlJC1ZIX6hEdWLHIi/eoooxR04nRR0TpMwkYvusjIT3Y37KFsx7UU/wY/KJqOo2QHq8LlwVLUlwREjIsyHM6bnKGkkUUYmCHpIlpUVRYptEdaZ12R1kJ+6+2jEwR00dJHTOizoswkhOaFqSOqxzZZZfeiyxvZEUYjgSj76OpxNtkUSfCVkI0TniN2UacSQkUTILJrgyRkJ9lEtNMlosao00T4ZpzcWvevvYlvRiYI6aOkPSOkYMxZiyuyzIy3iLeQ/Ywkzpswe8YmI2keWMj5NR2yKFwvLcqMinM09PEoxRiY0Lu1dPJRdGLk3EqiPjvdk5TR1ZDnMykZSMmZs6jFrC1UZoyE/cxRiYGBgjpo6ZgYGJQhbyH3w0q3oxTOkjCiUhuxbKLZGBVqWm1tAl4RhOTjosjGvd6ayoor1Lvy31YUP1FbY9ihY1Wyk0dWR1WLVM0Zote29REtRVbFJikXeyEcDiODMSiiiiuyxbuCZP9OKDvDsRqQxIFNkYV+DQy+VNF90okeNmrWOLo+7KHEoUmhu9o+ZUX2KzOR1JHVZDUyGzNHkoxHAnpuIouR0pGLRET57r2pGKMEYLaxWzFFNCkJ7OR9jRWykfKMFTLoeohaiL3ssv2WSlZE6Z8EpilfbW+p5vdKzEwY4mJRXY9qZyUaek5CjiSyt+FMzSjHWyPpVI4PO2pGjT08njEenZgy6M0dRHUOodQyZ6imNkdPe0Nli7bL2gyfDcxy3youxyMjITF32TmQWTx3emhOnGV7t8oZZPmTWyg5EYVvVk4cf2mhqkUJDQnQuSMVFXyUOFnSVdJtr9ONSu5JqQpbVYlRLwtRtocIyNTRSMEYxKXbDTrdutmJNxUWYj4L7UNts4Gt1Lm7Gq2i+9sbyJedLsnqpEFkKNHgbso8HkRJEjThwWX2ammcmLkdBpqCJ6e0o2R9LyJZMjIUrF2M4HppqmnFikWarI3aZZ5HomNFbclyMnvZKWyhyWWOpHhlliF2VwNkXsmSVMiIscraLJsiPzp/HbV+D0eFGUSUsTJsTUSWoKQp7tJ+y4q1R9RVbS9MlydJVwI1IZKO1jkJmRN5GRjkukzGSMqcudkLyttSLt7Pay9sjzKGzZZe0tmyIitkXxdkhiLIvmriRZkOTZpwxTZlbn8V48uPja0Z2OfE5CZZe0bYhPZj7MhPaUuIzppmRkfI0447UW4ieRdPqDkZFnLMWR063mxRHstosT2lHJYSFpwaloqqGWMgrmkMs5sbGXtDZcEmWZGRaoWz8wY4Sb8OCc3GKiNlWJc6gzTQt9Z8rb7JFilZDhZfuS4E7Q/I3yfajW0xkGOhq4Qgoqyc6knalG1HxKX7loyMmUxcGTM2dQjKzwJKZfO1iZdEXvQ1ZP5tHNGnGoDZ5KPoZLaPgbY3tezF2RlQtXjp3LwNkpcrwh8yIeS+XKnL5n2/MnslzH5J+rL9zU+EHwfZPiSZHxfGZk2YtmOLkQ8SJMZF02z6lF9SOnm5aXOnp4k12x8Skrk8YqXO1kXtdCd7c7TipDfJfrL5flvlskfTe8HxZZaLLEYvtjBNQjtKVC5c4+v6GYNtKi9pKSlsn657Lz96Xyi71X/NqP0pmW+pG3GA5Yq7X2R8TXpUhStakmh4lol5ipInKoR1Hl4MbkNWYGBiyHzFy/wBQzikVZITLExM+9mx7Q/m2e78yey05SI/pmf8ANEWlFHSgdKB04CUVu4RkamlikacSHqkSkSs040nzqDEZFie8oqR4F8tTZbQ409L5f/TVZdF2J7t0XbxjIao6UkabNSVKAppKdseozTkf3RrJqGhpqY6Fx21s36lxHXZEjs9lvYtniPaP8rez2smysnp6NFV7LdGRkS00nHx4JTILJzifUVbJMyb3R9/FKVvUjZ9vmL2jFslxGDqbimN3J+In3Z9TY3jp2RlYpU2arsg6GyU3JUjm1GUCMkakko6axVWxc9r8QyrUupqiDI/IZQhCYjkSKQxnmUnTyLGxj9RCOK9lySOWcD4cfk2Sly/Gh4l5PA2ajs+t2eVTT+pr1RZJFEfSP1bWLaLHP1KWSyxMvVJtjsXm0Z8N3KxkEqwkzFwkm0N4Sx6ily42aksVD47slw18Pp8kPlqRUBSsUZSI6IoRRjEwQ4tF73ez4PKxPBY2Q8R2bMueyxsysS3snMhcpaqpaXxq5F7M4KRiUMjITGzU+UdNSOnRgytmIsvmxcyacTLIxKoYls/C3+J1JEpOTTZFkOFT6hqO9TT+Nlln3GUm5fFcE/ldPHKUNLHe+ycaFt00yWm0NEOYH1IkL4/RJsTRkjJbcFsk+UeFe12TTS0I0tf56fxJPZDIxd7WS82ZFigntQuRktMqmPeSFMhWa9JJrdwdS/jSW9cMic1pRdu89P8Ajk6IeqV0ZGYuSbxNMu5eDW4mouUoxWmiyUmJMUiyy98VXTZiYIqI1JGLGmn9Z0RkNLZJULy5enMn6hKSLLHKzTVvVXEFSlHLW2flrjdD2l8rMyPI3Qny3tqvFQ1MjWjw2Ri5HRYtBYuHplFxNNeqbcp7RNSfE/4yMWz4y6tDeR9ifo0ZXL61nxCKp7rglLgi+Xw9bxpRwjwN0OQixF9uT34HjIqxxFmNRRgpGMollmW18eTIy7Jek0CYvBZLWS2XZWzNX5Jn3FWMRJ8xY6ajpxi3yKCyzVwgajkjTm2vSzRSPErosg+Wo9SUVISdtjbvzsjQ5FM+26G+dOJiYiRJ0R/nuhLFy4GuTIlKyxMS2S7LOTKRbLMjITOdvIotD+TpGKkKCZiYmJWyRCOUtdevQJczYjVlSjp49l9stNyl0BaSEqWIokvkhPdy9WUU4zprUsihcyG0VZGtNz1Y1y9SpIxTJTo6axZ5NNeuTogr0WZZyisp7rzqU9NQptxUnw/6xWIxsYkLZL3Miy+y4rd9lHk0zX+eguC+dTVxNK5SkPh9t75q97J+RMuzUdRsbtvyrkcxk1JuGqkYPUdpD9eyol1IuEvU3HGGornp8JkI/ttLUEsYanxa6elm4C/UsX6iJHUjPaX8qWKx/dldIfA3utlXu872Zssssva91HggjVVzisYmpLGLtkPhOjWXojIva9k7kIrZb6m6ZqzyeydDdiUpOpRL51ZY6diJcvkcrHGlJ0JpzjNZ6mjcpVHSSSPqrNQ+9v0vy1P4/OpPlyH8FKhu32tmlqN6nbW1ll7cb8nO1I43vZC8Ij4+7JatDbkURdqrOCWi0eqJZZkaXyWz2vfWfp6h6qjpWdBW9CA9CQ4uJaxsVl0pPPR36lD5eU1FWyNRTkkaUneuyL/b+2a5RQzSj04zfKupylkuYrxF89tMek2R0FFjHwJyMjJFJmBgyntb34762RHwuXdCZJ0vO6YmhtSHYrQ1E6SY9GRHTxPAh9uosorSxjp5VtintOTg9XTx2UZMZpE4U9ltGUiM3F0mcSNSko8i+OlyO22uRmgstWXxyubfM1bhSG1FXyWWRg5CirMuVe0j6ldR3yMjJFJmCMCnvffHzHwkkXy9VIycn2KRl2cGJ6j1HgtFdkeXsts4kpJGpHJU46XpQ57QhO6kPRR/zMlpyiNbrk0oKMbvW+JL4JYx1LpJ7TZ+ni0TYlGSfykm9OHBrvh+RW2oKJk2WXRy5ljtkUSkNW+6zIs4ZijArtYrLEzUm17dlsssvbFIxZ69nGyMaXU9U54qGpkNqpSs000XtNVM04KtObm9pWpLklppqo16Iyh61fEIeqQl6vt8tWiTNOOeoT5l8SSIeFFxJwyi9CzoyFUS0OZmSlYrFY5W3Lmxq2lXt2ZGSOGYoxMSiiJLUo8+7ZkWWizItnO/qKuPSiLTSOnG9rNb+TT0U4uCcYpRU5YL/osjHjaSyTUsoXCC9MPB9knKq2mz9Mh+Enc5UL1wu2vJe04brzLl6aZTMaHG3VGPNe/ZkWu7ExKfscdnG97WizItnO+LKLKMP3LojOTakNJnSTfjfN5eCU+K4bNNbN2yTGaax05Mj8Z/NSH5Q2eBbasa2iMUzyWh1WRYvw7Mi+7FGJXZztyc72jg42W3BaMjJnO1nBiihYx7OSjwKhpuKgkmyfhcLjTW02aOnlI+2zUVpu3Dze0ixElar1tKJJpilTWorcosRqEbOfx7Mi+6tuNuD078787cd1ll9rSEjk5ZjRmLgb2ir1Gk19kmMh8CkyZJXp/Wmz6TGVtZrLm9kYC4I2zFuTtC4Fz+VZkWuyii2ZPfg4247ONuN0Wy2X2WZpGTkUeCyyPI7UfEdpvbSvAUqcvEpeqyDofxQt+DU5jvk6iiLoix+aF4/NsvejExK2ssvs57Od+NrLLLRkjMyLb3jxHkWzGJEOFtkT0j6jySlwtkWJcskvWIaGmREqS52j7F/lWWXvRRRztZx7N7Wt+C0WLbwp295PaItrZwxcDxZ0ycGK0KZHkree8RuxscmRkqtEPPdRW9GJT/ACrL7KK3stHHuw8uaR52bG9oiHHso9RbFyOCEPwttX4piFs0UOqRHz2PZPezIUtuDFGP5dl9lFb2X23twIbNMck3tJ7oW0hSLL3ocbKobZbLJLJdI6RjWy2xMdrTW79nJmZktqMSn/gUV387JDXp2Y9kLsfmyzIyL7a2rZssSMSuy937uTMi1tSMSn+ZfspocuOXu3uhULayfnssyMiy+7HbHa9kNbv8CzJmSLRRijH/AB32pmRkOvZssyMjIyLLL2rZcEvC/Bx47LZmJ3s0YWNV+bfsYlbWLa+697L7LLLLMjI//8QAIREAAwADAAIDAAMAAAAAAAAAAAERECAwEkACIVAxQWD/2gAIAQMBAT8BIQm8J/haXrCaz1ZyhCdZml9R7TRDRCEJievNITpCaXCfdZnq3FJhTFPrSlKUpfauaTCHoid6UpSlLtCEJpS8frE9qlPI8jyLiou6KQazPxqUpSnkUpS/oUX56L6l/NhCdqX1EjxGvSnSE4JD0mKN9YJH0QnVYekzcQmfk+qwsTSHiQne4gsvHieJCE0QxETwlhYbPIvC4SJl8KJ8XlLDwiUg1i6XaEIQpMNaQmZlaoYnskTFLpBwQ1ikx9FKXWavRiKXaDzD4jHpMJkpCjFhrZCzOs2RBrDHlYZ8dJl7IWjXObQShcTMynhbvZY8isovkPeEJt8dFh5o3i4Q+axN50+OjPsp/Z8kTRFhcXD3RMt9XlYTy8MWPl9cbwS4UpdmPKzWUYsMrH2WVil5XgniZpfUTxCezNYTRYfBPD9NcYTf+NF7tLxmj2Xv0peizNF71KXgv0F+euX/xAAgEQADAAIDAAMBAQAAAAAAAAAAAREQIAISMCExQFBR/9oACAECAQE/ASlLtSl1v9S/qv4F53ypS+tzCE1XnMryaEylKXF/C8fJc3SlL50oszD45nvfdbR4SLh0Q+J86QhCEITzpSlE/KZ+in2MWjO3vCEOp1IyEJmlKUus2uKfIy/qh1R1Oh0OpCE2WIUTx9F/jQhCEOokyEOv8+E/qdi4u1/isWZ/Le3Y7CftP0tnFYeG8pHztdqUpS+V8bmYunFE9OVEPalKXNL60etEylLo2IaPniJjeHiHUmyGR4bE8p+E8k8t4WGWYuJpMfZ9YRaU7FR1K9qXNy94JatlwkTSioy4XHHzSM6i4k1uq0Q/BsWaNiEtKIaLCkEPCe7Fjth+6QhsbExnEWvEfsxDwuXndFjsXNF94uWsPKyxeExDlx/w4rFws0pdubx2KL5IcUfZKIS0YhYXlcXW7fG3PTh9nZZ4s5chaSiWJ4suUtpml3lOsITKY3cceNfjMrVvKesITZCyylPgchxH944/Z8F9Fh5ZDqJTxhN4NYuYdRcfC+Kw1+CeEzS60ujeELdrC/G9ppd18i/gQnjdEIuj/fCE3hMofxm60X7IQmVq1m6XE/gTdrE1ov478v/EAC0QAAEEAQIFBAICAwEBAAAAAAABESExECAwAhJAQVEiMlBhYHGBkVKhscHR/9oACAEBAAY/As0USuKxe7K/hMnp4db7Tkfhzk9BCaL/AAxtiCdidyNUE/KNiyM1qjQ+r7Lkkm9meov4u9/x8DJR7ehkjEDL0laW3ZQvD4rL8XS+MV0V48Ddhmyo3TTiNd64I0SpGaI1+U2fGL6L6JXExidEKPvztQg+nzovDqR3Ix50tprob6B7/R7WITVB9k6/BC4vbdSBz68n/owjjO5ez6R16D7K3K0toZdVOeD9kLiFxCE9Helj9kKMqS5CoOP/AKFRj9kaFbDEEba4vR96o34J0wShVD8Lj6ZGy2is3odZ2WI7HkVxks/WHUdCYGw+P30r5gnbbb86ZnRI+J2X1UViy8WKnFlUTH2J5Kyw3c8qO9DfFwWXl3LIKxI2W6C8UVmy9L6qJP8AwdcUV8ZJGpycPonprLxRWLLL2Jn4Zi8xh/jLUvNaL62CdDkKR85ZeaKxZZeqtyTxmCOtj4y80Viy9uC9tlPr8JsvVe/GWTfb8Asn8fkv8fvrfH5VR7Sfx/wQpWqvwduIjSm9WIXE4rRRXwNFfBp1dFYsvFFfhboSWX0NFaaK+aZNytMoX0dFfJJ1UKeSiY6iE+Konp40t2+arqY6WsWXrv4V16NYJXefedPga6WNbpXyV7bkJv2X8xW7NY+tFE6JQdN28PxfDx1M7Flk0Lsyg6F63W9VTuvoZesnW6WSMWeSNLoSRqkgbcvZdejnUyda5GL0SRmNL5nadM3rfpGXS3CfezOxAy31s5ZBX2aKI0tqjoVx9bbbT9KqZgnWq/D0Ou4uG0sMMqC7UkE4nDal7HCgutt2conQ0VqbQmxzWP0LqXs0QOo49jnN42KgRD71TscOh9NEqWpR7T2ntITMoOlYcVdh91VwqiJrmj05bQ/bC6FVREXY+srvcOuN760phVz9aZ2EQQd9cCYksdBstiB1xJ+x/GtRHPT0Cam3P/mVfDD6mQbZbQ+G1NxbTqQhOI7iPQiOK+yuUXviEPUUVsPmMvuXhNCJ0PkrR96J3FLzyqgqCcXbY/VkHKLhkPK63TPuymz95vEMM76nHE1Kmy66Ygm9U4nQ+wwi9heJBBxVXSinEMN3XDJY3fQ+xHEU5TFsedMj6JXEkaGTCJj6340O2H8YgtB3xOGTRyoNhidKHHhk0oeWUjuNwke5T9H2uidiy1UrFHcgZULI13itSaGToWUfC8yjNA6DLRyrRy8X8Koo+j1KRxEYfQqnFofRwqcQiDJakJJy/wB9DZ3KOx2x7j2/yew8HkrS6j5TMHMt7V7TL7T2opA3EOh6uFj08J4xJ6bPQjntgZFZRuKR+FcoiinDhWpBtMrRzIrj2p9qMh/3e76bx2LPcd8enhPJOidjn4v4ET76V8RAzsf5DMP2GQbm/jHp4mJU9Q6NxHKiQPw/1jnJGFYYiyUxAii8PZRuw/Yi+gvFbV6JzOI0SII6tvpoZNTuc6sqiJ5zEYQTjReZjmhP0cwqUp6e9jDph9PFhFOVDhYZBk7bDdtq97zocrE4Qk5VgiSUXQuwmH5T1Oe3/ZbKelXJQZMqhwr40QiDn0oyDWT/AGTP2NhMNom1F4fNDcVnKgyDJ2F8Jrsd83v3nzmctqbEnpVDyTwnpXaZCPcPxZmcJ4OZJ4V0LwrqYVO3jCcDWIcRIvEfWj9DqcC44WOXh7DdkF0eEyzE6Z3azZ4xCZognXSHY7YssomNuycNYv0ImHThU9SMhbHuQlNDdx+5/AoyWoyF6OYVBOLhGPScnD/KieD94gnEriNE4jpIPJG3WLLO5WLxJ7svicOqTlUwvFxSiD9szKf8ww7MqKzHEnbvhTncY/WlscJA45y8P9jF4Z9MEjIN08kJuXovNY7HbHkktcO2hT1O5y9hh1IQlXXQvDZNn7z+jxoXiFOHDLqdPjLxRWi80Vi0LxCklLhOIVVKgrVyoPhEw+pMSTWI1Pqb4WsWXvWXiyRtUqLyngm8N5GGd10P2wmEI7bDaYJI+Fo75rRWm80Vsyo3CTK5f/ElYH0I2lk7bD6H0N8RZ7sWxexGmtEEqRo9Nkyuth8MlbjE/HeT2lYorNarLxWu2TadCuiX473F4vrII/Aa0XoorFl5+/xOis3miEbDrakV+L1ot9rx+LTsW57f6L/sdfxyyvzP/8QAKxAAAwACAgICAgICAgMBAQAAAAERITFBURBhcYEgkTChQLHB8VDR8OFg/9oACAEBAAE/IW8+UzTP6E7wRsqxHQ1xoVLArmzOyvJjOHA8z4yaReII7EjgSsws0V9l4IJYPYa0OPGAqn4NP4ENGJ3824ZCEJ4R+RoT8oQhCE9kfZnsz2Z7PkfIvYvYvbwvuH+H1FdCYwjm19EWG+y2kjjNtspdiMy+UIKv0cUkl8bJ4ZFkzGf0IrDCJm0ONKjHxvxQxBLkfMiILxPD6i4Y/Fr+bZKJflTYlP45+T55S8kMmTJSlKXyOMWCl8JkUSSZXz1wTUWlezowUYZhhVq6OGQdfHm1oao2iCG0llmHCwUsnoi5FNRDjKMDbbw/kWjo1y2QYyZt3DBeN83vzD4opEEJWND5Ne/N8JPP5MtYl5fBC/HshfhfwaJ4RfM/h+j6GnnRSeY/2LCEuqTlUyvReaekwNH2fJJplxB4YmaM1lQpn2zUUw3ktn1N/A0rbdDb2nUxrPSG9N8DRtRRrgmc7FTE4NuzLeH0Rv0MehtIegyey5z4IXA6eH2LCyz0MbJPxwuDDaCRp+hcz8Oy2J4/BKeY3tiSRZ/A6Vif4wn8sIQajXwTkcVtHA0x4fQha8vs4syxfZ8pGeGHZkcOfAy8BtFbrZBMEQwy/k68dCjFwaUa9mGS8J7HzRu32WKt/oT6dFSXsGHcmtChcWEs2zmV7K7kgYMFfg4ORK7fQ9bQjfAsx2YPA/gTnE8kTMh+ReNC/CzxRIh0xO6Gnn+gz8qvw6PNKUpfC83wv5Uv4oijWig94WF2SKL/ALHjH9C7EbeEMsOEZ6g0kElHnCENJs7cIyWzAejPwnotcfJj9IRlPQxexZeD5Ldgq4L5IiZnbEqtDbQyqaEtH0NTg0ukcYwNTkh6ZBlcnbooxVcGZvHhePgVC34bgvPtGW6hBlEZV4CppQnwUITx7Qn6/BZkvn5kI1oi+AtDooiOf1EWEY0ZJ/Ly+UVyzW+4NXsf6HYPDiD4+D7nbG3oEbXXQjuK7hmDKRE7jY1e5ERtMdSbpyjMMvCFePbHOJ1kparHdUL4YtxwuyKU6+j4ENkhChxIbHL/AEDbGnyXGqcEnItHBZtEmGHsXoYv46GSMS3k+dBZjya0OQYhPKGU9C9/sj0yi+VevwevCV4otTXwJ26SCoue0PK39BNJ+zIeWHBK1/ZXlmdMWo+yRtmGjp+KUpfwj8IQqtCY+C150yrXfswipjQ2yyr8Df7D7p0O2XPoXNEFKQjsaJYVNeFeRONvns3W11RI3PRpn6GkbSI0mKpv+hsNXkkUZ42OuWPPXk20IcCn/CaB9saoohw5GQDgsMM2x4chdkdPsM1s+Rv9eb9lOB2ROP7NAs+yvRCkxRtdFxnJrCeCYDZMUExpwZJ7E74bnij2x6E52ElqjfR0ioqiC6RoaYDYYaFHtDr49C8oDxD9G1uyLLORyrSuiu1+xFC5E6wJ0o/BKzCpGH6GMzQ2dYZpy4fLQ+D6GrbFft6F8SCxx0Ozr5VcEir6vJWmeV6MWmseiXsz2f8A4Ct8dDTib/RODCN0P6nR8IhOkOBqxOabZEs0e5EmRCXtDvR0dbXhG2G0LlyLuENVOicB4uMlbmP7HS4nZUN7pRlEY8FTDKmtl9nqHsQjZo5zDSxkTTN/JzbGyj5LYmjJCYl2ZjA0WanoI6Tpu+zlp97EdyPeRM22210kLHNGJKoJ8ZXoanm18nB0cHMLyKtpIwF4wyAaknwzo/YzdzLZUY6YCT+xpqI20zeN+kVZD7pb/wCxRcswo/7mCCa5JTRUpltHG+jStcvgOmcYcXsfmySZq3lMt9D5HR5f+jB2ZXPZxOEJ2SYrcbx0aapAlYiVa1/s19DWkmR3B9GFhL6L8CNkHZWULIl9hpPZ7CxBR2WzXYiTcfDFbHhDl3IdSxkv0IrFt7NLLNojfoeZmx5w+oS+GRy6MZYijD+Rw8mGzf8AQMeHtYLMGSzgiO3hY9mv9rEChI38Dm0cMyyjeG/oN5x34ZlaoaCbTopTGCsA0Rl1GJ81wSpZfNpFaZtbMIglc5HCQvmNzK2N3IS3gfajdbZy9FFlRgSJzk4J3KieVNbjHulGi6GeSPnpDNynGDRR0Q1g5doYSLS5MXtMlwmC6Jx9DUSbcnEujVsXkFMTPY/YTq8KoH74HfKiZNBi56glZSjZPZGvkJjJ8HwweJyhYSaJxcMRsiMsywpTbEhEiKHALPPhj6MrlkNZF6CERszYv5OWPZ0sReHRawhZMY7RoguxTdpvhDIlNOx48hRcKe2b6d4GqQrqEnvY5ex6IZFqmk8mkOPY4WMjH6ERZtcGHIymvY0nA9lgk20mI0Xl6KNjf7KVeDGuJLNhkNyspXRpBV+sotM2sMpNL4GWNJNLIsxmFgbpxvGSDw9ixiJJtvJjdlEyyNRVkNlWsts+beyDMd+F8Ll16G1Ep9meDQ2LlRFFlo2DY8ubwLI/ZcUU2xvQx2zbKsla8jYNiYjQxQz+oscJ7KPQReDK1eLXGRuHsU27oowkvoTlp6ZVJ0ndwJGsMeA1MnhiczWuBpK89n2mJQ1LZDepkfALga8Dfgut2KLGPmdIfJRsYGssJUPA2JhpkfIhYX7/AGPgYUI/9TAc6HUOiZrq0n6GDmcoSs34MZS4yJu+X89iBn9Cv5ayJpMGG5zDgR/GzFaUY3rkElyLAlUh1Gm1qI5msC5Bv9Dr0bhyNjjxjdjXozvop3C8+hPOzSotxplxkXGR+wzcwJFxkbP48E48OhoWA+hXCvZG9CXZlHHiZ+CvosornL5EXsbEawNyIkkeGvkEs046Y4yh6R8QfmFob+xJR/wGubqWvktC0hq3TG3gfwN8rw+AkeBIwsTI1vRhIJUly/34C9P6E3QSf9juTPl/XidCfsvteIJR1bJfYbRs3tNcf2boxuxPuj7xwo8voXJmsV6jiGnOPY5hULLLQS7dGs1fosdXIx42hKeiC5HhEMlgSaZGtXJMXXhPEG9eHe/FJgXliuhOBiGvPgThWUpTSgzBxnQIa2MlfDNMqimoElnz0XmlryaZ+L9jQ0F64W4sCFyayWDC0hWdBIctQlXJDI6HFmCGVjJVoZVt+d9ldleCZcv9i7gv+sfEJ+n7Ev8A+GeloTegncRM0n7/AAsQfMed5Hou8TExqMvR8ND9+MDZ8HCMTJf0XMI3iyGmQSIcEJ5TwZIYxgE/wWPgbg4VpsEa7yNmckacIbl0YC8C1lvshIhpmGcManGVuRiXPJBpCxsj0M30bjJthHFRG+Rua8UjEHwJzswxwVaEpz/g32VlZf8A8yCx+wXYPev0J+Uhdv7Cbwz5z2CrgQRQghPREh82abFHI3EyXsnQR4G3TFG14oTwxBB4ecORBgHUIasG5rC5HH8cFSGs8eIEvkLSrYpEFhGRfAaPRtkcFNtm2mSeZRYGiQVij5GZMrfgxIvAxkB8nJxMf/krwIwUpZ7X7EjkLsF6RAkC9wjJ3ETOHhfGCJ8HrHqI/B2VBDgr6Y87GvQh7DZpiuLRkzBmV0eErIx6FcKFfIxz5MsOSjOUQ3wLg0J3xpeDKd4kQSSGoQzDMGBsMmRLQp5FNCOH/lFF5spfypX5Erl/sSuQhyJxN0J7C9onBM4CZyiCCmDBF14g7Ikg3zCIvLPcCFwSepJ4fg3nwlu9ZCUo04Y/VGamBk9SGIQlDGIbAzS9Gg86GwU2GazFUhr/ACVD+H4N/wAOlKEjli7AiL1iboXoxe4XYJ3ATOSSDJi8sx4YfjjcsrywYCcFz4hnMIXwhJsWWRYxSQ1LHhtsswRzv8Q/zUeDZ/51KUo9jEvkOSwxS+CYbF3HuJ7IKvKxobkLA8+OHgxEQwkKQ7oRQingbp3/APgUoqHMYs0CEdiXdY9zZShK5F3CBEvAk8S8VJBBV/AD1/lE/wDEpnufnS/jWV2ezyScQQSkEkkEkeMw8CCw0yf46BUrlDnga/jSJ4f/AJK/yXworxJxMTkQyJBz4hBHAXtIW14+oaRBq5fQ2wRr5RPZPxXh/hCEIQn/AItCEiDX8qJAmB6NX8FqLsxQ+QtQoqCYQQRpM1y+hxBnuxc6hBJdi9zqj+x9oaa2vC8whCeYQhCEIQhCEIQhP8peCQw1/LyQX9h7aOY3+MaiyZnaMzU3DENVjzjTQnSEFOVnsWbVQkMoNmqhqGXKYloPrRfgfIejHwwaQ1bcbLh/lPE/KeIQhCEIQn5BtiZrxnuONlx/El4liMJn+VMiGh+Uf3PNeiDHDfZCQ0Glx5H5ZJSpkGvHPBInguC5kfSOnGztD6F9YaeENHMltv8ADhBeQQYT4n+UEEhIXAteV7/jXhB6H+DxWYy4ORcGeiUQhYQnWJjJhEcDTeaQ5E21oaXUYfJCzgPqlNPxJowvGpr5hCfgW7aDYGDbhjJp4GkQ5fyLyL8R+IQhCCXkJ5X/ACMcfl5NI0gp0JZpCREnIMSmWZwhkqC0IUIbC0Rl+GR4Zh2IDU54jTlEtEtYZf44TyT0PnQbw+IvhjWNXBHgjXHilKLwKeX8Tf5rwYo+B/CZ8HqI+v4F4r/L+4ai2MTmCrJQtiv3PwilBc+ElRiyjAKxpeFSogaPgbuB4foNti5tmzEJBdcacCn8yZEiEII6H1D6xk0bhdzGnQwciJ7h6RofmUpSlExhB+O2LWVJ7PeR/NfwK6mKOwe5FMkMRzFhJBj1+HONMFBQhp4tEg0cklfMHRwokGPGizHU3gbos8g1X8VKNoqIE0X8WuEISIQgjo9AwaeFuNXi9BRPFLE58RukEz5vwWP8l4XiNp4GmtoSbKvIoYsZQTiGpxCwvHJFGL4RDweBdEQ+HoGnQ3yDC/CGcW0UzTHbaHxKaLb+E6BP17Pb/Qltj3BdhPkRJZ2I7In8CJsU8/xYIj0DUkno9QyfuWUiui+jBjoQzY3J+KFdk0iXwnyjrOWUYhgXHhxoi62NYUd15QhRoGMGw9+GJWE/FoX4s4waaRqf1Gn5NkCdGqJ/tDJEkSkJIYaRclGJb4yfs1r8C50Jexd4uwTufMIQnmlx4DkLYlciXJRUziLoggjcnSzpDbov8GjkXhhhM2L8pDE65jmoKfZoohrh+ENRkQEl4pSlKUpS/maI5j4QqL+LbULGROi2JjxB0iQaeHMhOYUZt4nceMT8H2Mghz4kvYzgRV8CEwge1s7Uh3HMa+DkKDTBA2lnml8MdIvx516BoxFT0hq7Y9XJwc+BMQh7MVKGDLDKYcuzHPgQ1TLEtZHtiV6fij8xMnhFGMSGi8bLY60yvId4v8UE8PqYDLDYHiPtQd0/K48pjUzR8AkK4QxuA0kXxDzUxbHYpVAnKYZDbQo1BqMbMtQkvwFhklBrKYJLaGrRvIxYfEvoTdCfwVvXkrv+DzJy5FbRaY7a8Q0XAy8BLJBw2ezpGNi2LeoKwnTpjVvDL8LoYXleXCLOI+FImiQaTWUOLgx3iVG4bfAy4G8hPIhhhYFr2yLog12RWkKsIOMI28Dkxl1gqgRaHvA3xG6QLQjKQ+oEHQ2vAS2ZRtLvQoxqnjskzZ6kO+TULNkJdLw13C6yJcF8T2Q7P9TgWiQazS/2VCZ8DnNIfuZoZoZDRc4GnyZy9GaRGYEmhttXoXGMmTCf9wq8QYmheKJ1+II+sIVw34g8CDGWbTFaF8gQ0Emyqq2W0bwUSNvCl8UE1QwEIn9+hlZ/Y5cS5huFopkJsTt5F9xrnxEimtLoK7B+h0h2sQNaSUGTBkOazBGkYyuSEM1yP6kaDfFnsJ8lhbgwWRDwSHsPCEnMnociScjbgXxdCmDdGsi2PBe5NowOcmzsvovjQ+CEzJbNB4XwgsQ4Q9j4HKYeXdQxXckXNXYtPY3dm9yx7wsHtLOMuRX8EfoTmy/g9ZYMHQaegxsh6MvofiJlFaJLDQV7UWsIKzI0SMGDbTJdBC54EqSSZNkyQ6NyCXZkpzTHGew98NARpxjwyhhK7F0RuN5o1G8l0LVX0SZMA1/Y9h3Y3PlWibKmSOnYS8PAw0UN6YpUSmBo5foZBiSDHczaCSNchNRwhWR4bHKh6uB+B+zyHQnBGpbDv0Dg8omxUfsqL4LiJYDDS1aJW2PlwNUxSWbGk0SlFgbHomM70KhzYmQ27FouBP0hWTV+XTkZlRspiZJ47ET4Muii/Z2NraWpuK89lC3emRoTDdSfTE+rB22eucmDQ2B5RbOw+S2B0GLk0HpnYQM6KDVvsdiavhcCSZozoe1keCWBuyeGiBaaGkREwZJONYjFQyrwonTH8LyNN5CwMl7MdEE5JR2xtM1rwEUFMiaFidLhLGBcBWXhUlhC5pVpPRZXo+wFG7IMMIsIKUPQKS5JQ2DLtkSD2CBeng4RvoxQPIjZS0dAuIq9FLRocLDFj1S5LEXFYWR6ZKu3nxOjXIcDcrkWm+BkzfAtibi+TCXIwsHQhnoVXKMXRXC4pvN4K45GNuexJIRILfCm2Wzoa48C0cAiaWWO3TZxBvEbThFliKTFoIScycJ8+BgZOTbiWHgzCYuz2zDIeJZNRurgJkB3IlkR4D5wattHYk1xUwYzRrgKQ1l9DepMEeWbfPsRh9D8qvCEioUZ+T9cZFEzSrO5gFsXEoiAUfyYcUzCY0yMpF7MuM34b4oR5XHRpnIPgbeXB0D8aVNz3MWzYjgV3Z/Rkbbz4EyipkyozYYF4TvxgsGYIS9iyAgrxbwtbbYtUopg2c+K5nL0OoL/AEIfPwphZdEhtBCy/EFWexWvQc7QilLRkTgyTo0CyMljHYjJNowuLCAkoZfQSuFo3I1TXp5DQfUkI0lQ9OGdcnPiEJ4vBhhE2hIJkTAlC+18N+hmU7hm7piGXi4eRxeVwJ+NRh7GOL4EgO2HoHrHomlV9FhTVA5mQMLlj4KLXiSwPRm3sb6CYGgySb8Cx9+OYTOOxZVhjWSezE6UeH5J3j8DW5rBkJQot0gtYfjgqwLFShiNaNGxv0YKRlxq6T42kGMUQsuRJP4i4JVKqnCFFgJA9+ITwiQ5YJtlkhBXC2ThKzJmkLtmmOJ48KDIwK24fIuGMkz35oy9kwYY8F4uTkZYkTHie/wmPE9C0IssYkmWWK20c3HBY+SY67E2OxY89IUSIT8NkuvY8rbQrASVbNFh2FplmLxmo4oyb4Fd8ceCyXITKdDYYsB2FvYnT6NNpDEZG6J7IRsq6LggLQ0GUPsi2VgjP9R7rbw9N/j/AECzNIU7hWNr5ZBtJbMMxZNPI3Xhanyh2Nvw8ujeLR/ZGUehK1snVKY8EbJBMFsSi/JeVtd+i7HV0FC0hWKP2JBH0i8BYwV5MbFHAkkIDsRiwnURBGDTP7xZfHxybOQTyMh1GujVRJkbvBmRckGPRx/IrUElvjgYbqZ2cD3PRkwoKZKzKTHKDHeikMDsLLtcpiaphMHqDPyRjT2Ii5KfOvQ+JfPIZpcqmR4g3f7mPV44GjYyRd3kjMcno6QMGX6EESfo9QfXPgyqyhIz22J9IWajliY1JOC5UZZhEkSDjPhWU2xOSiEcDF2b8IbEluCtlqD5P3KzYwJ4QkSJaYDY6GxjHYyok2x8ZZi54wUE8GMaKLeieQmG62vD4giSYwECURZw1qeCo7Eyw1kpsjEEWLAzTNaSG4Ns3gyqLIkTIoOSDKwX2haPBny6YHoxvCME/AL+yMAWKQuozwYFs+WY20tCbFtjdOUWt/YZ8R3+Hq3ItWfCua/oUcJ/A5LKH2NF6Ki2JRrgaKJqUcGsmhDLg7DYk8GGroaGSBiNi2NiYz6KnKwnUr4NbHxcGED5WO5LoSIaMuBu+Ftwd7MnYv7GJwdjYIUC9V4PJU+BwJHQqXIt9n9Fu8DXwtoYnUYYKpXEJD5vVMKbJGLLwaZhD8VybzfhIfS/Y9SXCKpdjBVV6HKiWBq8SjbSVKIUnikHhvgTX8DJtlpuoWC4WSXGSTIICKP3A9lHB9A2Gvwp+VYTaXoaOVdMiZFIX9SY2YTt7OHj0eozhYFwG0ehL9Bl4ZHJJOzAJb5HMrCct7G2Yka1aaFcWC/2Is0R0P7HWWIW8BheFsoh41mrAswbXjQkfnT/AAHS+vg4NV5FpBYbVRCV5S6NGt2Ogaz9no9h8DlJZvKse4wU0b0hLrUZbreTgWuEecMoKuh/wImbQwYLLELAzpbZkdTZ82dFhEhr7AsquTYhBITiCpx0BJbwCf7zM/YUwgifcJI/fYhOiw+MsDv58FAs780twQmn/oCXw+WVNw5VDRJghr6fQmigyzD6Q900WZV9oz5ycqYIbV9EBKG2mCdbHjFkNtqfss+TLWRHC1fDi78OsnPGDnFm1nY2I/CMP0xRkeX4PE+Brxf2LIc0QiWNlUtBFopJqJI2+hsiEaoxqRECW23F1TQldFGeg8rmCpXmDVEZTCWeLW1yrgj7OLpi2KtdEM6ZgG/BYR2EyONH7zwRK5kkKjFXIw2M7vCp6YfUaTQ79jEvyNo7Tc2BDRcx1iwaZ4RRh4IQx6RD5ZpHO/NH0PSEOPAo4Qm9CO2Kaf7L/wBhjn+hjkhxs18CVKo7Ri0ai5NFUXI2bxCH/wDUYa2Y+F+n/Zmii4RiRcCCQDRDIZHZ6Fc3/UfJYNiwyUpSlsol7EnLfoX5YuC8GUXP4GhZexv0XFNM22h5T3LszaJMZyVDK0RPoROWJ7E5o9P/AILnj4CvEqx+cb9DT/uEmP8AkkqWz9ohTCOsUXji9zCuSBJtLgU9YQ8EkIwOmNMmS+T7NQwiY8Q4e0cAXslMoyheldDxSXuHablciMbWtvY93gs/SNCGfBHO/LGy9EXTL14Qi7fiOwk+RNxBX1Qs8n8EXP7M7H9iad0dsqW3XSJlaPpH9IcWlg2Ss/oZfQsQ7aLieBzSnEwjXSz4YXO45jbwXwiifghY0PA2+jQmJmmvAyZkEXe+BNq4ZQhKbPiS4gurHz4gVe64GNF2+E2/Q+ml4Eq0FjDMEt5o0rK/Y7C117FmUzTo6+S0hymfvbwITPvgjZRrgmXYO5bQmpsway34C1tNDiPWPD+oSlUPV4dizvrlex9G1CUoszb9irFZ5bOpmyVM0EPy8Uo2NUSPuFYx3TAx0zPD/Z8EfSPow4ODJltsSLj9jvYUawX/AOZl7H/0JV0ZblZM5fRgHrSGOEyg0M2tWavKQmBiXgp8Tjfgn4NmA68UJVWt9+KFsbMKHksfgkaEbNJispWVVKfBgWWNVIrnXA4VnKRMsPNmg2a3ngjHX2E01T1U5o75SBjtUh9qK0ZW4YBX+wiP/wBQl8cIeegenyLY+TPLcSHliEP6Q7TNcNGWyaiGfcb9IXG12L17MmblYTFZVWz7ZjPKZz6EyaZmHIfiEINlwynw8pZ4p8GKTCZ8M+hQ2vZ8hBbwM9MIvtGb7C537NsfvxTNtlWLAVilkc3wZFh9jVYiY2uHIdXH6PVvgV+DwGvweCTMSnyExs+iZ8CcYn2MXh60L0PY0V8gYbghvtfKJcil23JSrs9pHZS4vymp7FRPD9DU09FLYLjHGZT8htM+EhQbtNLsf2zEfouI/ojZI/kXnv7BkakNoOKwhZOfNMxmlEyVwOQjEp/vHl38Exdf7FGf0FFmpzKMliujPJMNZ4LTPo+R8Ya8M9w1bRZ4r2yp7VPsY4TM9obfJ/svtow+w/s+iPpMZ8ovR/8AmJh2OEbFWbPWjyr2JEJrCoS1UIpAvGehFZy+Tq99HLF/ZVx+xq4/Yg9VT+hm/K8PRsbO09mJJta0ht3QvY9B9hSYMYV8MYz5RevGhTEm8sdNaDG4ueFwLw06G6zQRr2RSDkac/4EoUVsl1iaQ9Bqwy8TwijXFM97EvRgjI/IZJtCz4Br9j2ueG/Q/JLZjgimQwS90vkzALafbHC2wW2yaNOBxbnDEnjRMuf2L0OzB0Ex8GBvw6NXBkrI5RekH7E/f7L3+px0Me0RyH7NlLMKeDTsxqZHY8KUoxCbpCbD6NqjwNJUvg3qr5J0DauMLlDGTZb0NY0XBR+6DfOX5UVJFQjT+giVa6g1TVZMCjhXox7hwh5Y8rReMMdqXwPiBv8A3IYuN+MPNyK6ZOsrgT5zzXwQhCKq+Sp4FE/iJKtmMaVhjx2G08IxuWILIkHwTbX9Eg0fAynI9lqOQ0Rt5yNiRJkyjpsWIlBzgHizsb4RcmUPsXdIbsITgzoflfRfbF6E/BOhj+IbcZKXHil6SPuspexW24hSoF9MJ8Ic17F5ohM9+E1yiOFPgR7FL2Z6oWqMLUU+zoMQSc1QpJgclULQ00uG0S0Vo21hdCzpoa6404LPtGLgy4OubUSivRD2zgjWGvHMjSvYzZRjSi7ILZIHNVOi1qRd+uhpJaRFclWjJPsbUwG3SS+ymtsesayQRDbW2PCc4PhnhmMEwYFy030hq3DSKKdvLHwwqEHnXZBCJCVnfyes31of6mCP8mStoepI1I6HnEbkUn8NZfQnXLF6Jn0E4E/FPZ8xKux3yIk+hBDbbNt5fjgo35RfE+SY2PshcoXsjI+xsjpibgX4RlyEkh9j9IGsFwKvMZxV/JJIUuXgq8MiTXkf0SbHoRAS39BTT9rH8w2zCGxc2vh9E3VN5aFbJX2djRLobuJZZ/2JFlceGlvx52fHjMMaaXiJwlFLwlpFbDcQkE0byy30NuwXE+CLpuCpl7IyMpRp7juv51E65YvRH1Cf4RPao0H0Y+r8llfBj2j5GK8ZG/cx2/Rg+T6Ku2vBfYujxJuBXpeAr0/RLtjvw+xMlyIWCjuDxDUX9lMdia/cMqVm9VFnVgSSRF8VlbffSMK4ELPkfwhsZR/1KuPofdiJoesgf2QT9jN4YzPoIZU+HhDvHBmvi2yalNZoWBxkssusYK+Y5CGBFrHzRnm/4ddnskT8G9O/g0megfVl9eE4fD/Z8B8noX6j7LOGj2FYS2Q4ZabKJiHAuqPUV+UZ8XLbp0QKk01Ro6Ix2fA1WCllcm1+klSZZBN0KMJjOM0i7aCYHGBORST4Jjk9o5T6j0xtXfi32K5F9TQe0IPLN6Jno2EMTOSN8PxiA+JEGWRextAu/BXeP8aidcsXomR7Rv8AFoPCyqj5NC9MfaB4DHCFeH+z4jPKh/TPimZ5PwYpcMwYXoopAkCDPSFfR9ox2N8wUuWxq8PA0raQlzsPi1lZsMlvLPfRmusF8l06f7KnBRcL14kh6xEuAkM7GUPIhLlYzcuNn48Uz3GTS7FOCwWcZBFG75J4U10Iz5M1mCSOAKQXIn+RROuWLsl/o+g3p0nhihI5GwT7Z85+D5ET2C/Z8gh+z6pe37McRnwMTnxk4zpB7PcJuxTlMUP0j5IfI8B84TiLEOfk9hdoJClDTc3wSLSF8j+D2eHROTaEvkW9hrXHJzwsyyDhaxUkXIyoxCexeaRaEo4bYVsJjf8AhP8AJp82fT/Rh9iSevCPCkVo+CI+D4IOdzXQXzGfAy+yPoVej/4QsvKhjleSbhlj3C5XSOg3+BnqeEnvQoPnHIynlvLISLWVZXE0Jp5Q0tzJDwx1FtpNPYiy5LIkPUsi0QJIzMb5FwZHXha4ScQgJwK8ThY/Ieilfgs/5FPkz6sj2UhHjRezL4p8G0JsO8ozEyTo8bPuk+zXZBV0egxwjE8JaRnwxOzndZY4eShJ620IfkTJPoaVxgSBoUjOSmQS7wLqNTQjT8GOSxlwJGSCtH7yUa8OBRSizps+PxehCokWPEsvhkuP8ilnktIND8cYnOD4ncE+h8KH9Cb6DvaPli9ZPsb1+w97McCrn6IbSXSEq4i6Hs2K2ryWGL8L8ygqi+ioa8Dg7ERwNoVJ4L0EfI8ijDPB0kS+FsPgRoNA1+GhfDfFdinaE/AmnojbQ+LA3+Rpra/yb5KvEXjZlFfjPIqZ+oXvBcBp3T6KxvaU7ZJxKsRpAdTPW2JL19Dxy/vwUWz1G7EK5UM81IQdg6PBjwL18+9CwvBtUlujCI/DHjzp4Xml8USuRd0JnPho+D0Y/wDKkyl8wfgjMiZUFWsRIW8M+aF7oWy9f7Ny+khKKWL2iev0NNP9j1+FPin8Ca5b+Ql1H8D6aaMG8LEwmKFfMIHrBVK0N6F6FEPIWA075XB+dPC8P8KXzRfILuhO58eo9GS4/wAmlL+KE8qdHQJ1z0XL+olNNn1+Ew3KoZ8Q9nyHpIV6H1+CMPxa/hExIToorR8fKGS1eNPwf8FL5TLTF8wubAmaY62h/EN+MjTW1/lUpfMIJE8UbL8oTPQhMuS+T2R/BdOYYj6MTxS+KUL8SI0LwgSrITxa+Hr8H/Ggn4JWmJ+VRPDwjlIjRwZ/lqX8zIhp4XJXORrqodXRQhlL4+BS+Feb4Jhfgv8A/9oADAMBAAIAAwAAABBJyn31bDOHZnoVJR0yOBzyzbnbzyRzxwAH0u85nHyyV3F6AqupJ5i5M5XtUFmpji2ZNXTlm1GqrgOTjIRXnlKDFEklUzLEG5bnVq6ugo4d7Z6NT3ywt4a5Z53oKIqFy9GMFWkA6EJAQKW4X9moHZTfaRFc+M/5cgHo/gNJ9FNxNEKLbhO37shiWJW+5a42s2a2SvV02An4vzuiol5pQU6YZl7m7MKCRvFcnMUqZc3FXKswguKAR6PzgKF8XijWuNZiDMRitC/wRCPD1GB6VXJOPciKZQzx+xziCRXTPAvwutMoNzKxqhcNhbZ5jcE5lGZDlxYnRee/ShT4Z7oCLY7YAwsyEitLW/OAbeDKcFYoEh4roLzLXBy/jyaUmAww4IAAKILYcNLJxgzDjzjLt2ZcxEZ20nPZzrdtaqsPc5H/AN5BA+hTcqWCqS2f7+ue+SwUc88MwQE9k4EPkwIhEHNg6ZJlI8Ke+8IXqaSv32/L/wD/APvq6par75JLIKGAiyBn8WyRkWQsD07r1MB7PMMVrMMPc5KYs88MbrKe/Pf8ZTx7640DopXwxxj8eQBr4Sx7gn85Q4kyMd8MvIcfJqLLOtvepRKrag1tUsukS3+9VQN8kW+XUSC7T5Nob+niFjx3u6aYqo7doVnBZzukuOcJe91inCRtjxxaNpbpXhLayhRATx1yjyzqr87xwxFQUhzr0ABQQv65b10xCg4yVQMRivhSzwxIY3hyFaLI690zRA7Bx3oAUFV5Cz0WecYJjSPHEAdEXRJi2C3PXUexjLCSj/kirUDQDxSmxqeWBF/lOPrK1Rvf4QSf1KGZ87h3L3chKW7+wSPulQrEVYASBWMuvA/VqjlsF/8A0vn98iSJ/SKzP77+ctjGy6tb/GRz2y+kMdMqJfFZNBJlpH2MuFTihC188NN2mS6C+xwkcIZClGAhu75NXrALMLFUJ90yS0RYauTejuAdR+vp77C0s201NcKV6Zjde3+zTc90Sw8kAU45oxIGDkuizB9Zj+3dNIIllJ8oj34OL/USywd6aPKFDppWvQh4vN3nxHccA9RNlGkBabUNihfilJ1tueiOfFCE0Vvo9mNbQk1Xj35VH0c4lJgD2R3YDMl752xRYDcueNSk6ykiQLRsRHwHlZQf6As6yv7jKbSZ1F9CT8Z2wVeEEDfmwHE2/HOPJ3Tfwkuz4i5pouAoTFDvt9TqxN9nfYigosACWBWAQJFGFdTndzpXWQRrZaBV4nLiiKsHBZ9lqpwwII2UAIHTlYWFfntdRVmZxIo1legaARhHsHlqzWMvnQszTN9ANuH8DhsvMCs+OOKSqv5NP9WCSuOPOOZvkNW2O1PaiFjhtBaBfow9jA7bLp9cgU++2rDult7mOSt2vtd6Hrrnmm8U89FcEZPzkwsxpg8HsTTJEMM4GOaMwn/NlpZy5im/JXysqFydCjEfaVsNKoTJF1sKk/HrOgnJww8dNtVpb7JNjxZyM+OTNnd/BFLLI62r3YWRhfbkfHXM07j4K73x1xRd95ZEZ0xx89Cha4r7QiRAEx72ai3KiaC/jXfObD3fv9KT7e+++qqCm4RsV9sOPlC6rZALHwmdfzwGxMc8f/ff9C8AgDjAjcCeCe+iCCiC8cjC+9DjhdC9B9hjACei8//EACARAAMBAQADAQEBAQEAAAAAAAABERAhIDFBUTBAUGH/2gAIAQMBAT8QngoQpSIgmOPFo9eU/jCeM3hzOakQhWVY8mwmwg0QhwhP43HhcrLlKUpWdO+FCYhMushMbLvIUuLIOBQcXg1STEmLO/aGmvBaiseMQ9FWGKy7R0SpJvzw9HC/nkhCEI5iTgyXsQ/QzZYpIXk1FyZCeFEqIo4yfhBrHobosQNDyZUkL9ZSuHWJtEPqOB9ZEji9HpDrGrjyl83lJr4fR0NExrGsSJzwhRsSO51kaInRprqG0E40kN9Dl4Jvuu5ReJJIKhsS4U+iz6WeUGkeshfBHSlwVh6Yka6NH6JEK26I84T8H/Rr/KEylypzJJBBS7NGKyC8BMa4Js98FYNDUIE5wdPg0/7sn8OlFlYjNVOA0ZVsomxqCQpopkTqFGWv+J0rK27EqQkGjEhC6Kxr8/4PTvnfClZYlGueV87/ALKUusPjZjyZSnCDW0pS4pSlKUpSlL5zzvghru3YR5B+EIIxCMj81r0onj/kh49a8wy5CMn8LnCIghGUoyEJ4KsteEI8aN8PgkoToh6RwUODS+bcavlRD2RhoPwUpThCEJjeSEMfHldePQXGcKFfnT54Q/Y1+HbIsOp5ETrRCEIPh3IinCIhCpDHsYRLUqOsQYWb8CUecGj6Q8GmhjxY8SivCujUY00MThEEyqHGJNiHSPa2JDZQwpcSxi6J/GIQahQkGrx0kJ+mJvSGorG7URCYoKyx8OP2JofWOBMxlMifpD9CUUwfBQiIIHwfsWGdvLjZ6H6EDaXoS+vHlmSIcD54NC5i5JI7ZU5KOikqNpoVIaJDlDd4uC9DQxIUR8HEtYcYYpwox8F9PCY+rhwIhoPFBInCehlsTBWEiPeHpDgt4yHrGx+KyDsaglca6JY9uqhUYlPY3RsS8EuCY1PUR8OoQXvBL7Ehtnt0dLoqilLyUaPEhrGQYveMeTILLOIbxOewScY2ROC5xiQ4kL9KD70RE4JDieehfhyoMa54mUkNhRbjHWJRjHRoSmJxT2Uf7iVijXCDXwSDS+n5Q6mWMXQj5nHouHY+MQ0L0Nv2JD9YiaVEg0PZjuXOjpH4qQaYkXOC/R7CjH1F9D5sfcG7ExKehvg+i4huiJpUehs/DwothCDeem9MTnRDRCYXRBYyJo4eN8EG8fFiIXKEGqNdJtCwpcuvTwyCU9EBM33PoNHCzp+/D74pVj/D6N0QguH09SjVDZ4vNN4uPo9p8GRY6V6No9EolWSFIUj2RF4PmI9eh+i4dxwiHYc/lX5J8EXOE/ChkhwbQq6emeycEp7PwN0QkUZCHyef+RpirO/4GLt8IsMO5wpCP0PgbmLEiFqE8n+SvSouXwaxMo1YyCFwjmGTKIcQx+E/xUrEFy+LesarxQXBkyDJ4J7CZf8ABSvEb8WjEQmXIil/4FG74TG5lKXIQ6ij/wCe/8QAIREAAwACAwEAAwEBAAAAAAAAAAERECEgMUFRMEBhUHH/2gAIAQIBAT8Q4KlIQrwY24pi0fClL+W8ITi2UpER4WLmlzSiZSibwv4ZhIhMQmIQhDRo0blxS4bLiZRYN4QmGekJh4oqG2KvgmVPFWabBNPg+EQsIYtI8EIIMhBEWFwxa4PYk8nwUonStkZCoc+h02JSCBik5SNjEsU7KXCWINpYQUH9DYnht9CUHhfwVCw3iNskITYmkNJilxjHTZWbZVpUV2sTDoT4NiwkXDGtj6FAmJjE/BL6LDLvhRiHuIaRpiQyp9iHsaidE8FTZtqZU0liLEk42WUUJbKRD6HtDPB7E2UfE209Lw7zDdOmdoabFFTaESQyxsvjKXQm/FSmiIhI6GaKxNysJhbYLYSklKNiRWGJ3WJGNExMV6Qn6EbQmmxNP9KlKXGiInBPAKUUJxJ50RDUbITGqEN6Ox3YStH/AD9ylLxhCMP4FI3bG0EBsNnpmnQn/mzCf9NuKi0wRGJiMrwv+J0Y/hBbwRSlKaFiEIQ3mlX7XQW2mdIRaSDRY3xCMpSl5RYQjNlZSr8TZS8asJ6Ep1HozotLB2xK6IYJv3Ew2sFwbSJHkJOEIRmysuFw1hcNhC2j7HpYVDdQ74T7Ei5wcpcsi0PVspCpYKNExQnxgpURgtmsVkNlZSiTYkSCDN5TgohvheFcEBW9sotFZsQ1oQhTs2WLYuA3BOrQncEokMkGpiHhtI0CaKsxIokQNImW+DXuCidIFosQ3BWxroirt9i8sWDZcOiaFpsr6DTexohE1Qg2Dbwh2LYmxbNm8KFsXQwxbNMTCGL4Nxj7G/FhIRJFDwrfZZ0PZ6PfQ7MtIUG24Q2ypuCSfwQ6EzeBKij2dPCFpKbwo3lBSCRM0W+zxWDQtbYlfRQSlt4b2N6YtRDaaNDZj1p3puSFHvCQllsUYbaYo9E6hphPQ3hZiJhtDkF/RtvSIdikNjGeQjR6xZ7Rpqj6G1sf4N/RJC+Fj0OdjWhR8WN7NqNGNUNNEitoQ+sIRS4o8nWIL6xp0NXoad0bTEjH8l9RuIfxYFrWCexu9HSvEronpuxCdebj0m0SSIZHYZ2ysdITGQmN1CYvCDcIxfD2klEOp7F4NHUM32J/CDbYolFDSKWnkl0yeYbM3Q9DD7ElINwXeGNj7HXpDkt2xMJfcQrR/Ymi4RoTFXgx9IXbY2dUPeKOlsNfQ+tCTSGrQywtreWmQEog2R2L6LSG6xKIfA/g/wCiPV5hBrCFmRCbE6z0bHpDTQbNBhexODng6jGgkM28Zwegl8Hs2eGXWNUKUgxZmDwQaxCITYkdF1R0qCRm63hBoIqT0EPVpPAhfwNxCcR4JFk9nguyhMxOD4Uq4EwnGLZCYT2ivCoiGo/glsWyzQ9ITuKIjrNrH2Lbwz/p2EslLS/huNEcmtjWEI0JvRIJrtCbZsSZopgmjSK6eA9FSsSIY2NQQmXMpr8tLwQhCEJhDZWL6FMKkLCpbNmxLhsZax6Qnh9E0aS/SuZkhCEIQgqiijbGJFgw2WiauC0hMYtPCELg3ifoQjCiEITENhBjuCthPHyUpKyQqjF4NZpSE/QhGSDEwyCRRDTE2sKS4odYvzIT9GBKcEym4mEIzZRBkyC/yrysf//EACoQAQACAgICAgICAwEBAQEBAAEAESExQVFhcRCBkaEgsTDB0eFA8PFQ/9oACAEBAAE/EEtllvct7Z+jpSpSg9xesPEXt4eYlhEzbFFoZLZBtjEBbU5NSzmKJqVcBLTJuWLSWO1dmpbKXDN+nuJ4JtKzXRjEiwwI6n8IE2zFJ6lk5E5DaN6/BzHDoiv+K/kJsgCx/mImTx8NZWU+CkZYtLxctK/hXyfeX7l+5ftPIlQrunul9kvs/htkTc58diVazDrfDqd2ZksacQMsd1csuKbriX0n2wFRBHL4m1MXgPE5IpykVHTi9Ris1E8KWupgl+iYu5eTV1Kbjb6mWKinjXmWcG6i7B5IdQIOSjxKhe3cpgxsOYpv8SZ5fpC7O5T4ZuooeiVZmFuKLPggkdn5uVNQblESrS5VD3L/AINJV4H+AI6+KiYiIjF4wsmYD8VIyo+HpL6S0vLy/wA1IIA0xKSkEYCXEBBxWAyu5SHzamKWmwmZWGVWSAJgWfcTIU0DllcCy5gvdxfFMcVLmzRKh0sxCxfUTLXilAXbUstc23qKlt8Qr7Vw0WmCViHTM5BqVVDeF1uX1nuYVnRBDF4CpbK63KYlXHxdQ5Kc3CBTG0e8MqVslpKCZoInbfn4uHaJCOUzBH383FRB+OUfI3sYnmX8pcENleIr+LlkpMSyPxMV8BS2U/CpUqVKn1Pon1GFCCSnxwzNaX/8ITCK1lMYgba5KZgzsVdwCtc1nMqVnajCLhkoHiL9IHEvTBeC4rIHucCYQHmIgH6BDX6ZKhZslnYg6jyM9D9pmysv+qmcgBk5ihNsOwWDV0x2D2Cz20WnXqUB6NOiCd4wGiDj7BqF4cuZyLwaZtHLxMb9o6GsXhFB3AuoHJwR6rjtqLNDO4U6gNl0/ma4KnBa/JNBvmMQZQll/AdeEst8tMFfC17jxY6IJgqJ+3Uu/EPh+UuVfEkuXLf4FfB/C5cuWTExKSkTFcRXEekBLWqhvhgxyBWMRrnQE2wjQKzb1cHXqc06madhV4lKaRuBppBzbcoJW3s4iU4Bq5aKWaIgBoZxOyUudpvmd37UcIQrTq2s2mA+4VWfVH7XLfEuVhcjUdUSU77igv25hvogQakPxKnCF56ig6BWccVGC7NxcYjygwXd59RkJm4tjMsVKNBuBqMrRG7nHCN4lbqZd9OZZtiky3RjcdpnNM6FJE6YmhMpEmGL9efgw4RCWS/z8ESMtQ1ZBqBmpY4PJNGibIjCC8/cHuLCv47np+bc/hCD/E8pS8MHxmNPluX838ly4fAIsBo9Qmd8syr5G44xt+4pdDqE+n4lPsLdswmzNfcDV1MVL3Vs1X+4FMNzOjygiiZnoNEC1B4pxNAxRU4jvd7B2y8ArcW3OHcGMhZrdwMAnXiWq7VdvOZnuF8wv0uJrF0qc4cK2xxl+xKz1qnuLuC0AmSErqNVYnKwDfk5h/8AwPxBtaV33KFNfmJaPue1zEUZXCNunmXBRrBOYgV18rPY/csccwV7RjIT1MH3GOvEPw+Eifo6Mw5g6JQoT1xL0G/MpAANG5cPoVUo3vO4HicxEcD4lnIfMH6+dJr4XC1ozLhmAuW/cUGFtWQMKjxDiI+bYVrR9yjddbUcbVpNMEvXqKdMGXLly/4kPhXqMJ5iBZBx59QtipyDGMs1MOPobZjhjdVFNlBlrMUYXeNT0zK44dbZwTOuFFcsYlXcLf5mFuURupgFw6jmAu0eoLg5I5VicksDAjlLE0sthc0z4Ox4hNkahWIQw1CuQGzuDC5f6ihs3W7MbOGaSoX5hiNLDmHUr8zADlipmeIE0LalEdaVLZW9otWSvUE0P4i/tVKrLPDcEKsD+pZdGTTKC5tmpaE07lDcQedQK37JucQ24kWJZHQlt+SsJusS8AP6mLBOzmEBnjMyW7E8gdyi0bHUKrgq5/qX+GaHmItacJqXfuDfipcNs+GVmDiZZr9QSJTTjcqO5wdRBJVVj0nultqIjAZRgh/rFFOnl/0gCacPEInZYmaMHDuWjXUtLy/wGDAemDS0Hz8LmdY7nTIYdzaxK7MTcPK2OROSp0CnLLhU0OTFTVPXMsvgIwkeTiesVslIG47ceYlvLqGVf0qKKJADGAy6EWJ4DAY1OjxlUVb/AAqEKaoOGWB4MVKN1XlLlTImFXDXtfSYYDuZzwCBsgPEpNwOeJlc3hcqcb7GbRzD/wBWhh1OR1cKU+lpIF+U4GeiOxeyZN+pVWjhRKN+BEQlWn7cRTZbw9kP6/qXmueIUouNI9sEaxfzygwj5bMdz4AQClxOZCcKB+kjmW6ZGJdbDDL42RIBZVQnEsaX1BwujxLGk+GAEhray1fEsq4C6YQk3vdTEPm4hoy6jk6d/UM+TvLOyk5IYFXxqFV4fJFQUdhAK5cuIq8XTqF7a5coIOSAxi5NkxqwQfIqlW4FdQ2EzGUsnCRPELKdRUNZlrLQKuDdVOsjdhKS8uIQz2c73HfeWsaXwftEpd9DGWKrPCU/YK9wpd1TF7VPNHOZ3A4ZRFko2sbw2OBLLgTXB9IVlwO99ymGrMha8f8AsAUnqf8AUwzaJcJqXjluWtw4LWSlUrwt/wBRp44CZt6jsHK12fbGUCkdcxFt7cRWSXHgltPNYI//ADD8SzvdfqYBqnzNjeuYFx6rhBoQ8CSGUT3A8B5ghdHqaOk2MH+48ig4CocJDZDOdUWNXSQbvBzAW3WP2RU+AsnclmYbml6JgLO7zDzCUM1vuXQV2h9Qeg+mbjRWHccBGmYsFOo5jDHDEIPUCRzpUrnuFb/74gvvMolOal6hBDlLBKvUePRBY+oGBOGWC1baFMjierZwauYRX7hb5+G5SRcuZZ/bixJJRa8z/tcMwh6hqJsApxuJ2GZQ+iXYpYcubnkuZaFcIRSs2vNoVHmr3LXNruNTQSiLWEQvoItohFCjLmHSefUw1ly1QSryt9P9TBHI4dxOTnmNeOWDmebguphgmF7L4olGYJkUIjkoTRqnXuU9qUaHa4CJvSOyPUlJjUrLY9pakKEL1BTwUZaEsi7o1gmQaGvMRBeT+4Kqq5S8kowjjObgYi2L1CKQqlJ1MK633H2P7IoZFa4TBivAgDLHhuEso4GYF4vmFLpAKz/uHCr6vM9iO4anQH+mYtFeEy84XslJP/xMyq3xniJf/KQ2lhkuFtFGUd7hg3fU0B+nEBxFRdKUghr8oB38xt514j06zuW5sQe2+ohiSECh+JQBxTc/qyROkGk+GPtaThhQ3IouSHB8hgHzJe5+BAr3L6saV/qFegcvr0R0wWVU+rBFzZi7YLhp5eKnSC8oE8S/L1Lh0n1mWcoOyJ65bPM5ceppW8XMRaa46lgNWwJUAauNSjsupQLEogLBlgPdlEG9eoM0biG23SGx24qOnMlyjHcMkc1iAU8nielhBs9w4ivPENTod4uc8h5S9ocSuCAeE3wfRG5IAgDAtgYHB5lu0KVpKHWbTkPEWCkXZnAEOSKuWaZ3+YlpVygyRKmaliTHoi2bh4RYtLUr+6AXCbzzGws7m+hvlK94TMEupgHG2IC2LOIptTuBkkb5y9+ovIH5hUOYZlrd8WSzWRyj0XrVxni4luM94DzM6z2S3U0Rjt2B4ni6w3Ml9zB/uHXwUGG2UI5EsdOiM/CZiY+B9wI2JwfEFsA8zL33EVL7n46tqAuimG1igNi7IKNUcHcqMBuopdbxXMvAHRqYMELY5gmwKvhUFeG4sfUNpl1VRaR1slApanhFoUTQwLlH+mXxcNxsVTOZeBl4imDl09xnNZ3/AFAKtBFnF1DvwdEzDR8yzTZcWLaMVFSjt/ENTlM4ZckXBYQKEWbIxFWj9xZrPctcOonjDqKO881HY/KMLA/K/UeN82GfEpEUXDhZaJitgtsApbRfMqA5jTPUX0jzposteI0cvnlmJs4WidkJhsYXRkNscmHF3dRH0YU78TLa2/uYetC7imE1eCAp5I5zDC6uT+iYa+Cr48zIBBCZb8oFdIwRqmZKJoDctXkiwB7xGS1LLauK6lWz8x3vJzFoDbGIh5TVIlqyMWNmIriBuAH6vAVC663O+vD8bd5c/SmcckoHw43FPNLiAZC6RLWYSCMqiFWF4loYjwfkSGHBWvMO24CNRiiUgYbYALWQD3bZCvZ7agtCjOJv5Q5JSFH4j97JLu6kIumv2TeH4Yal0bOp5GyMEq6dnrzH4aWb7iPqW824Bihtcd5V8MACylTCmccI0L6xDbFwcpVxAtSehLgoT1E/6Ud78VjcwITp/uBkAN0wUIHadn3MnsTfPiUgKv4QBBpqXcVBoB2J1PaoZNdzEDbdG7j6dQFKaEVb4uKoWB9ksj1r2EBOVqV2QKywluAhoEGFNsoOmU+FxSUW3L1HASzMaPjHVWNXAUocgh8qrK8qC1NBtnXMpXKvELSjrGCPFzTGr8EXiWO0KJ7Ji27vnNSzK1bgGtLoyixSURsmK2TqVUYsoo6eohwfDqN3mKVwrmZh9kQzjwlA8x4GyWZuxC8pZtE7zBaqiK4fTfqPDqWtpQ51Mzf2lCtMODxG8ANupuVeoxKiqw37mNulYIJSTubymwmeH64Zov1Lq3cP3i4ZWmyZcGOmeiXtbhTIsJphDnmKwC2HpFaJQ7uoIKCG4oe44mXuB531K8ZR3g9Qq83FO1VCpf0iFsIkp18bB8vuB3eOdFXD6gfS/ct6Rdiv3BYlGFSpwQdItpGx3Xm5ndi8NQAQ6Cq4ltn4SunpWWSLfsiitWRu40syGrJK2v8A+BYslhghuoyQv2JNiq44hQSnCVK8jyoXMCsG4NgcjHVN25jlXHcfURhKLzHmQFu3JKA+yULARpmjYTbUyliVil7fNyz0jd5zMt/AF9RjDefEcAgskTUvJiZITmdTJ3L4lGEXAZmh8T0/EsvN9wiu2NS15ihdnzBBU9wxMDsgllpP7FilsyDNKuIYOp3EHizUW4TJKG0eTiard4zzKW5bphiMxY9M6qjrClt29TZXhLAaQKoUZiUPvDmJVqOSx8S4e9NRheMR3/IRpTyp6vwS/RP9MKB/63B/9QeX9J8JI3Ics3+0CaSO0ED1URlYqfSnglzUIENDkxA6GGkwzIhFjXYk6QHLK1kNws/IIazRj4xGjhuesczLcuty/SgWnfhEam+45rIzKaDNyyPfxXuOI1iPuZHqPb8TkR1nqWOYXi/C2wsY5pjVTF3xE5bQRRRGpnMRpJvJkWXts4RsOxAZzN1PxgMx2SM7Ex8T3G423uBLBByHwq2RBkKhOlCYxiWb+AC4NlpNzJIGCeYGN4+ECI4QWaLPaKMx/wDhCjzT1QDX6UDKTAP92Yc6e45D/UF/0xsjj/8AxQbr7i0J9wPFMTdSmX8wKz8LsKYlxg6iFC8zj4dRGtmmdvtdxq3ucjX1A6B9RNg9xNYS4lFyzklS14gDmZfiKJCoHfCMxcpglbI1CkoJylTmT+BjaEgWQt3UWgW+2Yx5l5ZQipNwx0mYxgHslWLkhtrQjcqhinMuM/FDQdHErPiWsx2JFQOCLq1ETMqrZ44vfqczHMJo1RRX5YCxyR3/ABqVK/8AhGZfCPiu4ogGmoBFoJC7/U5Q4/JZyXOUGK6fU1kdEn3AOpSWSuhHeDL8y64A0sQu4+cuMW1E4Aw2I8UTyTWoBnfSPVY/U0tF7lSbYhOIVmMct9kENpZj2IJjQjXUq4DKeMTN8RgPcmDRfZH33FL4uCUZku5mvSY8YYjOaJpI1VKLQYhI4sxy2pYN4bJZHf8AKv8A4h8AiTSPMfkP4W7nmlpeaAvgHtrnqUch8GOYondPhn/Uppm+56PgrLUrp8aiomGag/IE+liTmwiFvwYoRleRjiTTEzHJKvJwy5duyEuE28TOzvU2saRCl6liiiNW4ciazMxRLrawsJ34gN5juKa8wtIKIGwZOoMKDHf+evhCP8nTCSDCNweI2/8Aitg+5eBTSF9wWph/8Qu7TlyPMl7pEfFDRFgnM8kR8iocy7RphMG7mkd1wvcjiXkmA8mID0ERjkVHh5maMDgmyA6YpwQ2dSrEWAYihdQFrLX8EatmBjv/AAXLly/k/mr5GLkS1fGrf/y3/O5aXl4SA0X38BcjsX5zJiAY/jBuEHjyfBZ4lDM48Ijv4B5ysOCN24ixINcyoLqRAwVlLqS4xKk2TIO47/wXLly5cuXBly4/yZn4qVKlSv8A/AQcCahgkgrR9xLVouU9JNoTLyrTNA4WezBbi9QPPwROYjmDczzzzSzr4LItwxBQRLy8Qw7Ncx3L+bly5cv+Yy/ipXzUr4J//kIaamOsHuWv8iCLly5bKoFy+IDzAufkIRHMO2HbDvgvMOyEFzCB7e9sy7BPQTctlsuWTY8AbhnKin+FQP4h8mv4qlf/AC1/OvipX+W4QMJUT+NfFy0t3PMwHmBc/Jlkau2GONEaE+9jFfAkJsNz9nHwhzUw3GeJm/Q8rjNh9EBwJaJXwQ/gPwEPhfnWlSpUqV8VKlf5qlSv/iX8BWJK+KiSpUqVK+doLnnE+ozihtHwfHllUxzUrRTBAvROFgNJWVJnSXHLZQOFuoPhg4ZjjUr8BZoy8gH3/ZN4H18iBGGH4Klf5gAFvkqVKlf4qlf4a+Zv4cXw1KlSpUqV818EuCMVDhGoCxubYQhP3iFRCA6YrhCU+LgKJ/RWfb06hiUiZ9MA3KD5iZ/p/upNofcWak//AK3Hb+4jpf0RZwD7l+SD2U7h9z/WibApUqVKlfCvhUqVKlfCv8wfO0NKaVPCfv44bJEz/I+A+G4+BXMqJmVKlSpUqVK+KgS3OYQtnwIfD9ZNZpAa5jq57aI54OvjEyZgPcpBlDNQ0C4QUgwruFJVgyspLmKxXfcXtvqK4PWIhj807r7IHSTmD7mzg6x+pX18VKlSv8VSpXwPjAwTj4kkRxAHUCP8OtLxYkpzhgFQZf8AAVKlSoM/Awhh5h8Gp4abhJRwxLDtAXLboc0NjFxfGKGYq0o7SkfcmURbFGP/AGGl+qvM7B9xXVku5+AFi+DbJp+EhFJWIiYhm0H1ONkbrENEGqZ3mbpx3Ia3Ll/wuXLgwYo8yvyYcQEMT+IEnBYFSlTWLLFmXLl/4DcC6gpFmD4IQge8amJtFapOyCWscFCmFvnzOSL5hfCFjrmMQ0blY4oXiUN3AwAs1yhlkqxtJ5r3NLx0/ALS19MDcKl7sJWWQ/wVKSsRExbY/EfF1CN3SIx1WfgLsS7Sl+5WVgYXcIYQx8Mrlz8F/wACHwfwMGRjfjRR58T2pcv+W0XM4rlwy1CEIvxIgziqcVUs0MZMNPCmR+SCdx2WKcobaNyiwnVBJRtlLFmDfJB9WzgJ6Juo4rNGTKS3Qmli9zHCeJyAPJOZ+aVZV51BNjZ/jqJB8wCVl0UhPGKivqO7Vc8QmbhO2jGFNMX1FtmbEjvzVlZSEH8ClB8N/wAJ6RCraFshM9xP5bR3/AZdagxxDTcSsT+k3srjgm81MB8AHYx6XPwU2i3aVa/ALJBbGyalZIzTD3wIG5UYPaBNw08IppJD3h7hMLf3BzNRgN4vX8YP42SkT8bNsno+ECX/AAZSpQRETFuorwi8K+ADDa+MSiEIcS0zLwCD4lmEi/xDghKSlp/Mdo5YZYglPE7bFaQ9yhDiL3oR3GbqKv7h1xXUdGFmgiHEwRzhWR2MshzBzuNG47g5csyhupF8IhZ9R+YvmomHTyb0ioUwpxY0gScrC0vr+FSvlcAy9A8DcX4xmKzF/ga9mO/OAuFzkX1ms/JNqGUNyyWfyuYiQtwRThFxmwLfCBWIzYirUrhCCizClPjlJZtKZXztKXJ16hVBEx55jVHOtXqKuMHUeeIxlg5RslyI/T6VlRlHvKQkG7mBJsi8ATuKuvwStoRXxcsmXH8hsma82YwSm0CmMP4L+KZ5CDpCGSDJVWhMpEdJLtQt1Cx1yt1KkoS/TKTCPuY/HK9U/HeuxRK40gljyTHZ8GVxURi/BJZgYxiQw49m040wKFMfGA1O1qJMS7zQMHh6JfqUlYFwYyZz4gkzTDMbSpOmgLpnCRBzS0B8CBWOmFiWMvVZOTqK8IxXEyDlgP4lfxt/BEqPxzUANwLmYsZIjD+UAWQEqVn4QfgXyCEICFiUy/4Go2GCsZRrE3mG3AmYNSkmV5yofF8z/Tk2lkqa5E0inAml3NOuHZlJhNk+ghMsYIgDFhyGF5B+oPaXwMVU68xbKXXmErs8y2W/C8y3M9/i+Bs7I/8AsPilyqN+Zaj2s7AmawdTErEcbBmO2yz2JgnIjqRmZGQ5BUVeVUrLpURfBjbqZzZFIyQ18QSyb3CKHwBdSiDcx1RqExNXN5yY035mS4wJD5U1BMyhqXCr4RrqZZ7+BvBLcC2Az+JAbD2RRVlMVdcx3n4olDF0mUkItZluxqUdS7Nw8TEszGDJ2IVOE3gSOpoxa9ChIOmM8R6hNpDgd9ZnKdsioWB2QrmGMzAcs1LJGtIbIHm4DREcSwrnSSRBdxtz6ngWyKcJol8x42Zj+JGNBzMiiW53CGhHcsvYTDt48CoGhmMFTdX8ROUtWrO5kn1RL0ejuWQKItqW4gRwRX8DFHJAxCuZl7E2GkMGBYSlWHTL74U8gIZ8wtB2gQMLUoIQMvRUuWlHXEK/adSjvsgWopNUMsNpkIcjEwPMzCPZCgFxmWI+YBlD7sSrlPyYMxa2sBQUEFxaZLmGAEdCjoQyKEmPrxEs6jtmEutw78CbEqCTMtu4OBRHoaOCK6yh+6J7ifBGYW7w+hDWEB1MSzBbk4hKozLpDylkbPt6leIc2wRSFjoh7ITcjhR4qLmNoXgrxBDIcI+m4ZDN8xD2ieEWYTe20ADtuWKcmoWn8MRJttRhiaS55TEECodzETTClZT5kIxTKNx8OIiE3v4ciNU1A8xcIr0yxB8Qgp8wQ5FmCIopC8v8bvEy8Y47iezqKadv4JjITnSKjnOYBNrqWO4xF80fEBlsmV9it1BNoN3iYH7JaCFQgpKjvVR4QXhn3YoubSRRNM1xigGWUtpcqrdQRTY5gckcnJxE2+iLJdNkThjuZyKJuZNy0fTE9DPLRj9Bl6O3GIePf1SEy/iIO0fwSx4NMRriNW40Ll3EqlkDeCAYzKrDX3BLKhdRopxmOcbGaRlYh91YgJK1pjYMrTMuZTsSxlCPBEPIynvcOAV8dRM2EpgED4CDpaMSnq8cFF4QDyuJVcL4gnPgdNO41lwP4Bi8Nyp8QC0zMHiKXGrH3Ub5JSwuFJBFobJwoDqMQ6Z384lGncLy0wBzXiWkR8S8ACyxjcK8RKp5IxPusa4GZQ1AaO2O+GB0PaDqYU480uKy09S81aWXg5hlYW6twM3UrzzxM5oShcC5Si+KIpFHpjcEqrBvgjkBizRUC05e5SbYOIhSoVqGP+YBCmxmoOqLYdoaOYqA6lnlzL7lmCHtBtaY0ODkjhOg3MMtxFcv7JSt4qP9avzHC11km8d3OCDf3OcnUFHtQ17m8ZuWbqDvqBdmtsGVugRLdIJJKu3coekPgI8AdzTHhMS2xcK3SL3KmV+A+k8+LMYNZms5lirZLqNvOpZ2SnMxScWGUNQk2DMF9lxK1eL1OFk1XjUZcqEBG7mkjyZUnTL/AAGGWxWpa4g+VbUTbETZxGMTmZMB8DiY5Kjh4xBJcEM/64bXiVKkdRvMaqHqcy9HXKJiWHNylXMgxwhwC/hN6BotBimL7FwBUpXEsIQpyMA6DykvBtiILSWoRbANEA0ZccC/ErI+YWrGZomGe2MWckLxge1gupzL0FZDqn3HVMHManMAcjhFXA6mH3zEMoxnPU3CwKuVMV1Cpqe45nkEOdo9y2xQjU2IHwIy4blq2ZkmGiMDY5mD6C2I2xKuOXhAbQsps/EzYoMFYeSdbC01HFYYQ7S6jAKNSkDDLiclA5uZS2VilSpUMenKPjphqgHlHQrMb+Vyvw1B1uGTplE08MNA4wxj7xGAoqJoar8xMlDSrjVjmAakXmNzCajXcTb1WsRWud6uH4jDC41hR88RkqPPTm3uLPUsqExuIpos0zeufPDK6iFicXY0zHeUS62CFUcyLPJQCUo65lR2ss14M9CjlHHMRn0zFhKhGTlZg7K8ojf5mN5blXEVpUsUnOkVYekLBRUv4pbcYWRQzKcq5orAVUCG7jiPB8RhTaxYL4S54RxW/OZjpbI2lUOTHBcswCLdIMXcJBYBtam18K3p4j9CMEwWe8CtphUNpggqJSCUiiXuYQ8zbqP6MygFrmGgw9RgercoNhLaLGDWw5R22bYw1goBVYEoVAYntJfK5+KHuCbKWw0MyxXUzGTKlQJRa6Jw1W4jmsBUxWBGsWVuKmIpJbP6fG5WLQ85Btq2W1MDDF4g8S35dTEGMXV4mcKea7jlab6gH9X4xGNbtjrBJcG9zRyeIe0Nd7Eo9oVPjaaTkJt4amR+jN/mcEZ0A9KNN/BVK8cxJreo7ZzATTleI6NzLABhGcxBn8QBV5nap/uZQCZQcItcRdp/qE/9grqNJjDBKUeuIPeTKeSKbphvSxaytbjmENvibhDyZXbxYX4UAqsVEUsrEBrmUqQx4eJdjjgI6tcIEu9Ze+KdEE8gyIygmGYgFSg+vLI6ik0TmXko4WIVujo5i1AjfT4HytZnX9Ul6t6OI4g7R/FReUeJfwqOucZivWgJ38RBCVWu259QB5jhvXUynDKosvdx7uLJ4jlaO4thtA0dRbqz5isg6CCg4YlIreISx3F41MFgXlggH6lBRuOrI22OMRfI4lq0/Xw0cJ4C2QavzfAgN2Qvo/HMd9MgNMHiV7hmUvJhiv0Z8kpPE5HeCJhDozBmYbbiCJtZW5FzLcIylsSZGYfM2yxTvLLayyw2cwa8UVRU1IipXuD7iD7JtcHcLnWpWvklyqYQL7yzKS86gVOTiIfsgjqIbS9oNxkNsusEJbUnJL5RcHmOVPQ5il0Jq4bfpM65ywFeHl9NLzENwcQYZQH6igm5mEbKcSqK0gS/nXo9QUDUVklfLSNh6lmygHESvAQL5b5jNlgwxFMEwxYBm3UfnkhUgXLpWMVKC9S+0V3MvV5F7jqfTHJgDK7rmWVjEzB/4mN+3MwWZoYUFq5m3Xt6hA+G9qmI5nGPzBQhplfpFNbjTDoyzHWmm5au2sdeJbPg4EpTzkwMR+pYGOM+TCeonQKzRDCWIeL4e5jqC3KAwbTqkBY4NEYrlliEdkoU2EptGDTYqoTpi4PDIyVXHErV6QzCJUVElapgGOzDszdSvMCb5VeEEs1gIDa7KAw9sK3CJmC3RmKQBvuJallcHUuWku+yQi+litr6S1GHBBQw5PSYgx1RaJ1jo/gtFzUNw6SHSufcNUWWCOf/ACTMqirmlhMPiAsTkwUXcXHKDdO/E/8A6J1KoWvSOI6WIKcmNPzRBwsWSZkX6mvitjNQCO0zcsAm+ZuLYXPLbMRLJcHMu49ShiXLf+zWk+0V3ddAwCczitpEWN5IxKNKOoCD2OXcoDKcy93MHvRzVlRMQNmNGc5IngDBmGN/F1TEFFsEN1y05ELt3KxPc8JlukvdNdzxLxHtKOCBhn1XU1eNRxmrmAJieiDUajYATDLo0hvfUTVsDEQX2QG97xMMzhzF7hiEcMdLP1HNYdNQqmpz4mEK/OPF9ggSzftxC9we1coLoIpU+06cwPoh8yuXFdOiHlLSmYCeAJUDgXyRUrRx5RiFkUeINfyKcwWIu3TiWyj2cSvZ8RgJ/aBa/HF5Losf+B8ZdZFHBMeAPLUuggkfYOYXLQkaG5zXuVzWeu4iWXPiJzU7YD1mGsJnx4mGIL2ylEDxL104I4baOSHiIMsZYY8xr8h3zGUsiji4FimVwnBd1tg2CtcymnOvU7CzaJds46LmGshZesCANdTq13L52nhJiMbhsvMuwZuKtbmNDKValLL6llKll73HyntC+OrEbFW9TZ57l36glGWWtdv1MNu5uMNVRQU3Ms3YjRudJp4ow1whPaS1uxKRtj2zHb3FAeol6czQJdsNVQFEA3uG5g/3AqYuDsi78lDw6nbVRWjzMV5Y9HTuKs+4QQCUWeSF6L7f+oNupYiy95cshsUZ6wLjAXcvjzLZ9wx+ICDIeoWeZw0uFSyYSWn0B/cU3XggR9BfwnLpphYMMFLlgy3t3FvJc3L2oWh5xPqsrt4FZe94ILDDuy5vJyDfuZa9mUZIZ9S82P7RpjkrEd3Fc3j3MYtghYOodql+KncGzuZtNbWuYtx45QjoXcOxuH6aHtcwoQqnsxVbEXmC/XEGK8Q12Ze7XuDJ3H1vGpTyTzynE6gzDQX1GxNdTV6iBiMBc9kDvHMpRGYDY6e0Ehw4eI7WWvhCX5hDFUblEX1DTe6mfSNoMtrLreThmpFpg2SvitLgA4Px+aMYJ2iWvRGnWMQY2V4hubMtsBH2xfU4csv9/AwjVsLEANQZv4CGcHM/KJEW/wBczKzJkgDrZteiBg8UeWXwj9TFAqrcv/kFd3nk3OXUH47RCYa35ZZg3KwPJUJKMjD4SDLhTZXJHV++gTFqXuS06gjSBOYcd+0Fq05rEV3dYh5y0plblhdSiMUvAJvA/wCwm2sPKXUljQ58IQfBPcEA1Mrf3FGIbCMnCvpmLpJnMsjZ1d3Cvrtj8K5hkX+xONNyjIE4Zb3EEiyDLMI2bJctcm+Y3Yc4iVHqDR3GyWph5ED2iYA7M1xxKhYQ0hNHMKt3fiZGur4JqeOMZqA1f+UFxFXdb0PuGVAnaWCjFxclZpuUVb5PM2JlpLUGggZAGPUpaMpOVy+2cLDo6iwGSYatvPECGTQl6iV1ESp6KhUjqK4AmaGkDxNmUDKANUGidxle55EjBpGVQwdKQll9bS/1C0YNqiWWDMqAPAvgmUz1XyzUrO/CLVbbTGLQrrhgP1RuNhtfqFNwf+okX8tqJ0B4ilWvoQ6tkmdG0ZZpLhoeMUTBM9oThTzxLe8A60HlIWr0KjSJXkuD/smfMZGYYDmm5UiMsyldD0S4UVLAcdJWn4HU2cB0dzj0LnCih/cQdqmIhSeTGymg5Ymh4yZBxWWGuHMLs3EibJ1xFmv4W7mU6g84RUAXmCMFbeojTKcSX9CwMxwfUYzXCMdK+zqCbaeIMA16xUVFLUbIilP9ZfptjoxB1VNkzVUcJPuGrfBL877hYO7jgwe1rWC4RvygjhEdp0PcrSsuspo15h7jL3pG10ynwjINmKr8y9C4rHm5UmlKvxDsWuo7va56Jlm3oQ2Cl7DYJeRpqP4lCjbHuV8WrRGE2h4Idzar1EkwJhPNW7WX6J2zAQOw5mCr8s3d8nwJ5epUcFxt4JkqFtgiAK08Ms3+GN2vOZywPBO39CWvzFLHQIVObT2if3RcttfxDAUVtmX1bfNMscKuzgjrXcrmV+t/M40x1pKqjfbqeW3ljjW/0Sg6sMVZhWPuRh3bPEBbFMIiVJvEOWX61fhRN9pkviBu7uHh+k2xzOkximEqkVHI3qAipOrM7iUxMsaIg3fCKoNzmDtqjKkL6nLez3GVyOBh9OJQX0t7rwSrNTp/cCugwYXKNhDe3qUHhYqFO0zprtuMf+kR/el5VLAa1hSQi0cC6dwY8Bo5ZgjJU2i0ugrGMd+42dFg5fcKL5lxYIPHL7h+CNS1hZ/ZB9BcvoFXSKQctgChKjNB9mWuq2C04hFzA3BXR8UPdR14BDomoXcD4cpypatArFTFkFRrbCF8zQ+FHb18NEV5fxHXolmGy0PU9mC8v5lXuUcUs7fqAYfsuO/9R2PtTvN4n/BIVZL6Inz+yCgLNumOP1uAh9IIUJn/AGMRaITfcOb1xm7oavRB229y4mGhFNKmDsjUPMYO9g8QpP8AqCmLSv1cOLEgEbwafEQktO2I3LcytHJ8w9r4E4cLslOHcx9vEK5xpjpjuOb+pz+NAhF6RWMIahQCALlguy5hSoq2l/8AZV1cZtcSxuSI4i91UHm4eQZm2Qeg8fL5Ya6EybT3GV7LutkfXuwx9sYsHhMEiwiOcIIScA0deZQGPpzyMqpBi7DyMqbmoHnxgI5CKoRlGNvucwNCFv3L5ZRVnMhdD6fjq1ml1HcdqnCQi+o/CjDwjmPo8tlC3GXrtht9PsQe5l2OWChwblUeDmFU1UaCGCeLxBiT3Hk/GkUEvn/hPBJehfK5L6hVxc8sHgeo9yaq7PDHPBglvDSAS2w9RKzPuF6nRP8AauYvdW9w2UZfqA5X4ag7DDuHwBYQ7jwjb48TMNTcpBl5YbjbFoA+YxYkY6IMS4nVThf3EVG6Ge46X50PcbRSAlOpVdFwg26iIhWcMniN3uWYPzGf+JdqJFNWzmltn3NVs/8AXmwDZqI2MjGrUNXmN5+6QEBonmLHHVzk15mEPCuI4jXUMusvA+5XWBt0j+YR4gI1Y02Z81xC8aXp9RE45d6Xj1B7O40qDTx7Sj4Ww485YjZV8l5mTFNKvEZ7rQya7/8AEN8AXLsc5hOJCfRgo26nuW29TJuUyVrb+yPQdi6QXBR7Eo7BggqfuO/HxVM5wJLtf3LoxmhmBjcq23fxr8G8hCnAylYrAnKS0MGYNIr+zQX/AEMuuI7E9EVuL8/7ymnNkxYpEVkU84JnALqmDV/oIWRisiAumjtKE15BHfA2/ANeT6iYehCiA9BbLyQ7BCqdP3KYW6ZAPtGNsb8QfLmVWWphGYeRmua8bgcrzLy0ZsTNUrasRHqGtmFHJ+oZTYa//jOD+Zxmb5k6UM6uDlewTbMC1EaqDOJiB1twS6+Fi4XRJ/6SyW+4LYtuzUo6Uz37lCBZsHEoTV+TcOUEz19wuKxSDfuHdK0dSywuNQP+xRuWFmXrxjEtG8ZIaQ1wdsQs1c/DBOhvQQ4/1LxEtq8vMPvENQCKSfZL0+ew9zKl43szmwAO4V3b4uDOGK6ecI2KxhDIZI2wN/aSkQJbrHCNcsucsMjR9TlpENBmxSC0nkl3T6gSoE6SUwD3L4/dK+A9QpMfZgNM1Li79Slz6GiZsM7htPRtLaYxgxsq16NSqyx2JzL5hK5F8jNPAYrlHJwfiUAE+kxM90MXL2cP2Tff84TWL8s2Q21mLIcktDW7U3OK+EiSXBysP1O+ho16nCSv/SKoJ9Szi1R/Q1WRCQYgUHiKLdW7qWoaB/eXmANoO8QrXKt9S9ffhqYvsSmSnw489zKoombIyPMoN44FhHJmxThiFOWnhgAJGV/ce4gChYwjV3ziLyjS1qJqcn0kKH9wj1MFsiQyYg9H/wAQfLyvqPdix9MwOQh6cupCAuzLC6Ke1YUFSvK1ueOZWupm3seZiOBCz6gRaczMiTbbD1yneEjwYEzFWst7hXj7MTxT7RXg+mGj8hKV/Qj+ShdEbRy+0ORuC8sCn50Xb8ReJeMHUVue12x70dRAW9kY3beZjClys3SPwqrofUHMKSsMoF37iOf8T/r6l4Nj+pSh8VwdcdKokvx1kQ0hHpmUj1kYafWNzi2uUL/aObLmVPhbVQcwAtgNEax4naOa9RD50lzkrQBvMvhzvwYL4LPb/UNledUvpj87G+DiEsDl1EBMrauV8UQQ55Xbc5O9jDWAXGQZTqg0U3LrSkaMnlMKIocGK7Ets8Jd1IPc4kH/AEjOzh+4Geho8svLOyGqlxhZNQoXA0Rg9H7IBfnau5gKmiO6mZ67RZ/oIiGV4P8AcXMxy8sbABbxLRj8TP8AfoQ8886n5XKxEFDxiYlyUUOAZdzAUF9yg/pM/VMuP0QmtR6rSJKlSoKaYf8A4xAtfdmLyH01Dnv2Ik1B2oJtSO8pXMt7hTSe4Bf/AIyWLG0dGUI5IxQ8w1KiPlyTKsi2wfC/BRPcq+lbgzsP3AICFetHog/60q7UoyUeGpcOfztFN4+cwbkE7Iu4CNhS9FzVUCoA1HFAQMg1eIo1t4cpDAJJYM5hsM3kPMwkhSXqq/EOoNY2yuJFA1Bu8R7GXoFS2XTY/TCouHmObItL/qYhhP3E3qa79CGlDbeRwE7Gp+INzWZGriNQ4XAToMPmLxA5ahtTnE1yCm4jWQNdwNoUaEANmU2GjWogYpRCslMp8QJ6/XpWZgsTMF3XqAdw5ieUyrKzukiwprAVhT2YSy0bzBfuJMqDtm0lzHDr5nqnErFRJXzX8KNMu8PrE/2lkic+g1BN37E4noR6KlulA8qZS4DJU5eh7l7llLZKh4fcoSx+CeUB3DrE+r1MEUPD1DzfzP8Asp0fVBwP+klek+BnCPbMWQOril7zLqnphDVIVtC4OIQuNqNNwleELABpjUGnmUe4UAT7is3ev6gVDjuqTV7xUGcIEz1VrtHBscDq9wFt04PqBoPgWZW+RcQrDFjfiC1BK446idbD25WFB8I9e10QI2GGOek5vORlqU4/Uas/acI3GNY4zH0sP+M5gZrxDdEO8dEq50jmFLjM4F1GDwsRjjmDgfUunGRZqAJussd1YMDop15glVBgq9wNgumUPLUML12QTtiSpX8q+KlQs0z0P6mk+zMt2n6g279oCWNnj5xEmCE6x6if9IXf45ldwhBl+mWtP/xjRz9eovcPco6OuZZuFXyUbGD3Gt5eobvtQMBeT6Z5D7gDUj0QnvOXJZGH+jENe7pH6ahBVM3iG5t6WX1u57UElVP64lmq+NKlmZfxDMXSWbG65mtoSjFoi5dNv9iLUguV5ZyS4hAvdH4BbGmA2jy0Oe2KsAYCLz8i97lIX9pUDYxD+BMkdPfe2ccYw/cBsNBLBHZzBpBzBW5MWErqXOdF+UUvlmFcx0NGAgimiZaih23Bdw6gNzN4lwZajzsP41K/k/xLlwPl95g+R6xDlv2IJkXpmPU9zE2tMfE9RDODzEe3qa8RV/ctQ/HG+VO5edg7OIGxMLbwTnGXTqU29TM7/wAib1X6mouY+QzfqcM6L+5yLYTVMQHwCG4EsQLmXh4pbfwlWrYqEqRnUpvXuWOMshQXjmCaIsXAYo3i2vcrcSeXJTKrjBGMxvylM+tF7i3kB5ZTm3sqOzD03MyH+kOPLzyzS6hoBGoLMDL4h4xxeUazmtXCYC6DBcQyvtNJNTSQZpW1cM6KjFEILkILSluVrJ4IP+iU8WZLgYRR/GpUqVK+WVKlSpX8BTU+k6q/M7vQwwff2FkE1p9Sk8e5Xw07qL4/EBV/aTPUzL5/OmZM67IX2y6UieYKfrgTyRXpgq9+TiYQel6iLYQbiziLygtYsZtwfaHITiSnBhbNUVOEvOYec5EfpNKjzK59LUrhA5no1yljKOOo2e36oIeGktj4P9mAAMiDX2inb8aKiuc/WYFBEmK6ibX3BvYiLlYa7pf4h7h9jCyVEFyozvDiYpkgx0nHzxGvk+OuK+AA25gisRcpCBdVglnpRjTwgqBc3zVHwR+D+FfwqVK/g/yLNS/OZoi8bJ2D1lLt37FyuN6MWOceyojDeK9RLU/6aFUst3j3MJgDuD/qRAxDxw6lcUdRQYvLObz3R2bh3SKX9GPeA1UIp1cbUHRmEdeGHpRHKdy+4uEC8FLGy9TdXYCxo7iy97iFQZBo2uZtatiK3/EUfqWXmXMX/QBCGv7EOLftOIipaeFRrDHBVg0NJabK4BzHV5SZXi52J4wlh/cOyVdZ7YWHMFYk9JerZbeJwGKqf1LNwCBaO5ZgxGDWJTyHPzUpKf8ALUqVK/lUyaxL80+4I4P3C+xftL2U95JtA+mPeKf+R6MeBP8A+qB5b1D/AKJZ2CBH9U8F7RZx7WpfLyCW49SL6ShnVcM++F+zMbuT3CryRQzmK2/cOf4BP+xDT7iNYQLtbYsq1RgujtmectXUrEBlplZ3UXSohLe/eZicZ8TmZQmvMp/wI5ZT1L0jYwQCyDmFbia8od+KAozErQuepYXP0qdhLUBlzB2l5lLpfMQsvmUGNx6OUyfcNr4iraXaePi5fwovCXlFw/8AlqVDGp5ZgjQfueR+hl3A/cA6SI5lnEerEpWVg9xd5VhwSzp+EvA/KYik8Sv+GHj+43sfcvuBYwAlnAR6L+pbIEgsjEOWItKXBO0TFRDDe3UK38LglRbAUbYcLjA/RPZiol2Lv3Eth5yjj8Em4WmASyEZwwc6DbXgMnpP3JE1iCEDZrED5CBtYhyhJfMdkcMWEdYrmAVWIqiwyznwS9DB9i/i4RcHKNl2V1cpgQp2E9KPYR2P8mv4VKlSvhjLZb3B6KQfNf1KeoDRhbMFwkDiKlHEt5DD1QX/AEReBzmoDG8vERg+6U/3zPC+pkaRYbJ8TMCjVy8Shp+4Bi8+xmYl3HMUpUydvcdjBR4LlzR6Nyu2IBFjLICsynH1uv7iG9PdS3ULbg0MRnFnAcRHklmnOWRPwzW+ctXmSmErt1NlFmVnELcS1sl0HUrUpIuTCG+bIoyvivgMohiNpcA0onInJftBLV+o6oxmzAdRtAl/5D+DElSvivi2DPEvzmB5P9yzTPqLSnEolSeeCCHCMdab6kcR7EvHRWuiW+B1zDYUOgEEO1ZlvP8AQShYa37TEaF+ETwPSP0fUUszgusnqUYwemV5x+pnNagsMEwgvKO4Br4gQivRqGxD8xjGBHcvF7MsFTs5JjamiQh+CQMOGBVfwOfl+PjT4saWd09z/wAOdG9wb1kmyET0e4Di42bxLl/zuXLly/4VKlfxtn/4IPs+4eD9Sz4owYzVqXyinmNecpqHaZeya9st7GET6A0RL4zBZaKUIRBBosIDo+0QUvqEyfAbuoL3+4l+vADEw2Peqatg7LmAguGV/D7MH5iXPxUqwGG4BWWOgQW5F3B26gGcYh2kvMVMwX9DL/wKo6l+5eVgnwI0pBbftB6PU0H5xzvMU6eov/pHY/xL/jcuX/GpXxaHx5Szj4oiYuUyp2WlLNA4IPM4DRABsdaVE0H7IryHyTzv3HPxV58Til7Jwv7E80eVA6ddRvRfMDiWO5R3LdwcDOJZg2D7l+4PmExHiSzGpDbazqs9nxd4uNIoP8AnH8PP8LfjWXLmwCA3DNGNSwOREauA7Rtgl/yr/DX+G34EnjLJUrAwZWFmmDIqQJ1E9/H0jGrIN5R/DNSbo2QSKT2pvzocfBrlfBnhgvj9y3wJzAEBAwhYNOyYY+CYuDCLZdCzb8H4E4iz/NaxL+CCXW/glQ+N4EHqjUofcIne9QJbe0VRR+vi5cPmpX8DH+UgsFBw8IN/wHuKKcRBcw5hTylGgIK/QYAvLzVMuwL95m2ZY5hfiMHiFtwjqCgoJ1LgwUF8ZKgvMGcM9Gf/2Q==',1,850.00,5.00,800.00,1,'2024-08-06',1);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingstatus`
--

DROP TABLE IF EXISTS `ingstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingstatus`
--

LOCK TABLES `ingstatus` WRITE;
/*!40000 ALTER TABLE `ingstatus` DISABLE KEYS */;
INSERT INTO `ingstatus` VALUES (1,'In stock'),(2,'Out of Stock'),(3,'No Longer Available');
/*!40000 ALTER TABLE `ingstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'Employee'),(2,'User'),(3,'Privilege'),(4,'Operation'),(7,'Ingredient');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operation`
--

DROP TABLE IF EXISTS `operation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `operation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `opetype_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_operation_module1_idx` (`module_id`),
  KEY `fk_operation_opetype1_idx` (`opetype_id`),
  CONSTRAINT `fk_operation_module1` FOREIGN KEY (`module_id`) REFERENCES `module` (`id`),
  CONSTRAINT `fk_operation_opetype1` FOREIGN KEY (`opetype_id`) REFERENCES `opetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operation`
--

LOCK TABLES `operation` WRITE;
/*!40000 ALTER TABLE `operation` DISABLE KEYS */;
INSERT INTO `operation` VALUES (1,'Insert',1,1),(6,'Update',1,1),(7,'Select',1,1),(8,'Delete',1,2),(9,'Insert',2,1),(10,'Select',2,1),(11,'Update',2,1),(12,'Delete',2,2),(13,'Insert',3,1),(14,'Update',3,1),(16,'Insert',7,1),(17,'Select',7,1),(18,'Update',7,1),(19,'Delete',7,1);
/*!40000 ALTER TABLE `operation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opetype`
--

DROP TABLE IF EXISTS `opetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opetype`
--

LOCK TABLES `opetype` WRITE;
/*!40000 ALTER TABLE `opetype` DISABLE KEYS */;
INSERT INTO `opetype` VALUES (1,'Default'),(2,'Specific');
/*!40000 ALTER TABLE `opetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poitem`
--

DROP TABLE IF EXISTS `poitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` decimal(9,2) DEFAULT NULL,
  `expected_linecost` decimal(9,2) DEFAULT NULL,
  `purchaseorder_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_poitem_purchaseorder1_idx` (`purchaseorder_id`),
  KEY `fk_poitem_ingredient1_idx` (`ingredient_id`),
  CONSTRAINT `fk_poitem_ingredient1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `fk_poitem_purchaseorder1` FOREIGN KEY (`purchaseorder_id`) REFERENCES `purchaseorder` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poitem`
--

LOCK TABLES `poitem` WRITE;
/*!40000 ALTER TABLE `poitem` DISABLE KEYS */;
INSERT INTO `poitem` VALUES (1,100.00,15000.00,1,1);
/*!40000 ALTER TABLE `poitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postatus`
--

DROP TABLE IF EXISTS `postatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postatus`
--

LOCK TABLES `postatus` WRITE;
/*!40000 ALTER TABLE `postatus` DISABLE KEYS */;
INSERT INTO `postatus` VALUES (1,'Pending'),(2,'Approved'),(3,'Completed');
/*!40000 ALTER TABLE `postatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilage`
--

DROP TABLE IF EXISTS `privilage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilage` (
  `id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `module_id` int DEFAULT NULL,
  `operation_id` int DEFAULT NULL,
  `authority` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilage`
--

LOCK TABLES `privilage` WRITE;
/*!40000 ALTER TABLE `privilage` DISABLE KEYS */;
INSERT INTO `privilage` VALUES (1,2,1,1,'Employee-Insert'),(2,2,1,2,'Employee-Select'),(3,2,1,3,'Employee-Update'),(4,2,1,4,'Employee-Delete'),(5,1,2,1,'User-Insert'),(6,1,2,8,'user-delete'),(7,1,2,3,'User-Update'),(8,1,2,4,'User-Delete'),(9,1,3,1,'Privilege-Insert'),(10,1,3,2,'Privilege-Select'),(11,1,3,3,'Privilege-Update'),(12,1,3,4,'Privilege-Delete'),(13,1,4,1,'Operation-Insert'),(14,1,4,2,'Operation-Select'),(15,1,4,3,'Operation-Update'),(16,1,4,4,'Operation-Delete'),(17,3,5,1,'Item-Insert'),(18,3,5,2,'Item-Select'),(19,3,5,3,'Item-Update'),(20,3,5,4,'Item-Delete'),(21,1,1,3,'employee-update');
/*!40000 ALTER TABLE `privilage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productnumber` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `photo` longblob,
  `dointroduced` date DEFAULT NULL,
  `product_status_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_product_status1_idx` (`product_status_id`),
  KEY `fk_product_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_product_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_product_product_status1` FOREIGN KEY (`product_status_id`) REFERENCES `product_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,'34op30','ie094tp','gooirto',100.00,121.00,NULL,'2024-08-11',1,1),(4,'foqipo','oiiot;','osrgjwio',20.00,105.00,NULL,'2024-08-11',1,1),(5,'t84jkw','Malu Paan','fish curry inside',50.00,60.00,NULL,'2024-08-11',1,1),(6,'8t2iro','Submarine chicken','crispy chicken inside ',0.00,200.00,NULL,'2024-08-11',2,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ingredient`
--

DROP TABLE IF EXISTS `product_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ingredient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `needed_quantity` decimal(10,3) DEFAULT NULL,
  `product_id` int NOT NULL,
  `ingredient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_ingredient_product1_idx` (`product_id`),
  KEY `fk_product_ingredient_ingredient1_idx` (`ingredient_id`),
  CONSTRAINT `fk_product_ingredient_ingredient1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `fk_product_ingredient_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ingredient`
--

LOCK TABLES `product_ingredient` WRITE;
/*!40000 ALTER TABLE `product_ingredient` DISABLE KEYS */;
INSERT INTO `product_ingredient` VALUES (2,5.000,3,1),(3,1.000,3,2),(4,0.250,4,1),(5,0.500,4,2),(6,0.200,5,2),(7,0.250,5,1),(8,0.250,6,1),(9,0.100,6,2);
/*!40000 ALTER TABLE `product_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_status`
--

DROP TABLE IF EXISTS `product_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_status`
--

LOCK TABLES `product_status` WRITE;
/*!40000 ALTER TABLE `product_status` DISABLE KEYS */;
INSERT INTO `product_status` VALUES (1,'In Stock'),(2,'In Progress'),(3,'Out of Stock');
/*!40000 ALTER TABLE `product_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `description` text,
  `placed` date DEFAULT NULL,
  `productionstatus_id` int NOT NULL,
  `production_order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_production_productionstatus1_idx` (`productionstatus_id`),
  KEY `fk_production_production_order1_idx` (`production_order_id`),
  KEY `fk_production_product1_idx` (`product_id`),
  KEY `fk_production_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_production_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_production_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_production_production_order1` FOREIGN KEY (`production_order_id`) REFERENCES `production_order` (`id`),
  CONSTRAINT `fk_production_productionstatus1` FOREIGN KEY (`productionstatus_id`) REFERENCES `productionstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
/*!40000 ALTER TABLE `production` DISABLE KEYS */;
INSERT INTO `production` VALUES (1,'gowjol','2024-08-13',100,'some production desc',NULL,1,4,6,1);
/*!40000 ALTER TABLE `production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_order`
--

DROP TABLE IF EXISTS `production_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(45) NOT NULL,
  `doplaced` date DEFAULT NULL,
  `dorequired` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order_status_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_client_order_order_status1_idx` (`order_status_id`),
  KEY `fk_production_order_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_client_order_order_status1` FOREIGN KEY (`order_status_id`) REFERENCES `production_orderstatus` (`id`),
  CONSTRAINT `fk_production_order_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_order`
--

LOCK TABLES `production_order` WRITE;
/*!40000 ALTER TABLE `production_order` DISABLE KEYS */;
INSERT INTO `production_order` VALUES (3,'sor3289','2024-08-12','2024-08-14','2 orderd',1,1),(4,'wjwo','2024-08-12','2024-08-12','sgkl',1,1),(5,'gol','2024-08-12','2024-08-13','gjwio',1,1);
/*!40000 ALTER TABLE `production_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_order_product`
--

DROP TABLE IF EXISTS `production_order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_order_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` varchar(45) DEFAULT NULL,
  `production_order_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_production_order_product_production_order1_idx` (`production_order_id`),
  KEY `fk_production_order_product_product1_idx` (`product_id`),
  CONSTRAINT `fk_production_order_product_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_production_order_product_production_order1` FOREIGN KEY (`production_order_id`) REFERENCES `production_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_order_product`
--

LOCK TABLES `production_order_product` WRITE;
/*!40000 ALTER TABLE `production_order_product` DISABLE KEYS */;
INSERT INTO `production_order_product` VALUES (1,'100',4,3),(2,'30',4,6),(3,'100',5,5),(4,'20',5,6);
/*!40000 ALTER TABLE `production_order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_orderstatus`
--

DROP TABLE IF EXISTS `production_orderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_orderstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_orderstatus`
--

LOCK TABLES `production_orderstatus` WRITE;
/*!40000 ALTER TABLE `production_orderstatus` DISABLE KEYS */;
INSERT INTO `production_orderstatus` VALUES (1,'In Progress'),(2,'Completed');
/*!40000 ALTER TABLE `production_orderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productionstatus`
--

DROP TABLE IF EXISTS `productionstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productionstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productionstatus`
--

LOCK TABLES `productionstatus` WRITE;
/*!40000 ALTER TABLE `productionstatus` DISABLE KEYS */;
INSERT INTO `productionstatus` VALUES (1,'In Progress'),(2,'Completed');
/*!40000 ALTER TABLE `productionstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseorder`
--

DROP TABLE IF EXISTS `purchaseorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchaseorder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` char(12) DEFAULT NULL,
  `doplaced` date DEFAULT NULL,
  `dorequested` date DEFAULT NULL,
  `expectedtotal` decimal(12,2) DEFAULT NULL,
  `description` text,
  `postatus_id` int NOT NULL,
  `supplier_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_purchaseorder_postatus1_idx` (`postatus_id`),
  KEY `fk_purchaseorder_supplier1_idx` (`supplier_id`),
  KEY `fk_purchaseorder_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_purchaseorder_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_purchaseorder_postatus1` FOREIGN KEY (`postatus_id`) REFERENCES `postatus` (`id`),
  CONSTRAINT `fk_purchaseorder_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseorder`
--

LOCK TABLES `purchaseorder` WRITE;
/*!40000 ALTER TABLE `purchaseorder` DISABLE KEYS */;
INSERT INTO `purchaseorder` VALUES (1,'kss',NULL,'2024-08-09',15000.00,'sdlkgwio',2,1,1);
/*!40000 ALTER TABLE `purchaseorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Manager'),(3,'Cashier');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `regno` varchar(45) DEFAULT NULL,
  `regyear` int DEFAULT NULL,
  `address` text,
  `telephone` char(10) DEFAULT NULL,
  `fax` char(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contactperson` varchar(45) DEFAULT NULL,
  `contactmobile` char(10) DEFAULT NULL,
  `creditlimit` decimal(12,2) DEFAULT NULL,
  `description` text,
  `doregister` date DEFAULT NULL,
  `supplierstatus_id` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supplier_supplierstatus1_idx` (`supplierstatus_id`),
  KEY `fk_supplier_employee1_idx` (`employee_id`),
  CONSTRAINT `fk_supplier_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_supplier_supplierstatus1` FOREIGN KEY (`supplierstatus_id`) REFERENCES `supplierstatus` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Wijay Perera','R002301',2019,'99c colombo 10','0760000121','0760000121','wija@gm.co','Wijaya','0760000121',20000.00,'some desc','2024-08-05',1,1),(2,'Prima Chicken','R000012',2017,'90K, Puttalam','0760004563','0760004563','kamal.agent@prima.lk','Kamal Silva','0760004563',90000.00,'chicken supplier','2024-08-05',1,1);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplieringcategory`
--

DROP TABLE IF EXISTS `supplieringcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplieringcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `ingcategory_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_supplieringcategory_supplier1_idx` (`supplier_id`),
  KEY `fk_supplieringcategory_ingcategory1_idx` (`ingcategory_id`),
  CONSTRAINT `fk_supplieringcategory_ingcategory1` FOREIGN KEY (`ingcategory_id`) REFERENCES `ingcategory` (`id`),
  CONSTRAINT `fk_supplieringcategory_supplier1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplieringcategory`
--

LOCK TABLES `supplieringcategory` WRITE;
/*!40000 ALTER TABLE `supplieringcategory` DISABLE KEYS */;
/*!40000 ALTER TABLE `supplieringcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplierstatus`
--

DROP TABLE IF EXISTS `supplierstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplierstatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplierstatus`
--

LOCK TABLES `supplierstatus` WRITE;
/*!40000 ALTER TABLE `supplierstatus` DISABLE KEYS */;
INSERT INTO `supplierstatus` VALUES (1,'Active'),(2,'Inactive');
/*!40000 ALTER TABLE `supplierstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unittype`
--

DROP TABLE IF EXISTS `unittype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unittype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nmae` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unittype`
--

LOCK TABLES `unittype` WRITE;
/*!40000 ALTER TABLE `unittype` DISABLE KEYS */;
INSERT INTO `unittype` VALUES (1,'l'),(2,'ml'),(3,'kg'),(4,'g');
/*!40000 ALTER TABLE `unittype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `docreated` date DEFAULT NULL,
  `tocreated` time DEFAULT NULL,
  `description` text,
  `usestatus_id` int NOT NULL,
  `usetype_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_usestatus1_idx` (`usestatus_id`),
  KEY `fk_user_employee1_idx` (`employee_id`),
  KEY `fk_user_usetype1_idx` (`usetype_id`),
  CONSTRAINT `fk_user_employee1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  CONSTRAINT `fk_user_usestatus1` FOREIGN KEY (`usestatus_id`) REFERENCES `usestatus` (`id`),
  CONSTRAINT `fk_user_usetype1` FOREIGN KEY (`usetype_id`) REFERENCES `usetype` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'arshed','$2a$10$JZvWRQpd02DxwsSmAW1k9uyC4BweZ9d5Kz8mq7lVT7G/3tvgV1k0y','$2a$10$uGrsTW.313maUPZ8rAH8QOHQ3NMAotmPNmJKHlk5N1ufdp23ClDxi','2024-08-04','11:14:12','no descr',1,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrole`
--

DROP TABLE IF EXISTS `userrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrole` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_has_role_role1_idx` (`role_id`),
  KEY `fk_user_has_role_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_role_role1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_user_has_role_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrole`
--

LOCK TABLES `userrole` WRITE;
/*!40000 ALTER TABLE `userrole` DISABLE KEYS */;
INSERT INTO `userrole` VALUES (1,1,1);
/*!40000 ALTER TABLE `userrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usestatus`
--

DROP TABLE IF EXISTS `usestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usestatus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usestatus`
--

LOCK TABLES `usestatus` WRITE;
/*!40000 ALTER TABLE `usestatus` DISABLE KEYS */;
INSERT INTO `usestatus` VALUES (1,'Active'),(2,'Inactive'),(3,'Blocked');
/*!40000 ALTER TABLE `usestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usetype`
--

DROP TABLE IF EXISTS `usetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usetype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usetype`
--

LOCK TABLES `usetype` WRITE;
/*!40000 ALTER TABLE `usetype` DISABLE KEYS */;
INSERT INTO `usetype` VALUES (1,'privileged'),(2,'Guest');
/*!40000 ALTER TABLE `usetype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-13  9:38:14
