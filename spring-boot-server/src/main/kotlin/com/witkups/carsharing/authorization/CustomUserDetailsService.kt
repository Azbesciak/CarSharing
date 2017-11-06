package com.witkups.carsharing.authorization

import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(private val repository: UserRepository): UserDetailsService {

  override fun loadUserByUsername(username: String): UserDetails {
    val user = repository.findUserByLogin(username)
    if (user != null)
      return CustomUserDetails(user)
    else
      throw UsernameNotFoundException("No user present with username: " + username)

  }
}
