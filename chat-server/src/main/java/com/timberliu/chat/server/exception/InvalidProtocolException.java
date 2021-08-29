package com.timberliu.chat.server.exception;

/**
 * @author liujie
 * @date 2021/8/27
 */

public class InvalidProtocolException extends RuntimeException {

    public InvalidProtocolException() {
        super();
    }

    public InvalidProtocolException(String message) {
        super(message);
    }

    public InvalidProtocolException(String message, Throwable cause) {
        super(message, cause);
    }
}
