package com.witkups.carsharing.users.authorization

import com.witkups.carsharing.map
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
      .map { CustomUserDetails(it) }
      .orElseThrow { UsernameNotFoundException("No user present with username or email: $username") }
  }

  @Transactional
  fun updateUserLogin(user: UserDetails) = updateLastLoginDate(user.username!!)

  private fun fetchUser(username: String) = findByLoginOrEmail(username)
}
