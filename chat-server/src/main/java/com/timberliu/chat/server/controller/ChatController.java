package com.timberliu.chat.server.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.chat.GetTalkReqDTO;
import com.timberliu.chat.server.bean.dto.chat.TalkDTO;
import com.timberliu.chat.server.service.IChatService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author liujie
 * @date 2021/9/6
 */
@RestController
@RequestMapping("/chat")
public class ChatController {

	@Resource
	private IChatService chatService;

	@PostMapping("/talk-records")
	public ApiResult<IPage<TalkDTO>> getTalkList(@RequestBody GetTalkReqDTO talkReqDTO) {
		IPage<TalkDTO> talks = chatService.getTalks(talkReqDTO);
		return ApiResult.success(talks);
	}

}
