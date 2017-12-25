package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "route_parts")
data class RoutePart(
  @Id
  @Column(name = "route_part_id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  var id: Long? = null,

  @Column(nullable = false)
  var origin: RouteSnapshot? = null,
  @Column(nullable = false)
  var destination: RouteSnapshot? = null
)
