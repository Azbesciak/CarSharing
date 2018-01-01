package com.witkups.carsharing.users.application

import com.witkups.carsharing.users.user.ApplicationUser
import org.hibernate.annotations.Check
import javax.persistence.*

@Entity
@Table(name = "route_parts")
@Check(constraints = "departure <= arrival")
data class RoutePart(
  @Id
  @Column(name = "route_part_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null,

  @Column(nullable = false, name = "route_part_order")
  var order: Int? = null,

  @Embedded
  @AttributeOverrides(
    AttributeOverride(name = "date", column = Column(name = "departure", nullable = false)),
    AttributeOverride(name = "location_id", column = Column(name = "origin", nullable = false))
  )
  @AssociationOverride(
    name = "location", joinColumns = [
    JoinColumn(name = "origin_id", nullable = false,
//      insertable = false, updatable = false,
      foreignKey = ForeignKey(name = "FK_ROUTE_PARTS_ORIGIN_ID"))
  ])
  var origin: RouteSnapshot? = null,

  @Embedded
  @AttributeOverrides(
    AttributeOverride(name = "date", column = Column(name = "arrival", nullable = false)),
    AttributeOverride(name = "location_id", column = Column(name = "destination_id", nullable = false))
  )
  @AssociationOverride(
    name = "location", joinColumns = [
    JoinColumn(name = "destination_id", nullable = false,
//      insertable = false, updatable = false,
      foreignKey = ForeignKey(name = "FK_ROUTE_PARTS_DESTINATION_ID"))
  ])
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
