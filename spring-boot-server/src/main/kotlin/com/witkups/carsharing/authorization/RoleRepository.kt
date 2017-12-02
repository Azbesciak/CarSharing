package com.witkups.carsharing.authorization

import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository : JpaRepository<Role, Int> {
  fun findByRole(role: String)
}
