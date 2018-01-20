package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.users.user.SimpleUserView

data class RouteJoinRequestView(
  val requestId: Long,
  val user: SimpleUserView,
  val locations: List<String>,
  val partsIds: List<Long>,
  val cost: Double
)
