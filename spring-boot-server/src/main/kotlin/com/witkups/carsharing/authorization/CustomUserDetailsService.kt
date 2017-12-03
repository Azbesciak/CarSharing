package com.witkups.carsharing.authorization

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class CustomUserDetailsService(
  private val userRepository: UserRepository
) : UserDetailsService {

  override fun loadUserByUsername(username: String): UserDetails {
    return userRepository.findByLogin(username)
      .map { it.apply { lastLogin = LocalDateTime.now() } }
      .map { CustomUserDetails(it) }
      .orElseThrow { UsernameNotFoundException("No user present with username: $username") }
  }
}
