package com.witkups.carsharing.authorization

import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping()
class AuthorizationController(private val userRepository: UserRepository) {


  @PostMapping("/login")
  fun login() = "ok"

  @GetMapping("/roles")
  fun getUsers() = userRepository.findAll()

}
