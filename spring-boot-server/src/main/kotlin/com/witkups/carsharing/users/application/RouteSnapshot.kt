package com.witkups.carsharing.users.application

import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "route_snapshots")
data class RouteSnapshot(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "route_snapshot_id")
  var id: Long? = null,

  @Column(nullable = false)
  @Embedded
  var location: Location? = null,

  @Column(nullable = true)
  var date: Instant

)
