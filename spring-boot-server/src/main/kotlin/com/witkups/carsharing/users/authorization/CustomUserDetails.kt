package com.witkups.carsharing.users.authorization

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails

class CustomUserDetails(val user: User) : UserDetails {
  override fun getAuthorities(): MutableCollection<out GrantedAuthority> =
    AuthorityUtils.commaSeparatedStringToAuthorityList(user.roles.joinToString(",") {"ROLE_$it"})

  override fun isEnabled(): Boolean = true

  override fun getUsername(): String = user.login!!

  override fun isCredentialsNonExpired(): Boolean = true

  override fun getPassword(): String = user.password!!

  override fun isAccountNonExpired(): Boolean = true

  override fun isAccountNonLocked(): Boolean = user.status != UserStatus.BANNED
}
