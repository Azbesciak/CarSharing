package com.witkups.carsharing.authorization

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class AuthorizationController(private val userRepository: UserRepository,
                              private val bCryptPasswordEncoder: BCryptPasswordEncoder)
{

  @GetMapping("/users")
  fun getUsers() = userRepository.findAll()


  @PostMapping("/register")
  fun register(@RequestBody user: User) = user {
      password = bCryptPasswordEncoder.encode(password)
      userRepository.save(this)
    }

}
