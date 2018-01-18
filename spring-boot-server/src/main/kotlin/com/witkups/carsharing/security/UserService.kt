package com.witkups.carsharing.security

import com.witkups.carsharing.users.authorization.CustomUserDetails
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class UserService {
  fun getAuthUser() =
    (getUserTokenAuth().principal as CustomUserDetails)
      .user { password = null }

  fun isAuthorized() = getPrincipal() is UsernamePasswordAuthenticationToken

  private fun getUserTokenAuth() =
    getPrincipal() as UsernamePasswordAuthenticationToken

  private fun getPrincipal() = SecurityContextHolder.getContext().authentication.principal
}
