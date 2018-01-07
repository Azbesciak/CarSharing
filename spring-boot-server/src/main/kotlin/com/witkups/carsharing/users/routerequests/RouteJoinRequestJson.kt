package com.witkups.carsharing.users.routerequests

data class RouteJoinRequestJson(
  var joinRequestId: Long? = null,
  var applicantId: Long? = null,
  var routeId: Long? = null,
  var requestedRoute: MutableSet<Long> = mutableSetOf(),
  var status: RouteJoinRequest.Status? = null
)
