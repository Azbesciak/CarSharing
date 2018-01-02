package com.witkups.carsharing.users.routes

import java.time.Instant

data class RoutesSearchParam(
  var origin: String? = null,
  var destination: String? = null,
  var departureDate: Instant? = null,
  var endOfTheDay: Instant? = null
)
