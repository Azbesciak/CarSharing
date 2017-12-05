package com.witkups.carsharing.authorization

import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository: JpaRepository<User, Long> {
  fun findByLogin(login: String): Optional<User>
  fun findByEmail(email: String): Optional<User>
}
