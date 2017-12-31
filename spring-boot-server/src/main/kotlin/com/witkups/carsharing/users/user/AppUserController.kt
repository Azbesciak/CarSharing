package com.witkups.carsharing.users.user

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("user")
class AppUserController(
  private val appUserRepository: AppUserRepository,
  private val appUserService: AppUserService) {

  @GetMapping("data")
  fun getAppUser(): ApplicationUser = appUserService.getCurrentAppUser()

  @PostMapping("update")
  fun updateAppUserData(@RequestBody updatedAppUser: ApplicationUser) =
    appUserService.getCurrentAppUser() updateBy updatedAppUser

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
}
