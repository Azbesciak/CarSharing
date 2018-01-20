package com.witkups.carsharing.users.routes

import com.witkups.carsharing.users.application.RoutePart
import com.witkups.carsharing.users.user.ApplicationUser
import com.witkups.carsharing.users.user.SimpleUserView

fun RoutePart.getView() = RoutePartView(
  routePartId = id!!,
  origin = origin!!,
  destination = destination!!,
  cost = cost!!,
  passengers = passengers.map { it.toSimpleUserView() },
  order = order!!
)

fun ApplicationUser.toSimpleUserView() = SimpleUserView(
  id = id!!,
  firstName = firstName!!,
  lastName = lastName!!,
  lastLoginDate = user!!.lastLogin!!,
  dateOfBirth = dateOfBirth!!,
  phoneNumber = phoneNumber
)
