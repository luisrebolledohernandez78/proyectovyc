-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectovyc_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add Técnico',7,'add_technician'),(26,'Can change Técnico',7,'change_technician'),(27,'Can delete Técnico',7,'delete_technician'),(28,'Can view Técnico',7,'view_technician'),(29,'Can add Vehículo',8,'add_vehicle'),(30,'Can change Vehículo',8,'change_vehicle'),(31,'Can delete Vehículo',8,'delete_vehicle'),(32,'Can view Vehículo',8,'view_vehicle'),(33,'Can add Cliente',9,'add_client'),(34,'Can change Cliente',9,'change_client'),(35,'Can delete Cliente',9,'delete_client'),(36,'Can view Cliente',9,'view_client'),(37,'Can add Orden de Trabajo',10,'add_workorder'),(38,'Can change Orden de Trabajo',10,'change_workorder'),(39,'Can delete Orden de Trabajo',10,'delete_workorder'),(40,'Can view Orden de Trabajo',10,'view_workorder'),(41,'Can add Diagnóstico',11,'add_diagnostic'),(42,'Can change Diagnóstico',11,'change_diagnostic'),(43,'Can delete Diagnóstico',11,'delete_diagnostic'),(44,'Can view Diagnóstico',11,'view_diagnostic'),(45,'Can add Cita',12,'add_appointment'),(46,'Can change Cita',12,'change_appointment'),(47,'Can delete Cita',12,'delete_appointment'),(48,'Can view Cita',12,'view_appointment'),(49,'Can add Actividad de reparación (mano de obra)',13,'add_repairaction'),(50,'Can change Actividad de reparación (mano de obra)',13,'change_repairaction'),(51,'Can delete Actividad de reparación (mano de obra)',13,'delete_repairaction'),(52,'Can view Actividad de reparación (mano de obra)',13,'view_repairaction'),(53,'Can add Uso de repuesto en OT',14,'add_partusage'),(54,'Can change Uso de repuesto en OT',14,'change_partusage'),(55,'Can delete Uso de repuesto en OT',14,'delete_partusage'),(56,'Can view Uso de repuesto en OT',14,'view_partusage'),(57,'Can add Repuesto',15,'add_inventoryitem'),(58,'Can change Repuesto',15,'change_inventoryitem'),(59,'Can delete Repuesto',15,'delete_inventoryitem'),(60,'Can view Repuesto',15,'view_inventoryitem'),(61,'Can add Cotización',16,'add_quote'),(62,'Can change Cotización',16,'change_quote'),(63,'Can delete Cotización',16,'delete_quote'),(64,'Can view Cotización',16,'view_quote');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1000000$4sFEKhTcSepVwpdy1163HX$JzSsb3/dHl/9VWcoiZbWt5vDIklfbyCmhgoXNi0fmSg=','2025-09-26 22:37:23.770380',1,'luis','','','',1,1,'2025-09-26 20:34:55.767363');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing_quote`
--

DROP TABLE IF EXISTS `billing_quote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing_quote` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `status` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` longtext COLLATE utf8mb4_unicode_ci,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `work_order_id` (`work_order_id`),
  CONSTRAINT `billing_quote_work_order_id_0f7e3bf4_fk_workshop_workorder_id` FOREIGN KEY (`work_order_id`) REFERENCES `workshop_workorder` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_quote`
--

LOCK TABLES `billing_quote` WRITE;
/*!40000 ALTER TABLE `billing_quote` DISABLE KEYS */;
INSERT INTO `billing_quote` VALUES (1,'2025-09-27 04:51:25.371052','PEND','jdfaskljdfasjdfa',1);
/*!40000 ALTER TABLE `billing_quote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_client`
--

DROP TABLE IF EXISTS `core_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_client` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rut` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_type` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rut` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_client`
--

LOCK TABLES `core_client` WRITE;
/*!40000 ALTER TABLE `core_client` DISABLE KEYS */;
INSERT INTO `core_client` VALUES (1,'migrin','77023115-9','LEG','asdfasdf@dfad.cl','sfasdf','asdfasdf','2025-09-26 22:31:39.817098'),(2,'jasdfkljashdflkjdsahlfk','13494019-0','NAT','sofikim.amazon@gmail.com','ASDFAFD','FASDFASDF','2025-09-26 22:55:29.639650');
/*!40000 ALTER TABLE `core_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_technician`
--

DROP TABLE IF EXISTS `core_technician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_technician` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specialty` varchar(120) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL,
  `hired_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_technician`
