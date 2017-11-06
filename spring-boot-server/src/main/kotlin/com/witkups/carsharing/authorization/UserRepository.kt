package com.witkups.carsharing.authorization

import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<User, Int> {
  fun findUserByLogin(login: String): User?
}
