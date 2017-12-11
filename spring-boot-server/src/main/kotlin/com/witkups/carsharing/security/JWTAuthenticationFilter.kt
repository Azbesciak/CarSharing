package com.witkups.carsharing.security

import com.fasterxml.jackson.databind.ObjectMapper
import com.witkups.carsharing.Req
import com.witkups.carsharing.Res
import com.witkups.carsharing.security.SecurityConstants.EXPIRATION_TIME
import com.witkups.carsharing.security.SecurityConstants.HEADER_STRING
import com.witkups.carsharing.security.SecurityConstants.SECRET
import com.witkups.carsharing.security.SecurityConstants.TOKEN_PREFIX
import com.witkups.carsharing.users.authorization.CustomUserDetails
import com.witkups.carsharing.users.authorization.CustomUserDetailsService
import com.witkups.carsharing.users.authorization.User
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletException

class JWTAuthenticationFilter(
  private val authenticationManager: AuthenticationManager,
  private val userDetailsService: CustomUserDetailsService
) : UsernamePasswordAuthenticationFilter() {

  override fun getAuthenticationManager() = authenticationManager

  @Throws(AuthenticationException::class)
  override fun attemptAuthentication(req: Req, res: Res?): Authentication? {
    try {
      val creds = ObjectMapper().readValue(req.inputStream, User::class.java)
      if (creds?.login != null) {
        val auth = UsernamePasswordAuthenticationToken(creds.login, creds.password, Collections.emptyList())
        return authenticationManager.authenticate(auth)
      }
      return null
    } catch (e: IOException) {
      throw RuntimeException(e)
    }
  }

  @Throws(IOException::class, ServletException::class)
  override fun successfulAuthentication(req: Req, res: Res, chain: FilterChain?, auth: Authentication) {
    val user = auth.principal as CustomUserDetails
    val token = Jwts.builder()
      .setSubject(user.username)
      .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
      .signWith(SignatureAlgorithm.HS512, SECRET.toByteArray())
      .compact()
    userDetailsService.updateUserLogin(user)
    res.addHeader(HEADER_STRING, "$TOKEN_PREFIX$token")
    res.addHeader("access-control-expose-headers", HEADER_STRING)
  }
}
