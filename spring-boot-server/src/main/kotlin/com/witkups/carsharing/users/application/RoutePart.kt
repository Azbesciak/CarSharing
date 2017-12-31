package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "route_parts")
data class RoutePart(
  @Id
  @Column(name = "route_part_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null,

  @JoinColumn(name = "origin_id", nullable = false,
    referencedColumnName = "route_snapshot_id",
    foreignKey = ForeignKey(name = "FK_ROUTE_PARTS_ORIGIN"))
  @ManyToOne(optional = false, cascade = [CascadeType.DETACH])
  var origin: RouteSnapshot? = null,

  @JoinColumn(name = "destination_id", nullable = false,
    referencedColumnName = "route_snapshot_id",
    foreignKey = ForeignKey(name = "FK_ROUTE_PARTS_DESTINATION"))
  @ManyToOne(optional = false, cascade = [CascadeType.DETACH])
  var destination: RouteSnapshot? = null,

  @Column(nullable = false)
  var distance: Double? = null,

  @Column(nullable = false)
  var cost: Double? = null,

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "route_part_passengers",
    joinColumns = [(JoinColumn(name = "route_part_id", foreignKey = ForeignKey(name = "FK_APP_USER_ROUTE_PART")))],
    inverseJoinColumns = [(JoinColumn(name = "user_id", foreignKey = ForeignKey(name = "FK_ROUTE_PART_APP_USER")))]
  )
  var passengers: Set<ApplicationUser> = setOf()
)
