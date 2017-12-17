package com.witkups.carsharing.users.user

import com.witkups.carsharing.security.AuthFacade
import com.witkups.carsharing.users.application.ApplicationUser
import com.witkups.carsharing.users.authorization.User
import com.witkups.carsharing.users.authorization.UserRepository
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("user")
class AppUserController(
  private val appUserRepository: AppUserRepository,
  private val userRepository: UserRepository,
  private val authFacade: AuthFacade) {

  @GetMapping("data")
  fun getAppUser(): ApplicationUser? {
    val login = getAuthUser { return null }
    val appUser = appUserRepository.getByUserLogin(login)
    if (appUser == null) {
      val user = getUserCredentials(login)
      user.password = null
      return ApplicationUser(user = user)
    }
    return appUser
  }

  @PostMapping("update")
  @Transactional
  fun finishRegistration(@RequestBody updatedAppUser: ApplicationUser): ApplicationUser {
    val login = getAuthUser { throw IllegalStateException("User not authenticated") }
    val appUser = appUserRepository.getByUserLogin(login)
    return if (appUser != null)
      onUserUpdate(appUser, updatedAppUser)
    else
      insertNewAppUser(login, updatedAppUser)
  }

  private fun insertNewAppUser(login: String, updatedAppUser: ApplicationUser): ApplicationUser {
    val user = getUserCredentials(login)
    if (user.login != updatedAppUser.user?.login ||
        user.userId != updatedAppUser.user?.userId) {
      throw IllegalStateException("User credentials changed")
    }
    updatedAppUser.user = user
    appUserRepository.save(updatedAppUser)
    return updatedAppUser
  }

  private fun onUserUpdate(original: ApplicationUser, updated: ApplicationUser) =
    original {
      firstName = updated.firstName
      lastName = updated.lastName
      phoneNumber = updated.phoneNumber
      dateOfBirth = updated.dateOfBirth
      userPhoto = updated.userPhoto
    }

  private infix inline fun getAuthUser(or: () -> String) = authFacade.getAuthentication().name ?: or()

  private fun getUserCredentials(login: String): User {
    return userRepository
      .findByLoginOrEmail(login)
      .orElseThrow({ UsernameNotFoundException("There is no user $login, although he is authenticated") })
  }

}
