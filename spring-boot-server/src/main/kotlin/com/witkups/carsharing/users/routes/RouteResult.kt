package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Car
import com.witkups.carsharing.users.application.RoutePart
import java.time.Instant
import java.time.LocalDate

data class SimpleRouteResult(
  val routeId: Long,
  val driverName: String,
  val cost: Double,
  val departureDate: Instant,
  val locations: List<String>,
  val freeSeats: Int,
  val searchedRouteIds: List<Long>
)

data class DetailedRouteResult(
  val routeId: Long,
  var driver: UserSimpleData,
  val car: Car,
  val cost: Double,
  val departureDate: Instant,
  val freeSeats: Int,
  val routeParts: List<RoutePart>,
  val searchedRouteIds: List<Long>
)

data class UserSimpleData(
  val id: Long,
  val firstName: String,
  val lastName: String,
  val phoneNumber: String?,
  val dateOfBirth: LocalDate,
  val lastLoginDate: Instant
)
