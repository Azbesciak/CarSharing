package com.witkups.carsharing.users.user

import com.witkups.carsharing.users.application.ApplicationUser
import com.witkups.carsharing.users.application.Car
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("cars")
class UserCarsController(private val userRepository: AppUserRepository) {

  @PostMapping("update")
  fun updateCar(@RequestBody appUser: ApplicationUser, @RequestBody cars: Set<Car>) {

  }

  @GetMapping("types")
  fun getCarTypes() = Car.Type.values()
}
