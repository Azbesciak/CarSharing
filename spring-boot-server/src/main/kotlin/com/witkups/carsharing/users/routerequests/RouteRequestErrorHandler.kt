package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.Res
import mu.KLogging
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.sql.SQLException

@RestControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
class RouteRequestErrorHandler {
  companion object : KLogging()

  @ExceptionHandler(RouteJoinRequestReject::class)
  @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
  fun rejectHandle(e: RouteJoinRequestReject) = RouteError(e.veto.message)

  @ExceptionHandler(IllegalStateException::class)
  fun illegalHandler(e: IllegalStateException, res: Res): Res {
    res.status = 406
    logger.info( "some eerrr", e)
    return res
  }

  @ExceptionHandler(SQLException::class)
  fun sqlExcHandler(e: SQLException, res: Res): Res {
    logger.info( "some eerrr", e)
    return res
  }

  @ExceptionHandler(DataIntegrityViolationException::class)
  @ResponseStatus(HttpStatus.CONFLICT)
  fun anyError(e: DataIntegrityViolationException, res: Res): RouteError {
    logger.info("RouteRequestErrHandler", e)
    return when {
        e.isCausedBy("duplicate") ->
          RouteError("Request already exists")
        e.isCausedBy("CK_ROUTE_PARTS_PASSENGERS_MAX") ->
          RouteError("Max number of passengers on this route parts reached")
        else -> RouteError("Could not process request")
    }
  }

  private fun DataIntegrityViolationException.isCausedBy(reason: String) =
    rootCause?.localizedMessage?.contains(reason) == true

  data class RouteError(
    val message: String
  )
}
