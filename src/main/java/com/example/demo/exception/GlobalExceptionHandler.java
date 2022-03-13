package com.example.demo.exception;


import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    protected ResponseEntity<ErrorMessage> updateUserDoesNotExist(
            UserNotFoundException ex, WebRequest request) {
        String bodyOfResponse = "The user you are trying to update does not exist.";

        ErrorMessage message = new ErrorMessage(
                bodyOfResponse,
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    protected ResponseEntity<ErrorMessage> deleteUserDoesNotExist(
            EmptyResultDataAccessException ex, WebRequest request) {
        String bodyOfResponse = "The user you are trying to delete does not exist.";

        ErrorMessage message = new ErrorMessage(
                bodyOfResponse,
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<ErrorMessage> userNotValidated(
            MethodArgumentNotValidException ex, WebRequest request) {
        String bodyOfResponse = "The user data you sent was incomplete.";

        ErrorMessage message = new ErrorMessage(
                bodyOfResponse,
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<ErrorMessage> userNotValidated(
            RuntimeException ex, WebRequest request) {
        String bodyOfResponse = "The service is experiencing issues. Please try again in a few minutes.";

        ErrorMessage message = new ErrorMessage(
                bodyOfResponse,
                request.getDescription(false));

        return new ResponseEntity<>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
