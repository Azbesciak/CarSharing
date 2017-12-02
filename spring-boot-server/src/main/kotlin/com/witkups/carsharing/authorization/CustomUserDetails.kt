package com.witkups.carsharing.authorization

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.userdetails.UserDetails

class CustomUserDetails(private val user: User) : UserDetails {
  override fun getAuthorities(): MutableCollection<out GrantedAuthority> =
    AuthorityUtils.commaSeparatedStringToAuthorityList(user.roles.joinToString(","))

  override fun isEnabled(): Boolean = user.status == UserStatus.ONLINE

  override fun getUsername(): String = user.login!!

  override fun isCredentialsNonExpired(): Boolean = true

  override fun getPassword(): String = user.password!!

  override fun isAccountNonExpired(): Boolean = true

  override fun isAccountNonLocked(): Boolean = user.status != UserStatus.BANNED
}
