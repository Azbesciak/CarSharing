package com.witkups.carsharing.authorization

import com.witkups.carsharing.or
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
    return fetchUser(username)
      .map { it { lastLogin = LocalDateTime.now() } }
      .map { CustomUserDetails(it) }
      .orElseThrow { UsernameNotFoundException("No user present with username or email: $username") }
  }

  fun fetchUser(username: String) = with(userRepository) {
      findByLogin(username).or { findByEmail(username) }
    }
}
