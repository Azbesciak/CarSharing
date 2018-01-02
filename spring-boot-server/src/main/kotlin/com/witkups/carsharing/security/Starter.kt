package com.witkups.carsharing.security

import com.witkups.carsharing.users.application.Car
import com.witkups.carsharing.users.application.Location
import com.witkups.carsharing.users.application.Route
import com.witkups.carsharing.users.application.RoutePart
import com.witkups.carsharing.users.authorization.Role
import com.witkups.carsharing.users.authorization.User
import com.witkups.carsharing.users.authorization.UserRepository
import com.witkups.carsharing.users.user.AppUserRepository
import com.witkups.carsharing.users.user.ApplicationUser
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.transaction.Transactional

@Configuration
class Starter(
  private val userRepository: UserRepository,
  private val appUserRepository: AppUserRepository,
  private val passwordEncoder: BCryptPasswordEncoder
) : CommandLineRunner {

  @Transactional
  override fun run(vararg args: String?) {
    val user1 = User(roles = mutableSetOf(Role.USER), email = "lama1@com.pl", login = "lama", password = passwordEncoder.encode("123"))
    val user2 = User(roles = mutableSetOf(Role.USER), email = "lama2@com.pl", login = "lama2", password = passwordEncoder.encode("123"))
    val user3 = User(roles = mutableSetOf(Role.USER), email = "lama3@com.pl", login = "lama3", password = passwordEncoder.encode("123"))
    val user4 = User(roles = mutableSetOf(Role.USER), email = "lama4@com.pl", login = "lama4", password = passwordEncoder.encode("123"))
    val user5 = User(roles = mutableSetOf(Role.USER), email = "lama5@com.pl", login = "lama5", password = passwordEncoder.encode("123"))
    userRepository.save(user1)
    userRepository.save(user2)
    userRepository.save(user3)
    userRepository.save(user4)
    userRepository.save(user5)
    val drivingCar = Car(manufacturer = "merc", seatCount = 4, model = "sls500",
      type = Car.Type.SEDAN, yearOfProduction = 2007, fuelUsage = 4.5)
    val driver = ApplicationUser(user = user1, cars = mutableSetOf(
      drivingCar),
      lastName = "borek", firstName = "lamka")
    appUserRepository.save(driver)
    appUserRepository.save(ApplicationUser(user = user2, lastName = "borek", firstName = "lamka"))
    appUserRepository.save(ApplicationUser(user = user3, lastName = "borek", firstName = "lamka"))
    appUserRepository.save(ApplicationUser(user = user4, lastName = "borek", firstName = "lamka"))
    appUserRepository.save(ApplicationUser(user = user5, lastName = "borek", firstName = "lamka"))


//    Route(driver = driver, car = drivingCar, )
  }

  fun routeParts() {
//    Location("someLoc", 14.0, latitude = 15.0, label = "Warsaw, Poland", country = )
  }
}
