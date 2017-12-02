package com.witkups.carsharing.configuration

import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.io.IOException
import javax.servlet.ServletException
import javax.servlet.FilterChain


@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
class CorsFilter : OncePerRequestFilter() {

  @Throws(ServletException::class, IOException::class)
  override fun doFilterInternal(
    request: HttpServletRequest,
    response: HttpServletResponse,
    filterChain: FilterChain) {

    val origin = request.getHeader(ORIGIN)

    response.setHeader("Access-Control-Allow-Origin", "*")//* or origin as u prefer
    response.setHeader("Access-Control-Allow-Credentials", "true")
    response.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE, PATCH")
    response.setHeader("Access-Control-Max-Age", "3600")
    response.setHeader("Access-Control-Allow-Headers", "content-type, authorization")

    if (request.method == "OPTIONS")
      response.status = HttpServletResponse.SC_OK
    else
      filterChain.doFilter(request, response)

  }

  companion object {

    internal val ORIGIN = "Origin"
  }

}
