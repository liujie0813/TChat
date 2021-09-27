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
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户Id',
  `account` varchar(20) NOT NULL COMMENT '账号',
  `nickname` varchar(20) DEFAULT NULL COMMENT '昵称',
  `password` varchar(255) NOT NULL COMMENT '加密后的密码',
  `password_salt` varchar(64) NOT NULL COMMENT '密码的盐值',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '头像url',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
  `gender` tinyint(1) DEFAULT NULL COMMENT '性别',
  `province` varchar(5) DEFAULT NULL COMMENT '地区-省份',
  `city` varchar(5) DEFAULT NULL COMMENT '地区-市县',
  `signature` varchar(255) DEFAULT NULL COMMENT '个性签名',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户信息表';

-- ----------------------------
-- Table structure for person_relation
-- ----------------------------
DROP TABLE IF EXISTS `user_relation`;
CREATE TABLE `user_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `main_user` bigint(20) NOT NULL COMMENT '自己的用户Id',
  `sub_user` bigint(20) NOT NULL COMMENT '好友的用户Id',
  `talk_id` bigint(20) NOT NULL COMMENT '会话Id',
  `sub_nickname_remark` varchar(20) NULL COMMENT '好友昵称备注',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '好友关系表';

-- ----------------------------
-- Table structure for group_info
-- ----------------------------
DROP TABLE IF EXISTS `group_info`;
CREATE TABLE `group_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '群组Id',
  `group_name` varchar(20) NOT NULL COMMENT '群组名称',
  `group_name_remark` varchar(20) NOT NULL COMMENT '群组名称备注',
  `talk_id` bigint(20) NOT NULL COMMENT '会话Id',
  `create_user_id` varchar(20) NOT NULL COMMENT '创建用户Id',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '群组信息表';

-- ----------------------------
-- Table structure for person_group_relation
-- ----------------------------
DROP TABLE IF EXISTS `group_user_relation`;
CREATE TABLE `group_user_relation` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` bigint(20) NOT NULL COMMENT '群组Id',
  `user_id` bigint(20) NOT NULL COMMENT '用户Id',
  `group_name_remark` varchar(20) NULL COMMENT '群组名称备注',
  `join_time` datetime NULL COMMENT '加入时间',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '群组-用户关系表';

-- ----------------------------
-- Table structure for history_msg
-- ----------------------------
DROP TABLE IF EXISTS `history_msg`;
CREATE TABLE `history_msg` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `talk_id` bigint(20) NOT NULL COMMENT '会话Id',
  `msg_type` tinyint(4) NOT NULL COMMENT '消息类型',
  `from_id` bigint(20) NOT NULL COMMENT '发送者Id',
  `content` text NOT NULL COMMENT '消息内容',
  `send_time` datetime NOT NULL COMMENT '消息发送时间',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '历史消息表';

-- ----------------------------
-- Table structure for auth_access_token
-- ----------------------------
DROP TABLE IF EXISTS `auth_access_token`;
CREATE TABLE `auth_access_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL COMMENT '用户Id',
  `access_token` varchar(32) NOT NULL COMMENT '访问令牌',
  `refresh_token` varchar(32) NOT NULL COMMENT '刷新令牌',
  `expire_time` datetime NOT NULL COMMENT '过期时间',
  `create_ip` varchar(32) NOT NULL COMMENT '创建IP',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='访问令牌表';

-- ----------------------------
-- Table structure for auth_refresh_token
-- ----------------------------
DROP TABLE IF EXISTS `auth_refresh_token`;
CREATE TABLE `auth_refresh_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL COMMENT '用户Id',
  `refresh_token` varchar(32) NOT NULL COMMENT '刷新令牌',
  `expire_time` datetime NOT NULL COMMENT '过期时间',
  `create_ip` varchar(32) NOT NULL COMMENT '创建IP',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `deleted` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT='刷新令牌表';


SET FOREIGN_KEY_CHECKS = 1;