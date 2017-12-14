package com.witkups.carsharing.users.user

import com.witkups.carsharing.users.application.ApplicationUser
import com.witkups.carsharing.users.authorization.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("user")
class AppUserController(
  private val appUserRepository: AppUserRepository,
  private val userRepository: UserRepository) {

  @GetMapping("data")
  fun getAppUser(authentication: Authentication): ApplicationUser {
    val login = authentication.name
    val appUser = appUserRepository.getByUser(login)
    if (appUser == null) {
      val user = userRepository
        .findByLoginOrEmail(login)
        .orElseThrow({UsernameNotFoundException("There is no user $login, although he is authenticated")})
      user.password = null
      return ApplicationUser(user = user)
    }
    return appUser
  }
}
