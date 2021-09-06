package com.timberliu.chat.server.controller;

import com.timberliu.chat.server.entity.ApiResult;
import com.timberliu.chat.server.entity.dto.TalkDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
			boolean type = random.nextBoolean();
			talkDTO.setType(type ? 0 : 1);
			talkDTO.setTalkName((type ? "user_" : "group_") + i);
			int latestUserId = random.nextInt(10);
			if (!type) {
				talkDTO.setLatestSender("user_" + latestUserId);
			}
			talkDTO.setLatestMsg("hello, " + latestUserId);
			talkDTO.setMsgTime(new Date());

			talkDTOList.add(talkDTO);
		}
		return ApiResult.success(talkDTOList);
	}
}
