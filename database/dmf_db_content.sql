-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: dmf-db.cd0i6o42e4on.ca-central-1.rds.amazonaws.com    Database: dmf_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `content`
--

DROP TABLE IF EXISTS `content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(255) DEFAULT NULL,
  `videoPath` varchar(255) DEFAULT NULL,
  `fullName` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `dateTime` date NOT NULL,
  `body` text NOT NULL,
  `uploadTime` time NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `content`
--

LOCK TABLES `content` WRITE;
/*!40000 ALTER TABLE `content` DISABLE KEYS */;
INSERT INTO `content` VALUES (34,'choir.jpg',NULL,'Ayo Sola Dan','qw','2024-04-17','<p>rr</p>','10:40:00','2024-04-17 09:40:50'),(36,NULL,'Snapinsta.app_video_408060703_2244877679045187_7546538793055155548_n.mp4','Joan James','Stainless Bracelets','2024-04-18','<p style=\"line-height: 2; text-align: center;\"><span style=\"font-size: 30px; color: rgb(0, 0, 0);\">JEWELRY</span></p><p id=\"isPasted\" style=\"line-height: 2; text-align: justify;\"><strong>Jewelry holds a timeless allure that transcends cultures and epochs, serving as a symbol of beauty, status, and personal expression. From ancient civilizations to modern-day fashion runways, jewelry has always captivated humanity with its intricate designs and precious materials. The craftsmanship behind jewelry is a testament to human ingenuity, with artisans employing techniques passed down through generations to create pieces that are not just accessories but works of art.</strong></p><p style=\"line-height: 2; text-align: justify;\"><strong>Beyond its aesthetic appeal, jewelry often carries deep cultural and symbolic significance. In many societies, certain pieces of jewelry are imbued with meaning, representing familial bonds, social status, or spiritual beliefs. For example, wedding rings symbolize eternal love and commitment, while amulets and talismans are believed to bring luck and protection. These symbolic aspects add layers of depth to jewelry, making it more than just adornment but a reflection of one&#39;s identity and heritage.</strong></p><p style=\"line-height: 2; text-align: justify;\"><strong>In today&#39;s world, jewelry continues to evolve, blending traditional craftsmanship with modern innovations. Sustainable and ethical practices are gaining prominence, encouraging consumers to choose jewelry that is not only beautiful but also environmentally conscious. Furthermore, personalized and customizable options allow individuals to create pieces that resonate with their unique style and story. In essence, jewelry remains a timeless art form that celebrates human creativity, heritage, and individuality.</strong></p><p style=\"line-height: 2; text-align: justify;\">&nbsp;</p>','14:04:00','2024-04-18 13:17:11');
/*!40000 ALTER TABLE `content` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 21:04:00
