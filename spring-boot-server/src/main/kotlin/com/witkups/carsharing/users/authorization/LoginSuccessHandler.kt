package com.witkups.carsharing.users.authorization

import com.witkups.carsharing.Req
import com.witkups.carsharing.Res
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant


@Service
class LoginSuccessHandler(private val userRepository: UserRepository): AuthenticationSuccessHandler {

  @Transactional
  override fun onAuthenticationSuccess(req: Req, res: Res, authentication: Authentication) {
    val principal = authentication.principal as CustomUserDetails
    val user = userRepository.findByLogin(principal.username)
    user.ifPresent {it.lastLogin = Instant.now()}
    println("ok")
  }
}
