package com.witkups.carsharing.authorization

interface UserService {
  fun saveUser(user: User)
  fun findUserByEmail(email: String): User
}