--

LOCK TABLES `core_technician` WRITE;
/*!40000 ALTER TABLE `core_technician` DISABLE KEYS */;
INSERT INTO `core_technician` VALUES (1,'dsfasdflkasflñk jlñ','lfkajsdlfkajsdflk',1,'2025-09-26');
/*!40000 ALTER TABLE `core_technician` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_vehicle`
--

DROP TABLE IF EXISTS `core_vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_vehicle` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `plate` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year` int unsigned DEFAULT NULL,
  `vin` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `plate` (`plate`),
  KEY `core_vehicle_client_id_141e38e2_fk_core_client_id` (`client_id`),
  CONSTRAINT `core_vehicle_client_id_141e38e2_fk_core_client_id` FOREIGN KEY (`client_id`) REFERENCES `core_client` (`id`),
  CONSTRAINT `core_vehicle_chk_1` CHECK ((`year` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_vehicle`
--

LOCK TABLES `core_vehicle` WRITE;
/*!40000 ALTER TABLE `core_vehicle` DISABLE KEYS */;
INSERT INTO `core_vehicle` VALUES (1,'sdfasdfasdf','asdfasdfas','asdfasdf',1990,'dsafsdfasdfasdfa',1);
/*!40000 ALTER TABLE `core_vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-09-26 22:31:39.818062','1','migrin (77023115-9)',1,'[{\"added\": {}}]',9,1),(2,'2025-09-26 22:37:35.160949','1','dsfasdflkasflñk jlñ',1,'[{\"added\": {}}]',7,1),(3,'2025-09-26 22:37:53.635170','1','sdfasdfasdf - migrin',1,'[{\"added\": {}}]',8,1),(4,'2025-09-26 22:55:29.640885','2','jasdfkljashdflkjdsahlfk (13494019-0)',1,'[{\"added\": {}}]',9,1),(5,'2025-09-26 22:56:27.938521','1','OT-000001',1,'[{\"added\": {}}]',10,1),(6,'2025-09-26 23:01:15.391088','2','OT-000002',1,'[{\"added\": {}}]',10,1),(7,'2025-09-26 23:04:05.188587','3','OT-000003',1,'[{\"added\": {}}]',10,1),(8,'2025-09-26 23:08:36.216229','4','OT-000004',1,'[{\"added\": {}}]',10,1),(9,'2025-09-26 23:26:30.151203','5','OT-000005',1,'[{\"added\": {}}]',10,1),(10,'2025-09-27 04:23:46.230755','6','OT-000006',1,'[{\"added\": {}}]',10,1),(11,'2025-09-27 04:32:04.969730','1','SKU0001 - Filtro aceite',1,'[{\"added\": {}}]',15,1),(12,'2025-09-27 04:33:18.404310','1','Filtro aceite x4 en OT-000001',1,'[{\"added\": {}}]',14,1),(13,'2025-09-27 04:33:32.038925','1','Filtro aceite x4 en OT-000001',2,'[]',14,1),(14,'2025-09-27 04:35:16.203271','1','Filtro aceite x4 en OT-000001',2,'[]',14,1),(15,'2025-09-27 04:46:23.735389','1','asfasdfasdfasdfasdf (OT-000001)',1,'[{\"added\": {}}]',13,1),(16,'2025-09-27 04:46:56.681743','1','Cita sdfasdfasdf @ 2025-09-27 01:46',1,'[{\"added\": {}}]',12,1),(17,'2025-09-27 04:51:25.371815','1','Cotización OT-000001',1,'[{\"added\": {}}]',16,1),(18,'2025-09-27 05:00:47.693488','1','SKU0001 - Filtro aceite',2,'[{\"changed\": {\"fields\": [\"Stock actual\"]}}]',15,1),(19,'2025-09-27 05:01:09.190267','2','SKU0002 - 2222222',1,'[{\"added\": {}}]',15,1),(20,'2025-09-27 05:01:41.595079','1','Filtro aceite x5 en OT-000001',2,'[{\"changed\": {\"fields\": [\"Cantidad\"]}}]',14,1),(21,'2025-09-27 05:03:14.332777','2','ggggggggggggggggggg (OT-000002)',1,'[{\"added\": {}}]',13,1),(22,'2025-09-27 05:04:53.409891','1','Filtro aceite x10 en OT-000001',2,'[{\"changed\": {\"fields\": [\"Cantidad\"]}}]',14,1),(23,'2025-09-27 05:05:15.539067','3','fffffffffffffffff (OT-000002)',1,'[{\"added\": {}}]',13,1),(24,'2025-09-27 05:05:21.911318','3','fffffffffffffffff (OT-000002)',3,'',13,1),(25,'2025-09-27 05:11:19.609602','2','OT-000002',2,'[{\"changed\": {\"fields\": [\"Estado\"]}}]',10,1),(26,'2025-09-27 05:11:35.555005','2','OT-000002',2,'[{\"changed\": {\"fields\": [\"Estado\"]}}]',10,1),(27,'2025-09-27 05:38:53.799104','6','OT-000006',3,'',10,1),(28,'2025-09-27 05:39:04.751548','7','OT-000007',1,'[{\"added\": {}}]',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(16,'billing','quote'),(5,'contenttypes','contenttype'),(9,'core','client'),(7,'core','technician'),(8,'core','vehicle'),(15,'inventory','inventoryitem'),(14,'inventory','partusage'),(6,'sessions','session'),(12,'workshop','appointment'),(11,'workshop','diagnostic'),(13,'workshop','repairaction'),(10,'workshop','workorder');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-09-26 20:33:19.985577'),(2,'auth','0001_initial','2025-09-26 20:33:21.345528'),(3,'admin','0001_initial','2025-09-26 20:33:21.606048'),(4,'admin','0002_logentry_remove_auto_add','2025-09-26 20:33:21.616759'),(5,'admin','0003_logentry_add_action_flag_choices','2025-09-26 20:33:21.627739'),(6,'contenttypes','0002_remove_content_type_name','2025-09-26 20:33:21.804576'),(7,'auth','0002_alter_permission_name_max_length','2025-09-26 20:33:21.906929'),(8,'auth','0003_alter_user_email_max_length','2025-09-26 20:33:21.937971'),(9,'auth','0004_alter_user_username_opts','2025-09-26 20:33:21.948875'),(10,'auth','0005_alter_user_last_login_null','2025-09-26 20:33:22.036667'),(11,'auth','0006_require_contenttypes_0002','2025-09-26 20:33:22.043182'),(12,'auth','0007_alter_validators_add_error_messages','2025-09-26 20:33:22.053963'),(13,'auth','0008_alter_user_username_max_length','2025-09-26 20:33:22.159836'),(14,'auth','0009_alter_user_last_name_max_length','2025-09-26 20:33:22.294255'),(15,'auth','0010_alter_group_name_max_length','2025-09-26 20:33:22.321427'),(16,'auth','0011_update_proxy_permissions','2025-09-26 20:33:22.332110'),(17,'auth','0012_alter_user_first_name_max_length','2025-09-26 20:33:22.439448'),(18,'sessions','0001_initial','2025-09-26 20:33:22.510063'),(19,'core','0001_initial','2025-09-26 22:24:57.033291'),(20,'workshop','0001_initial','2025-09-26 22:54:43.228622'),(21,'inventory','0001_initial','2025-09-27 04:30:56.434475'),(22,'billing','0001_initial','2025-09-27 04:45:06.532882');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('tnn6f4zyfovd7md4qtp1lii9o60p3vcg','.eJxVjDsOwjAQBe_iGln-Z01JnzNY9nqDA8iR4qRC3B1HSgHtvJn3ZiHuWwl7ozXMmV2ZZJdfliI-qR5DfsR6XzgudVvnxA-Fn2vj45LpdTvdv4MSW-m1FmCdlSZq5dyUPBGAkDRYYxVmCQY1GeGl7ViLTJP1KkFEkIPqHbLPF60cNoo:1v2H47:DC189kIH_KWICCy8elVhbcNqBBRJkgU3evszsNArnWY','2025-10-10 22:37:23.778058'),('zux0pedljg91lplpup3b1pjbibxjcnud','.eJxVjDsOwjAQBe_iGln-Z01JnzNY9nqDA8iR4qRC3B1HSgHtvJn3ZiHuWwl7ozXMmV2ZZJdfliI-qR5DfsR6XzgudVvnxA-Fn2vj45LpdTvdv4MSW-m1FmCdlSZq5dyUPBGAkDRYYxVmCQY1GeGl7ViLTJP1KkFEkIPqHbLPF60cNoo:1v2FAn:D-6RcYcuKMHuVauAlS8b-nmc_YKbEEYvtt4s6Xf_MSc','2025-10-10 20:36:09.969780');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_inventoryitem`
--

DROP TABLE IF EXISTS `inventory_inventoryitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_inventoryitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sku` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL,
  `unit_cost` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_inventoryitem`
--

LOCK TABLES `inventory_inventoryitem` WRITE;
/*!40000 ALTER TABLE `inventory_inventoryitem` DISABLE KEYS */;
INSERT INTO `inventory_inventoryitem` VALUES (1,'SKU0001','Filtro aceite',100,5000.00),(2,'SKU0002','2222222',100,50000.00);
/*!40000 ALTER TABLE `inventory_inventoryitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_partusage`
--

DROP TABLE IF EXISTS `inventory_partusage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_partusage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `unit_price` decimal(12,2) NOT NULL,
  `item_id` bigint NOT NULL,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inventory_partusage_item_id_a11a960a_fk_inventory` (`item_id`),
  KEY `inventory_partusage_work_order_id_56d47ab6_fk_workshop_` (`work_order_id`),
  CONSTRAINT `inventory_partusage_item_id_a11a960a_fk_inventory` FOREIGN KEY (`item_id`) REFERENCES `inventory_inventoryitem` (`id`),
  CONSTRAINT `inventory_partusage_work_order_id_56d47ab6_fk_workshop_` FOREIGN KEY (`work_order_id`) REFERENCES `workshop_workorder` (`id`),
  CONSTRAINT `inventory_partusage_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_partusage`
--

LOCK TABLES `inventory_partusage` WRITE;
/*!40000 ALTER TABLE `inventory_partusage` DISABLE KEYS */;
INSERT INTO `inventory_partusage` VALUES (1,10,5000.00,1,1);
/*!40000 ALTER TABLE `inventory_partusage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshop_appointment`
--

DROP TABLE IF EXISTS `workshop_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshop_appointment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `scheduled_at` datetime(6) NOT NULL,
  `notes` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(6) NOT NULL,
  `vehicle_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workshop_appointment_vehicle_id_5e5956d5_fk_core_vehicle_id` (`vehicle_id`),
  CONSTRAINT `workshop_appointment_vehicle_id_5e5956d5_fk_core_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `core_vehicle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshop_appointment`
--

LOCK TABLES `workshop_appointment` WRITE;
/*!40000 ALTER TABLE `workshop_appointment` DISABLE KEYS */;
INSERT INTO `workshop_appointment` VALUES (1,'2025-09-27 04:46:49.000000','en proceso','2025-09-27 04:46:56.679916',1);
/*!40000 ALTER TABLE `workshop_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshop_diagnostic`
--

DROP TABLE IF EXISTS `workshop_diagnostic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshop_diagnostic` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `details` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `work_order_id` (`work_order_id`),
  CONSTRAINT `workshop_diagnostic_work_order_id_c710f649_fk_workshop_` FOREIGN KEY (`work_order_id`) REFERENCES `workshop_workorder` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshop_diagnostic`
--

LOCK TABLES `workshop_diagnostic` WRITE;
/*!40000 ALTER TABLE `workshop_diagnostic` DISABLE KEYS */;
/*!40000 ALTER TABLE `workshop_diagnostic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshop_repairaction`
--

DROP TABLE IF EXISTS `workshop_repairaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshop_repairaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hours` decimal(6,2) NOT NULL,
  `labor_rate` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `technician_id` bigint DEFAULT NULL,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `workshop_repairactio_technician_id_7610f434_fk_core_tech` (`technician_id`),
  KEY `workshop_repairactio_work_order_id_17de98b5_fk_workshop_` (`work_order_id`),
  CONSTRAINT `workshop_repairactio_technician_id_7610f434_fk_core_tech` FOREIGN KEY (`technician_id`) REFERENCES `core_technician` (`id`),
  CONSTRAINT `workshop_repairactio_work_order_id_17de98b5_fk_workshop_` FOREIGN KEY (`work_order_id`) REFERENCES `workshop_workorder` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshop_repairaction`
--

LOCK TABLES `workshop_repairaction` WRITE;
/*!40000 ALTER TABLE `workshop_repairaction` DISABLE KEYS */;
INSERT INTO `workshop_repairaction` VALUES (1,'asfasdfasdfasdfasdf',0.01,40000.00,'2025-09-27 04:46:23.733813',1,1),(2,'ggggggggggggggggggg',2.00,40000.00,'2025-09-27 05:03:14.331591',1,2);
/*!40000 ALTER TABLE `workshop_repairaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workshop_workorder`
--

DROP TABLE IF EXISTS `workshop_workorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workshop_workorder` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `number` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opened_at` datetime(6) NOT NULL,
  `closed_at` datetime(6) DEFAULT NULL,
  `status` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `client_id` bigint NOT NULL,
  `responsible_technician_id` bigint DEFAULT NULL,
  `vehicle_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number` (`number`),
  KEY `workshop_workorder_client_id_eab87e7f_fk_core_client_id` (`client_id`),
  KEY `workshop_workorder_responsible_technici_0d0bc73d_fk_core_tech` (`responsible_technician_id`),
  KEY `workshop_workorder_vehicle_id_7b19f925_fk_core_vehicle_id` (`vehicle_id`),
  CONSTRAINT `workshop_workorder_client_id_eab87e7f_fk_core_client_id` FOREIGN KEY (`client_id`) REFERENCES `core_client` (`id`),
  CONSTRAINT `workshop_workorder_responsible_technici_0d0bc73d_fk_core_tech` FOREIGN KEY (`responsible_technician_id`) REFERENCES `core_technician` (`id`),
  CONSTRAINT `workshop_workorder_vehicle_id_7b19f925_fk_core_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `core_vehicle` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workshop_workorder`
--

LOCK TABLES `workshop_workorder` WRITE;
/*!40000 ALTER TABLE `workshop_workorder` DISABLE KEYS */;
INSERT INTO `workshop_workorder` VALUES (1,'OT-000001','2025-09-26 22:56:27.934383',NULL,'OPEN','FASDFA HSDFLKJA SLKDFJALSKDJF LASKJDF LAKJSDFDLKASJDFDLKAFSJ',1,1,1),(2,'OT-000002','2025-09-26 23:01:15.388786','2025-09-27 05:10:55.463401','DONE','FASDFA HSDFLKJA SLKDFJALSKDJF LASKJDF LAKJSDFDLKASJDFDLKAFSJ',1,1,1),(3,'OT-000003','2025-09-26 23:04:05.186588','2025-09-27 05:11:45.975962','DONE','dfdsfdsafasdfasdfasdfasdf',1,1,1),(4,'OT-000004','2025-09-26 23:08:36.213931',NULL,'OPEN','dfdsfdsafasdfasdfasdfasdf',1,1,1),(5,'OT-000005','2025-09-26 23:26:30.148642',NULL,'OPEN','sdlñfn adslkfjna slk.fnjask.lfd jnsalkdfjaslkdfjnbsalkd',2,1,1),(7,'OT-000007','2025-09-27 05:39:04.749635',NULL,'OPEN','asfdasdasdfasdf',2,1,1);
/*!40000 ALTER TABLE `workshop_workorder` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-27  2:44:31
