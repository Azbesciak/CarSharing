package com.witkups.carsharing.users.authorization

import org.hibernate.annotations.CreationTimestamp
import java.io.Serializable
import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "user_id")
  var userId: Long? = null,

  @JoinTable(name = "roles", joinColumns = [(JoinColumn(name = "user_id"))])
  @Column(name = "role", nullable = false)
  @Enumerated(EnumType.STRING)
  @ElementCollection(targetClass = Role::class, fetch = FetchType.EAGER)
  val roles: MutableSet<Role> = hashSetOf(),

  @Column(unique = true, nullable = false)
  var login: String? = null,

  @Column(nullable = false)
  var password: String? = null,

  @Column(nullable = false, unique = true)
  var email: String? = null,

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  var status: UserStatus = UserStatus.OFFLINE,

  var lastLogin: Instant? = null,
  @CreationTimestamp
  @Column(nullable = false)
  var registered: Instant? = Instant.now()
) : Serializable {
  operator fun invoke(function: User.() -> Unit): User {
    function()
    return this
  }
}
