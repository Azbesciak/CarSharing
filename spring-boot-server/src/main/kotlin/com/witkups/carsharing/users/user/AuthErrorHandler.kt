package com.witkups.carsharing.users.user

import com.witkups.carsharing.ErrorMessage
import mu.KLogging
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.http.HttpStatus
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
class AuthErrorHandler {
  companion object : KLogging()

  @ExceptionHandler(JpaObjectRetrievalFailureException::class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  fun userNotFoundHandler(e: Exception): ErrorMessage {
    return ErrorMessage("You need to complete your basic data")
  }
}
