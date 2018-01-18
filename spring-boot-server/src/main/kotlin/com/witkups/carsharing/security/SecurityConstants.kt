package com.witkups.carsharing.security

object SecurityConstants {
    const val SECRET = "SecretKeyToGenJWTs"
    const val EXPIRATION_TIME: Long = 864_000_000 // 10 days
    const val TOKEN_PREFIX = "Bearer"
    const val HEADER_STRING = "Authorization"
    const val SIGN_UP_URL = "/register"
}
