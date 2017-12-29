package com.witkups.carsharing.users.application

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id

@Entity
data class Location(
  @Id
  @Column(name = "location_id")
  val placeId: String? = null,
  @Column(nullable = false)
  var longitude: Double? = null,
  @Column(nullable = false)
  var latitude: Double? = null,
  @Column(nullable = false)
  var label: String? = null,
  @Column(nullable = false)
  var country: String? = null,
  @Column(nullable = false)
  var administrative_area_level_1: String? = null,
  var administrative_area_level_2: String? = null,
  var locality: String? = null,
  var route: String? = null
)
