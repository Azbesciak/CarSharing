package com.witkups.carsharing.users.user

import java.time.Instant
import java.time.LocalDate


data class SimpleUserView(
  val id: Long,
  val firstName: String,
  val lastName: String,
  val phoneNumber: String?,
  val dateOfBirth: LocalDate,
  val lastLoginDate: Instant
)

