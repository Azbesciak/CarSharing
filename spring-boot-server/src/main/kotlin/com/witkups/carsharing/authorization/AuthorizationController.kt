package com.witkups.carsharing.authorization

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping()
class AuthorizationController(private val userRepository: UserRepository,
                              private val bCryptPasswordEncoder: BCryptPasswordEncoder)
{

  @PostMapping("/login")
  fun login() = "ok"

  @GetMapping("/roles")
  fun getUsers() = userRepository.findAll()

  @PostMapping("/register")
  fun register(user: User): User {
    user.password = bCryptPasswordEncoder.encode(user.password)
    return user
  }

}
