-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: words_list
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `phrase`
--

DROP TABLE IF EXISTS `phrase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phrase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(120) NOT NULL,
  `definition` varchar(200) DEFAULT '-',
  `addDate` datetime DEFAULT current_timestamp(),
  `user_id` varchar(36) NOT NULL,
  `starred` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `value` (`value`) USING BTREE,
  CONSTRAINT `fk_phrase_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phrase`
--

LOCK TABLES `phrase` WRITE;
/*!40000 ALTER TABLE `phrase` DISABLE KEYS */;
INSERT INTO `phrase` VALUES (1,'Pear','Not an apple or orange','2024-05-24 22:01:06','62c8bdd7-2020-46f0-94ad-21233cd77b76',0),(2,'a','b','2024-05-26 23:30:03','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(3,'Marvelous','abc','2024-05-26 23:30:32','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(4,'Marvel','sdfghjkl;','2024-05-26 23:30:57','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(5,'dfg','dfgdgdfgdgf','2024-05-26 23:36:41','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(6,'Apple','This is apple','2024-05-27 19:02:47','62c8bdd7-2020-46f0-94ad-21233cd77b76',0),(7,'Orange','This is orange','2024-05-27 19:09:18','62c8bdd7-2020-46f0-94ad-21233cd77b76',0),(8,'Strawberry','This is strawberry','2024-05-27 19:09:31','62c8bdd7-2020-46f0-94ad-21233cd77b76',0),(9,'Blueberry','This is blueberry','2024-05-27 19:09:45','62c8bdd7-2020-46f0-94ad-21233cd77b76',0),(10,'Carrot','This is carrot','2024-05-27 19:10:21','62c8bdd7-2020-46f0-94ad-21233cd77b76',0),(11,'b','b','2024-05-29 20:44:16','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(12,'c','c','2024-05-29 20:44:19','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(13,'d','d','2024-05-29 20:44:21','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(14,'e','e','2024-05-29 20:44:23','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(15,'f','f','2024-05-29 20:44:25','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(16,'g','g','2024-05-29 20:44:28','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(17,'h','h','2024-05-29 20:44:30','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(18,'i','i','2024-05-29 20:44:33','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0),(19,'j','j','2024-05-29 20:44:35','bf8267c4-dd97-46fc-977a-9eaac472d5e9',0);
/*!40000 ALTER TABLE `phrase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phrase_id` int(11) NOT NULL,
  `user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phraseId` (`phrase_id`) USING BTREE,
  KEY `userId` (`user_id`),
  KEY `userId_2` (`user_id`),
  CONSTRAINT `fk_quiz_phrase` FOREIGN KEY (`phrase_id`) REFERENCES `phrase` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_quiz_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,13,'bf8267c4-dd97-46fc-977a-9eaac472d5e9'),(2,12,'bf8267c4-dd97-46fc-977a-9eaac472d5e9'),(3,5,'bf8267c4-dd97-46fc-977a-9eaac472d5e9'),(4,17,'bf8267c4-dd97-46fc-977a-9eaac472d5e9'),(5,18,'bf8267c4-dd97-46fc-977a-9eaac472d5e9');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('62c8bdd7-2020-46f0-94ad-21233cd77b76','admin','$2a$10$S9VMsu/Dz6fSNbIGajn76eYcTnfaNlFB8t7lF97SGjtBggXRoyyQq'),('a1191493-e199-4108-b399-5f602c88d9cb','test','$2a$10$kcZiXIxZsP2ia8OYfo6c6.3EWM0l8LVf81Dn5q/Qy279OtQmDrmvG'),('bf8267c4-dd97-46fc-977a-9eaac472d5e9','admin@email.com','$2a$10$8.Dsz5QGqSkd5t.UcpUcRuAFRJlUpMA.bsOX0r.iDOshttfNonDf6');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-31 16:37:24
