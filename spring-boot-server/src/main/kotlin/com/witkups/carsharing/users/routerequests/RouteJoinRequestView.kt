package com.witkups.carsharing.users.routerequests

import com.witkups.carsharing.users.user.SimpleUserView

data class RouteJoinRequestView(
  val requestId: Long,
  val user: SimpleUserView,
  val locations: List<String>,
  val cost: Double,
  val canJoin: Boolean = true
)
