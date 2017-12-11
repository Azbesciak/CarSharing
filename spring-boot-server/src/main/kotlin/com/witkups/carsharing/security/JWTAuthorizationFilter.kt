package com.witkups.carsharing.security

import com.witkups.carsharing.security.SecurityConstants.HEADER_STRING
import com.witkups.carsharing.security.SecurityConstants.SECRET
import com.witkups.carsharing.security.SecurityConstants.TOKEN_PREFIX
import com.witkups.carsharing.users.authorization.CustomUserDetailsService
import io.jsonwebtoken.Jwts
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JWTAuthorizationFilter(
  authManager: AuthenticationManager,
  private val userDetailsService: CustomUserDetailsService
) : BasicAuthenticationFilter(authManager) {

  @Throws(IOException::class, ServletException::class)
  override fun doFilterInternal(req: HttpServletRequest,
                                res: HttpServletResponse,
                                chain: FilterChain) {
    val header = req.getHeader(HEADER_STRING)

    if (header == null || !header.startsWith(TOKEN_PREFIX)) {
      chain.doFilter(req, res)
      return
    }

    getAuthentication(req).ifPresent {
      SecurityContextHolder.getContext().authentication = it
    }
    chain.doFilter(req, res)
  }

  private fun getAuthentication(request: HttpServletRequest): Optional<UsernamePasswordAuthenticationToken> {
    return Optional.ofNullable(request.getHeader(HEADER_STRING))
      .flatMap { Optional.ofNullable(getUserFromToken(it)) }
        .map { userDetailsService.loadUserByUsername(it) }
        .map { UsernamePasswordAuthenticationToken(it.username, it.password, it.authorities) }
      .map { UsernamePasswordAuthenticationToken(it, null, Collections.emptyList()) }
  }

  private fun getUserFromToken(it: String): String? {
    return Jwts.parser()
      .setSigningKey(SECRET.toByteArray())
      .parseClaimsJws(it.replace(TOKEN_PREFIX, ""))
      .body
      .subject
  }

}
