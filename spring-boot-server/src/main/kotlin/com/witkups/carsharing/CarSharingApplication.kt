package com.witkups.carsharing

import com.witkups.carsharing.users.application.Car
import com.witkups.carsharing.users.authorization.Role
import com.witkups.carsharing.users.authorization.User
import com.witkups.carsharing.users.authorization.UserRepository
import com.witkups.carsharing.users.user.AppUserRepository
import com.witkups.carsharing.users.user.ApplicationUser
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.Bean
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter


@SpringBootApplication
@EntityScan(basePackageClasses = [CarSharingApplication::class, Jsr310JpaConverters::class])
class CarSharingApplication {

  @Bean
  fun passwordEncoder() = BCryptPasswordEncoder()

  @Bean
  fun corsFilter(): CorsFilter {
    val source = UrlBasedCorsConfigurationSource()
    val config = CorsConfiguration()
    config.allowCredentials = true
    config.addAllowedOrigin("*")
    config.addAllowedHeader("*")
    config.addAllowedMethod("OPTIONS")
    config.addAllowedMethod("GET")
    config.addAllowedMethod("POST")
    config.addAllowedMethod("PUT")
    config.addAllowedMethod("DELETE")
    source.registerCorsConfiguration("/**", config)
    return CorsFilter(source)
  }

}

fun main(args: Array<String>) {
  SpringApplication.run(CarSharingApplication::class.java, *args)
}
