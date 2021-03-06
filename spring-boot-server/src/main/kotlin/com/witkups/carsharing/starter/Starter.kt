package com.witkups.carsharing.starter

import com.witkups.carsharing.users.application.Car
import com.witkups.carsharing.users.authorization.Role
import com.witkups.carsharing.users.authorization.User
import com.witkups.carsharing.users.authorization.UserRepository
import com.witkups.carsharing.users.user.AppUserRepository
import com.witkups.carsharing.users.user.ApplicationUser
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.time.Instant
import java.time.LocalDate
import java.time.Month
import javax.transaction.Transactional

@Configuration
class Starter(
  private val userRepository: UserRepository,
  private val appUserRepository: AppUserRepository,
  private val passwordEncoder: BCryptPasswordEncoder
) : CommandLineRunner {

  @Transactional
  override fun run(vararg args: String?) {
    if (userRepository.findById(1).isPresent) {
      return
    }
    val user1 = User(roles = mutableSetOf(Role.USER), email = "lama1@com.pl", login = "lama",
      password = passwordEncoder.encode("123"), lastLogin = Instant.now())
    val user2 = User(roles = mutableSetOf(Role.USER), email = "lama2@com.pl", login = "lama2",
      password = passwordEncoder.encode("123"), lastLogin = Instant.now())
    val user3 = User(roles = mutableSetOf(Role.USER), email = "lama3@com.pl", login = "lama3",
      password = passwordEncoder.encode("123"), lastLogin = Instant.now())
    val user4 = User(roles = mutableSetOf(Role.USER), email = "lama4@com.pl", login = "lama4",
      password = passwordEncoder.encode("123"), lastLogin = Instant.now())
    val user5 = User(roles = mutableSetOf(Role.USER), email = "lama5@com.pl", login = "lama5",
      password = passwordEncoder.encode("123"), lastLogin = Instant.now())
    userRepository.save(user1)
    userRepository.save(user2)
    userRepository.save(user3)
    userRepository.save(user4)
    userRepository.save(user5)
    val drivingCar = Car(manufacturer = "merc", seatCount = 4, model = "sls500",
      type = Car.Type.SEDAN, yearOfProduction = 2007, fuelUsage = 4.5)
    val driver = ApplicationUser(
      user = user1, cars = mutableSetOf(drivingCar),
      lastName = "borek", firstName = "lamka",
      dateOfBirth = LocalDate.of(1967, Month.JULY, 2)
    )
    appUserRepository.save(driver)
    appUserRepository.save(ApplicationUser(user = user2, lastName = "czesław", firstName = "oomo",
      dateOfBirth = LocalDate.of(1960, Month.APRIL, 13)))
    appUserRepository.save(ApplicationUser(user = user3, lastName = "zdzisiu", firstName = "ego",
      dateOfBirth = LocalDate.of(1996, Month.FEBRUARY, 1)))
    appUserRepository.save(ApplicationUser(user = user4, lastName = "alamdadeusz", firstName = "xyz",
      dateOfBirth = LocalDate.of(1975, Month.MARCH, 25)))
    appUserRepository.save(ApplicationUser(user = user5, lastName = "kot", firstName = "kotonski",
      dateOfBirth = LocalDate.of(1988, Month.SEPTEMBER, 17)))

  }
}
