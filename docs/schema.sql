/*
  Navicat Premium Data Transfer

  Source Server         : t-chat
  Source Server Type    : MySQL
  Source Server Version : 50735
  Source Host           : 123.56.9.126:3306
  Source Schema         : t_chat

  Target Server Type    : MySQL
  Target Server Version : 50735
  File Encoding         : 65001

  Date: 22/09/2021 22:18:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for person_info
-- ----------------------------
DROP TABLE IF EXISTS `person_info`;
CREATE TABLE `person_info`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `person_id` bigint(20) NOT NULL COMMENT '用户Id',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '昵称',
  `nickname_remark` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '昵称备注',
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像url',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `gender` tinyint(1) NULL DEFAULT NULL COMMENT '性别',
  `province` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '地区-省份',
  `city` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '地区-市县',
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '个性签名',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表';

-- ----------------------------
-- Table structure for person_relation
-- ----------------------------
DROP TABLE IF EXISTS `person_relation`;
CREATE TABLE `person_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `main_user` bigint(20) NOT NULL COMMENT '自己的用户Id',
  `sub_user` bigint(20) NOT NULL COMMENT '好友的用户Id',
  `sub_nickname_remark` varchar(20) NULL COMMENT '好友昵称备注',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '好友关系表';

-- ----------------------------
-- Table structure for group_info
-- ----------------------------
DROP TABLE IF EXISTS `group_info`;
CREATE TABLE `group_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) NOT NULL COMMENT '群组Id',
  `group_name` varchar(20) NOT NULL COMMENT '群组名称',
  `create_user_id` varchar(20) NOT NULL COMMENT '创建用户Id',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '群组信息表';

-- ----------------------------
-- Table structure for person_group_relation
-- ----------------------------
DROP TABLE IF EXISTS `group_person_relation`;
CREATE TABLE `group_person_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) NOT NULL COMMENT '群组Id',
  `person_id` bigint(20) NOT NULL COMMENT '用户Id',
  `group_name_remark` varchar(20) NULL COMMENT '群组名称备注',
  `join_time` datetime NULL COMMENT '加入时间',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '群组-用户关系表';

-- ----------------------------
-- Table structure for history_msg_single
-- ----------------------------
DROP TABLE IF EXISTS `history_msg_single`;
CREATE TABLE `history_msg_single` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `msg_id` bigint(20) NOT NULL COMMENT '消息Id',
  `from_id` bigint(20) NOT NULL COMMENT '发送者Id',
  `to_id` bigint(20) NOT NULL COMMENT '接受者Id',
  `msg_type` tinyint(4) NOT NULL COMMENT '消息类型',
  `content` text NOT NULL COMMENT '消息内容',
  `send_time` datetime NOT NULL COMMENT '消息发送时间',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '历史消息(单聊)表';

-- ----------------------------
-- Table structure for history_msg_group
-- ----------------------------
DROP TABLE IF EXISTS `history_msg_group`;
CREATE TABLE `history_msg_group` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `msg_id` bigint(20) NOT NULL COMMENT '消息Id',
  `from_id` bigint(20) NOT NULL COMMENT '发送者Id',
  `group_id` bigint(20) NOT NULL COMMENT '群组Id',
  `msg_type` tinyint(4) NOT NULL COMMENT '消息类型',
  `content` text NOT NULL COMMENT '消息内容',
  `send_time` datetime NOT NULL COMMENT '消息发送时间',
  `create_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '历史消息(群聊)表';


SET FOREIGN_KEY_CHECKS = 1;