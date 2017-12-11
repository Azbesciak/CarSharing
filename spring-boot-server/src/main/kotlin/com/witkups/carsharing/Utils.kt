package com.witkups.carsharing

import org.apache.tomcat.util.http.parser.Authorization
import java.util.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


inline infix fun <T> Optional<T>.or(supplier: ()-> Optional<T>) = if (isPresent) this else supplier()

operator fun <T> T.invoke(op: T.() -> Unit): T {
  op()
  return this
}

inline infix fun <S, T> S.mapTo(f: S.() -> T): T = f()

typealias Req = HttpServletRequest
typealias Res = HttpServletResponse
typealias Auth = Authorization

