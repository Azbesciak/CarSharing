package com.witkups.carsharing

import mu.KLogging
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

  companion object : KLogging()

  @ExceptionHandler(Exception::class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  fun catchAll(e: Throwable) = ErrorMessage(
      "An error occurred. Please try again, or if the situation repeated, contact with us")
    .apply {logger.info {e}}
}
