package com.witkups.carsharing.users.routes

import java.time.Instant

data class SimpleRouteResult(
  val routeId: Long,
  val driverName: String,
  val cost: Double,
  val departureDate: Instant,
  val locations: List<String>,
  val freeSeats: Int
)
