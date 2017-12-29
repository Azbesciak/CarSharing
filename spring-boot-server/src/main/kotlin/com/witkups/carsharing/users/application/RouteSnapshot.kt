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

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "location_id", nullable = false,
    insertable = false, updatable = false,
    foreignKey = ForeignKey(name = "FK_SNAPSHOT_LOC"))
  var location: Location? = null,

  @Column(nullable = true)
  var date: Instant

)
