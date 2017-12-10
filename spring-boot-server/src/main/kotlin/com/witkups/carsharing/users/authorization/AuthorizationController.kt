package com.witkups.carsharing.users.authorization

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class AuthorizationController(private val userRepository: UserRepository,
                              private val bCryptPasswordEncoder: BCryptPasswordEncoder
) : UserRepository by userRepository {

  @GetMapping("/users")
  fun getUsers() = findAll()


  @PostMapping("/register")
  fun register(@RequestBody user: User) = save(user {
      password = bCryptPasswordEncoder.encode(password)
      roles += Role.USER
    })

}
