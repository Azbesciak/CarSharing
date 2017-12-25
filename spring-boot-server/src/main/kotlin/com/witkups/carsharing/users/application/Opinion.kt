package com.witkups.carsharing.users.application

import com.witkups.carsharing.users.authorization.User
import org.hibernate.annotations.CreationTimestamp
import java.time.Instant
import javax.persistence.*
import javax.validation.constraints.Size

@Entity
@Table(name = "opinions")
data class Opinion(

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  var id: Long? = null,

  @ManyToOne(targetEntity = User::class, fetch = FetchType.LAZY, cascade = [CascadeType.DETACH])
  @JoinColumn(name = "reviewer_id", nullable = false, referencedColumnName = "user_id")
  var reviewer: User? = null,

  @ManyToOne(targetEntity = User::class, fetch = FetchType.LAZY, cascade = [CascadeType.DETACH])
  @JoinColumn(name = "reviewed_id", nullable = false, referencedColumnName = "user_id")
  var reviewed: User? = null,

  @CreationTimestamp
  var date: Instant? = null,

  @Column(nullable = false, columnDefinition = "text")
  @Size(min = 20, max = 300)
  var content: String? = null

)
