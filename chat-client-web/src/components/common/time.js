/**
 * 首页
 *   一周之内：
 *      当天的一分钟内显示“刚刚”，一分钟以上显示“小时:分钟”、昨天、前天、星期几
 *   大于一周：年月日
 *
 * 聊天内容页面
 *    一周之内：
 *       当天的显示 “小时:分钟”、“昨天 小时:分钟”、“星期几 小时:分钟”
 *    大于一周：年月日 时分
 */
export function getDateTime(timestamp, isIncludeTime) {
	// 当前时间
	let currentDate = new Date();
	// 目标判断时间
	let srcDate = new Date(parseInt(timestamp));

	let currentYear = currentDate.getFullYear();
	let currentMonth = currentDate.getMonth() + 1;
	let currentDay = currentDate.getDate();
	let currentWeekDay = currentDate.getDay();

	let srcYear = srcDate.getFullYear();
	let srcMonth = srcDate.getMonth() + 1;
	let srcDay = srcDate.getDate();
	let srcWeekDay = currentDate.getDay();

	let timeExtraStr = isIncludeTime ? " " + formatDate(srcDate, "hh:mm") : "";
	let res = "";
	if (currentYear !== srcYear) {
		res = formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
	} else {
		let currentTimestamp = currentDate.getTime();
		let deltaTime = currentTimestamp - timestamp;

		if (currentMonth === srcMonth && currentDay === srcDay) {
			if (deltaTime < 60 * 1000) {
				res = "刚刚";
			} else {
				res = formatDate(srcDate, "hh:mm");
			}
		} else {
			// 昨天
			let yesterdayDate = new Date();
			yesterdayDate.setDate(yesterdayDate.getDate() - 1);

			if (srcMonth === (yesterdayDate.getMonth() + 1) && srcDay === yesterdayDate.getDate()) {
				res = "昨天" + timeExtraStr;
			} else {
				let deltaDay = (deltaTime / (24 * 3600 * 1000));
				if (deltaDay <= srcWeekDay - currentWeekDay) {
					let weekdayStr = weekday[srcDate.getDay()];
					res = weekdayStr + timeExtraStr;
				} else {
					res = formatDate(srcDate, "yyyy/M/d") + timeExtraStr;
				}
			}
		}
	}
	return res;
}

export function formatDate(date, fmt) {
	let obj = {
		"M+": date.getMonth() + 1,  // 月份
		"d+": date.getDate(), // 日
		"h+": date.getHours(), // 时
		"m+": date.getMinutes(), // 分
		"s+": date.getSeconds(), // 秒
		"q+": Math.floor((date.getMonth() + 3) / 3),  // 季度
		"S": date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (let key in obj) {
		if (new RegExp("(" + key + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[key] : (("00" + obj[key]).substr(("" + obj[key]).length)))
		}
	}
	return fmt;
}

const weekday = new Array(7);
weekday[0] = "周日";
weekday[1] = "周一";
weekday[2] = "周二";
weekday[3] = "周三";
weekday[4] = "周四";
weekday[5] = "周五";
weekday[6] = "周六";
