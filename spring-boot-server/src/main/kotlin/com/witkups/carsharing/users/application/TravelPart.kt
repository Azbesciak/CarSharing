package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "travel_parts")
data class TravelPart(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "travel_part_id")
  var id: Long? = null
)
