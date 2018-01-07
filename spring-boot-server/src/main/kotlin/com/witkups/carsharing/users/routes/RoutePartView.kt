package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.RouteSnapshot
import com.witkups.carsharing.users.user.SimpleUserView


data class RoutePartView(
  val routePartId: Long,
  val origin: RouteSnapshot,
  val destination: RouteSnapshot,
  val cost: Double,
  val passengers: Iterable<SimpleUserView>
)

