package com.witkups.carsharing.authorization

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(
  private val userRepository: UserRepository
): UserDetailsService {

  override fun loadUserByUsername(username: String): UserDetails {
    return userRepository.findByLogin(username)
      .map { CustomUserDetails(it) }
      .orElseThrow { UsernameNotFoundException("No user present with username: $username") }
  }
}
