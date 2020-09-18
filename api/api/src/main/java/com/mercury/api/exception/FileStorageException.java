package com.mercury.api.exception;

public class FileStorageException extends RuntimeException {

    static final long serialVersionUID = 1;

    public FileStorageException(String message) {
        super(message);
    }

    public FileStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}