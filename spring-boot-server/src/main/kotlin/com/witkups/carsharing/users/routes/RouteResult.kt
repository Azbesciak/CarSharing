package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.Car
import com.witkups.carsharing.users.routerequests.RouteJoinRequestVeto
import com.witkups.carsharing.users.user.SimpleUserView
import java.time.Instant

data class SimpleRouteResult(
  val routeId: Long,
  val driverName: String,
  val cost: Double,
  val departureDate: Instant,
  val locations: List<String>,
  val freeSeats: Int,
  val searchedRouteIds: List<Long>,
  val joinVeto: RouteJoinRequestVeto?
)

data class DetailedRouteResult(
  val routeId: Long,
  var driver: SimpleUserView,
  val car: Car,
  val cost: Double,
  val departureDate: Instant,
  val freeSeats: Int,
  val routeParts: List<RoutePartView>,
  val searchedRouteIds: List<Long>,
  val description: String?,
  val joinVeto: RouteJoinRequestVeto?
)

data class RouteView(
  val routeId: Long,
  val car: Car,
  val routeParts: List<RoutePartView>,
  val description: String?,
  val locations: List<String>
)
