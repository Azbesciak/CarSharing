package com.witkups.carsharing.security

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component

interface AuthFacade {
  fun getAuthentication(): Authentication
}

@Component
class AuthenticationFacade : AuthFacade {
  override fun getAuthentication() = SecurityContextHolder.getContext().authentication
}

