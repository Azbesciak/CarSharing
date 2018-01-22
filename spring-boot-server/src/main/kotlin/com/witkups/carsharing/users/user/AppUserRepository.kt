package com.witkups.carsharing.users.user

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query


interface AppUserRepository : JpaRepository<ApplicationUser, Long> {

  @Query("select u from ApplicationUser u where u.user.login = ?1")
  fun getByUserLogin(login: String): ApplicationUser

  fun findApplicationUserById(id: Long?): ApplicationUser
}
