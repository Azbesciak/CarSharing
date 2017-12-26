package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "route_parts")
data class RoutePart(
  @Id
  @Column(name = "route_part_id")
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  var id: Long? = null,

  @JoinColumn(name = "origin_id", nullable = false, referencedColumnName = "route_snapshot_id")
  @ManyToOne(optional = false, cascade = [CascadeType.DETACH])
  var origin: RouteSnapshot? = null,
  @JoinColumn(name = "destination_id", nullable = false, referencedColumnName = "route_snapshot_id")
  @ManyToOne(optional = false, cascade = [CascadeType.DETACH])
  var destination: RouteSnapshot? = null
)
