package com.witkups.carsharing.users.authorization

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.scheduling.annotation.Async
import java.time.Instant
import java.util.*

interface UserRepository: JpaRepository<User, Long> {
  fun findByLoginOrEmail(login: String, email: String = login): Optional<User>
  @Modifying
  @Async
  @Query("update User u set u.lastLogin = ?2 where u.login = ?1")
  fun updateLastLoginDate(login: String, time: Instant = Instant.now())
}
