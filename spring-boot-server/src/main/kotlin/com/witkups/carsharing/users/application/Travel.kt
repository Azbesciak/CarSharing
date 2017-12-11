package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "travels")
data class Travel(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "travel_id")
  var id: Long? = null,
  var description: String? = null,

  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  @JoinColumn(name = "driver_id", referencedColumnName = "user_id")
  var driver: ApplicationUser? = null,

  @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true)
  @JoinColumn(name = "travel_part_id")
  var travelParts: MutableSet<TravelPart> = mutableSetOf()

)
