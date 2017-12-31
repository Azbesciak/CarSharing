package com.witkups.carsharing.users.user

import com.witkups.carsharing.security.AuthFacade
import com.witkups.carsharing.users.application.ApplicationUser
import com.witkups.carsharing.users.authorization.CustomUserDetails
import com.witkups.carsharing.users.authorization.User
import com.witkups.carsharing.users.authorization.UserRepository
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("user")
class AppUserController(
  private val appUserRepository: AppUserRepository,
  private val userRepository: UserRepository,
  private val authFacade: AuthFacade) {

  @GetMapping("data")
  fun getAppUser(): ApplicationUser? {
    val user = getAuthUser()
    return appUserRepository
      .findById(user.userId!!)
      .orElse(ApplicationUser(user = user))
  }

  @PostMapping("update")
  fun finishRegistration(@RequestBody updatedAppUser: ApplicationUser): ApplicationUser {
    val user = getAuthUser()
    val appUser = appUserRepository.findById(user.userId!!)
      .orElseGet { ApplicationUser(user = updatedAppUser.user) validate user }
    return appUser updateBy updatedAppUser
  }

  private infix fun ApplicationUser.validate(authUser: User): ApplicationUser {
    if (authUser.login != user?.login ||
      authUser.userId != user?.userId) {
      throw IllegalStateException("User credentials changed")
    }
    userRepository
      .findById(authUser.userId!!)
      .ifPresent{user = it}
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
    cars.removeIf { !updated.cars.contains(it) }
    cars.addAll(updated.cars)
  }

  private fun getAuthUser() =
    ((authFacade.getAuthentication().principal as UsernamePasswordAuthenticationToken)
      .principal as CustomUserDetails)
      .user {
        password = null
      }
}
