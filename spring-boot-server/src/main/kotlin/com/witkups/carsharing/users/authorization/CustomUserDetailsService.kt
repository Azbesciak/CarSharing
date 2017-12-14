package com.witkups.carsharing.users.authorization

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

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
