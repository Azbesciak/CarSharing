package com.witkups.carsharing.users.authorization

import com.witkups.carsharing.or
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.Instant

@Service
class CustomUserDetailsService(
  private val userRepository: UserRepository
) : UserDetailsService, UserRepository by userRepository {

  @Transactional
  override fun loadUserByUsername(username: String): UserDetails {
    return fetchUser(username)
      .map { it {
        lastLogin = Instant.now()
        status = UserStatus.ONLINE
      } }
      .map { CustomUserDetails(it) }
      .orElseThrow { UsernameNotFoundException("No user present with username or email: $username") }
  }

  fun fetchUser(username: String) = findByLogin(username) or { findByEmail(username) }
}
