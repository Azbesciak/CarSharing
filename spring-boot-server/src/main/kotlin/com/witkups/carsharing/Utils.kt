package com.witkups.carsharing

import java.util.*


inline infix fun <T> Optional<T>.or(supplier: ()-> Optional<T>) = if (isPresent) this else supplier()

operator fun <T> T.invoke(op: T.() -> Unit): T {
  op()
  return this
}

inline infix fun <S, T> S.mapTo(f: S.(s: S) -> T): T = f(this)
