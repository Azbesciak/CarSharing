package com.witkups.carsharing.users.user

import com.witkups.carsharing.security.AuthFacade
import com.witkups.carsharing.users.application.ApplicationUser
import com.witkups.carsharing.users.authorization.User
import com.witkups.carsharing.users.authorization.UserRepository
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("user")
class AppUserController(
  private val appUserRepository: AppUserRepository,
  private val userRepository: UserRepository,
  private val carRepository: CarRepository,
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
  fun finishRegistration(@RequestBody updatedAppUser: ApplicationUser): ApplicationUser {
    val login = getAuthUser { throw IllegalStateException("User not authenticated") }
    val appUser = appUserRepository.getByUserLogin(login) ?:
      ApplicationUser(user = updatedAppUser.user) validate login
    return appUser updateBy updatedAppUser
  }

  private infix fun ApplicationUser.validate(login: String): ApplicationUser {
    val authUser = getUserCredentials(login)
    if (authUser.login != user?.login ||
      authUser.userId != user?.userId) {
      throw IllegalStateException("User credentials changed")
    }
    user = authUser
    return this
  }

  private infix fun ApplicationUser.updateBy(updated: ApplicationUser) = this {
    firstName = updated.firstName
    lastName = updated.lastName
    phoneNumber = updated.phoneNumber
    dateOfBirth = updated.dateOfBirth
    userPhoto = updated.userPhoto
    updateCars(updated)
    appUserRepository.save(this)
  }

  private infix fun ApplicationUser.updateCars(updated: ApplicationUser) {
    cars.removeIf {!updated.cars.contains(it)}
    cars.addAll(updated.cars)
  }

  private infix inline fun getAuthUser(or: () -> String) = authFacade.getAuthentication().name ?: or()

  private fun getUserCredentials(login: String): User {
    return userRepository
      .findByLoginOrEmail(login)
      .orElseThrow({ UsernameNotFoundException("There is no user $login, although he is authenticated") })
  }
}
