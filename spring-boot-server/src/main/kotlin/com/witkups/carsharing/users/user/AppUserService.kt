package com.witkups.carsharing.users.user

import com.witkups.carsharing.security.UserService
import com.witkups.carsharing.users.authorization.UserRepository
import org.springframework.stereotype.Service
import java.nio.file.attribute.UserPrincipalNotFoundException

@Service
class AppUserService(
  private val userService: UserService,
  private val appUserRepository: AppUserRepository,
  private val userRepository: UserRepository) {

  fun getCurrentAppUser() = withUserId {
    appUserRepository
      .findById(it)
      .orElseGet { createNewAppUserWithUserId(it) }
  }

  fun getCurrentAppUserReference() = withUserId {
    appUserRepository.getOne(it)
  }

  private inline fun withUserId(f: (l: Long) -> ApplicationUser): ApplicationUser {
    val user = userService.getAuthUser()
    val userId = user.userId!!
    return f(userId)
  }

  private fun createNewAppUserWithUserId(userId: Long): ApplicationUser {
    return ApplicationUser(
      user = userRepository.findById(userId)
        .orElseThrow { UserPrincipalNotFoundException("No user with id $userId") })
  }

}
