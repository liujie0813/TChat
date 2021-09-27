package com.timberliu.chat.server.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.timberliu.chat.server.bean.ApiResult;
import com.timberliu.chat.server.bean.dto.chat.GetRecordReqDTO;
import com.timberliu.chat.server.bean.dto.chat.RecordDTO;
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

	@GetMapping("/talk-list")
	public ApiResult<List<TalkDTO>> getTalkList(@RequestParam("userId") Long userId) {
		List<TalkDTO> talks = chatService.getTalkList(userId);
		return ApiResult.success(talks);
	}

}
