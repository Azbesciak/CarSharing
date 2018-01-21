package com.witkups.carsharing.users.user

import com.witkups.carsharing.ErrorMessage
import com.witkups.carsharing.security.UserService
import com.witkups.carsharing.users.authorization.UserRepository
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.ExceptionHandler
import java.nio.file.attribute.UserPrincipalNotFoundException

@Service
class AppUserService(
  private val userService: UserService,
  private val appUserRepository: AppUserRepository,
  private val userRepository: UserRepository) {

  fun getCurrentAppUserIfPresent() =
    if (userService.isAuthorized()) getCurrentAppUserReference() else null

  fun getCurrentAppUser() = withUserId {
    appUserRepository
      .findById(it)
      .orElseGet { createNewAppUserWithUserId(it) }
  }

  fun getCurrentAppUserReference() = withUserId {
    appUserRepository.getOne(it)
  }

  fun getUserId()= userService.getAuthUser().userId!!

  private inline fun withUserId(f: (l: Long) -> ApplicationUser) =  f(getUserId())

  private fun createNewAppUserWithUserId(userId: Long) =
    ApplicationUser(
      user = userRepository.findById(userId)
        .orElseThrow { UserPrincipalNotFoundException("No user with id $userId") })

}
