package com.witkups.carsharing.users.application

import com.witkups.carsharing.users.authorization.User
import java.io.Serializable
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.Pattern

@Entity
@Table(name = "application_users")
data class ApplicationUser(
  @Id
  @Column(name = "user_id")
  var id: Long? = null,

  @MapsId
  @JoinColumn(name = "user_id", foreignKey = ForeignKey(name = "FK_APP_USER_USER_ID"), nullable = false)
  @OneToOne(fetch = FetchType.LAZY, targetEntity = User::class, orphanRemoval = true, optional = false)
  var user: User? = null,

  @Column(nullable = false)
  var lastName: String? = null,
  @Column(nullable = false)
  var firstName: String? = null,
  var dateOfBirth: LocalDate? = null,

  @OneToMany(orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "img_id", foreignKey = ForeignKey(name = "FK_IMAGES_USER_PHOTOS"))
  var photos: MutableSet<Image> = mutableSetOf(),

  @JoinColumn(name = "img_id", foreignKey = ForeignKey(name = "FK_APP_USER_MAIN_PHOTO"))
  @OneToOne(orphanRemoval = true, fetch = FetchType.LAZY, optional = true)
  var userPhoto: Image? = null,

  @Pattern(regexp = "\\d{9}")
  var phoneNumber: String? = null,

  @OneToMany(cascade = [CascadeType.ALL], orphanRemoval = true, fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", foreignKey = ForeignKey(name = "FK_APP_USER_CARS"), nullable = false)
  var cars: MutableSet<Car> = mutableSetOf()

): Serializable {
  operator fun invoke(function: ApplicationUser.() -> Unit): ApplicationUser {
    function()
    return this
  }
}
