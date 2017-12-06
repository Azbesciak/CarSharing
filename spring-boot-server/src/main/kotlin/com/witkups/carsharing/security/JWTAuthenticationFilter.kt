package com.witkups.carsharing.security

import com.fasterxml.jackson.databind.ObjectMapper
import com.witkups.carsharing.authorization.CustomUserDetails
import com.witkups.carsharing.authorization.User
import com.witkups.carsharing.security.SecurityConstants.EXPIRATION_TIME
import com.witkups.carsharing.security.SecurityConstants.HEADER_STRING
import com.witkups.carsharing.security.SecurityConstants.SECRET
import com.witkups.carsharing.security.SecurityConstants.TOKEN_PREFIX
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.io.IOException
import java.util.ArrayList
import java.util.Date

import org.springframework.security.core.GrantedAuthority

class JWTAuthenticationFilter(private val authenticationManager: AuthenticationManager) : UsernamePasswordAuthenticationFilter() {

  override fun getAuthenticationManager() = authenticationManager

  @Throws(AuthenticationException::class)
    override fun attemptAuthentication(req: HttpServletRequest,
                                       res: HttpServletResponse?): Authentication {
        try {
            val creds = ObjectMapper()
                    .readValue(req.inputStream, User::class.java)

            return authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            creds.login,
                            creds.password,
                            ArrayList<GrantedAuthority>())
            )
        } catch (e: IOException) {
            throw RuntimeException(e)
        }

    }

    @Throws(IOException::class, ServletException::class)
    override fun successfulAuthentication(req: HttpServletRequest,
                                          res: HttpServletResponse,
                                          chain: FilterChain?,
                                          auth: Authentication) {

        val token = Jwts.builder()
                .setSubject((auth.principal as CustomUserDetails).username)
                .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.toByteArray())
                .compact()
        res.addHeader(HEADER_STRING, "$TOKEN_PREFIX$token")
        res.addHeader("access-control-expose-headers", HEADER_STRING)
    }
}
