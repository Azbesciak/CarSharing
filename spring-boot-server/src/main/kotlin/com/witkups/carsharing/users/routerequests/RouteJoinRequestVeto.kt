package com.witkups.carsharing.users.routerequests

enum class RouteJoinRequestVeto(val message: String) {
  DRIVER("You cannot join to the route you are driving"),
  ALREADY_REQUESTED("You already requested for this route"),
  ALREADY_PASSENGER("You are already this route passenger"),
  OUTDATED("Request for this route are no longer available"),
  ANONYMOUS("You need to log in first"),
  NO_MORE_FREE_SEATS("There is no more free seats on these route parts")
}
