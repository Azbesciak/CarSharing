package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.users.application.Location
import com.witkups.carsharing.users.user.SimpleUserView

data class RouteJoinRequestView(
  val requestId: Long,
  val user: SimpleUserView,
  val locations: List<Location>,
  val cost: Double
)
