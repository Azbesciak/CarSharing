package com.witkups.carsharing.users.application

import com.witkups.carsharing.users.authorization.User
import java.io.Serializable
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Pattern

@Entity
data class ApplicationUser(
  @Id
  @JoinColumn(name = "user_id")
  @OneToOne(fetch = FetchType.LAZY, targetEntity = User::class)
  var user: User? = null,

  @Column(nullable = false)
  var lastName: String? = null,
  @Column(nullable = false)
  var firstName: String? = null,
  var dateOfBirth: LocalDate? = null,

  @OneToMany(orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "img_id")
  var photos: MutableSet<Image> = mutableSetOf(),

  @Pattern(regexp = "\\d{9}")
  var phoneNumber: String? = null,

  @OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY)
  var givenOpinions: MutableSet<Opinion> = mutableSetOf(),

  @OneToMany(mappedBy = "reviewed", fetch = FetchType.LAZY)
  var receivedOpinions: MutableSet<Opinion> = mutableSetOf(),

  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name = "car_id")
  var cars: MutableSet<Car> = mutableSetOf()

): Serializable
