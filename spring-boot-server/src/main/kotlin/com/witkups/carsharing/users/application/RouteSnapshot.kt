package com.witkups.carsharing.users.application

import java.time.Instant
import javax.persistence.*
import javax.validation.constraints.Future

@Embeddable
@Table(name = "route_snapshots")
data class RouteSnapshot(
  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "location_id", nullable = false,
    insertable = false, updatable = false,
    foreignKey = ForeignKey(name = "FK_SNAPSHOT_LOC"))
  var location: Location? = null,

  @Column(nullable = false)
  @Future
  var date: Instant? = null

)
