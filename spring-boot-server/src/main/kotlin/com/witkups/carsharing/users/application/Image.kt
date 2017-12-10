package com.witkups.carsharing.users.application

import javax.persistence.*

@Entity
@Table(name = "images")
class Image(
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "img_id")
  var id: Long? = null,

  @Lob
  @Column(nullable = false, name = "data")
  var imgData: Array<Byte>? = null
)
