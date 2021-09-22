package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.entity.ApiResult;
import com.timberliu.chat.server.entity.dto.ChatRecordDTO;
import com.timberliu.chat.server.entity.dto.TalkDTO;
import com.timberliu.chat.server.util.Util;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalField;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * @author liujie
 * @date 2021/9/6
 */
@RestController
@RequestMapping("/chat")
public class ChatController {

	@GetMapping("/talkList")
	public ApiResult<List<TalkDTO>> getTalkList(@RequestParam("userId") Integer userId) {
		List<TalkDTO> talkDTOList = new ArrayList<>();
		Random random = new Random();
		for (int i = 0; i < 20; i++) {
			TalkDTO talkDTO = new TalkDTO();
			talkDTO.setTalkId(i);
			talkDTO.setType(i % 2);
			talkDTO.setTalkName((i % 2 == 0 ? "user_" : "group_") + i);
			int latestUserId = random.nextInt(10);
			if (i % 2 == 1) {
				talkDTO.setLatestSender("user_" + latestUserId);
			}
			talkDTO.setLatestMsg("hello, " + latestUserId);
			talkDTO.setMsgTime(new Date());

			talkDTOList.add(talkDTO);
		}
		return ApiResult.success(talkDTOList);
	}

	@GetMapping("/chatRecords")
	public ApiResult<List<ChatRecordDTO>> getChatRecords(@RequestParam("userId") Integer userId) {
		List<ChatRecordDTO> chatRecordDTOList = new ArrayList<>();
		for (int i = 0; i < 20; i++) {
			ChatRecordDTO chatRecordDTO = new ChatRecordDTO();
			chatRecordDTO.setTalkId(i);
			chatRecordDTO.setType(i % 2);
			chatRecordDTO.setTalkName((i % 2 == 0 ? "user_" : "group_") + i);

			List<ChatRecordDTO.Record> records = new ArrayList<>();
			for (int j = 0; j < 10; j++) {
				ChatRecordDTO.Record record = new ChatRecordDTO.Record();
				record.setFromId((long) (i % 2 == 0 ? userId : i));
				record.setFrom("user_" + record.getFromId());
				record.setToId(record.getFromId() + i);
				record.setTo("user_" + record.getToId());
				record.setMsgType(0);
				record.setMsgId(Util.nextMsgId());
				record.setContent(record.getFrom() + " 对 " + record.getTo() + " 你好呀 !");
				record.setMsgTime(System.currentTimeMillis());
				records.add(record);
			}
			chatRecordDTO.setRecords(records);

			chatRecordDTOList.add(chatRecordDTO);
		}
		return ApiResult.success(chatRecordDTOList);
	}

}
