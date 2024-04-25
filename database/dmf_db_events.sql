-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: dmf_db
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `dateTime` date NOT NULL,
  `time` time NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `brief` varchar(255) NOT NULL,
  `imagePath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (2,'Jabu Chapel Choir Concert','2024-04-15','00:01:00','Jabu','','Choir is fun','choir.jpg'),(5,'Keyboardist','2024-04-17','13:10:00','lagos','\r\nPlaying the keyboard can be a delightful experience once you get the hang of it. First, familiarize yourself with the layout of the keyboard, understanding the different keys and their functions. Start with the basic scales and chords to build a foundation. Practice regularly to improve your finger dexterity and coordination. Gradually, move on to playing simple melodies and songs, focusing on accuracy and rhythm. Utilize online tutorials or seek guidance from a teacher to learn proper techniques and enhance your skills.\r\n\r\nNext, explore various playing styles and genres to broaden your musical repertoire. Experiment with different sounds and effects available on the keyboard to add depth and texture to your playing. Practice playing along with backing tracks or metronomes to develop your timing and ability to stay in sync with other instruments.\r\n\r\nLastly, don\'t forget to have fun and express yourself through your music. Let your creativity flow by improvising and creating your melodies or arrangements. Embrace challenges and keep pushing yourself to learn new techniques and pieces. Remember that progress takes time and patience, so enjoy the journey of learning and mastering the keyboard!','Being a Great Keyboardist','IMG_9665.jpg'),(6,'Bad Guy','2024-04-17','13:22:00','lagos','','Big Man','TPUK4595_edited.jpg');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 16:58:09
