package com.witkups.carsharing.configuration

import java.io.IOException

import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint

class CustomBasicAuthenticationEntryPoint : BasicAuthenticationEntryPoint() {

    @Throws(IOException::class, ServletException::class)
    override fun commence(request: HttpServletRequest?,
                          response: HttpServletResponse,
                          authException: AuthenticationException) {
        //Authentication failed, send error response.
        response.status = HttpServletResponse.SC_UNAUTHORIZED
        response.addHeader("WWW-Authenticate", "Basic realm=$realmName")

        val writer = response.writer
        writer.println("HTTP Status 401 : ${authException.message}")
    }

    @Throws(Exception::class)
    override fun afterPropertiesSet() {
        realmName = "Lama"
        super.afterPropertiesSet()
    }
}
