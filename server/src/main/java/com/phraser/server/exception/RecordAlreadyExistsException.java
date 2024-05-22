package com.phraser.server.exception;


public class RecordAlreadyExistsException extends Exception {
    public RecordAlreadyExistsException() {
    }
    public RecordAlreadyExistsException(String message) {
        super(message);
    }
}
