package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.RoutePart
import com.witkups.carsharing.users.user.ApplicationUser
import com.witkups.carsharing.users.user.SimpleUserView

fun RoutePart.toRouteView() = RoutePartView(
  routePartId = this.id!!,
  origin = this.origin!!,
  destination = this.destination!!,
  cost = this.cost!!,
  passengers = this.passengers.map { it.toSimpleUserView() }
)

fun ApplicationUser.toSimpleUserView() = SimpleUserView(
  id = this.id!!,
  firstName = this.firstName!!,
  lastName = this.lastName!!,
  lastLoginDate = this.user!!.lastLogin!!,
  dateOfBirth = this.dateOfBirth!!,
  phoneNumber = this.phoneNumber!!
)
