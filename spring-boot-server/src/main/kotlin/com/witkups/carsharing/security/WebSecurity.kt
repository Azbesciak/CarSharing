package com.witkups.carsharing.security

import com.witkups.carsharing.security.SecurityConstants.SIGN_UP_URL
import org.springframework.context.annotation.Bean
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@EnableWebSecurity
class WebSecurity(
  private val userDetailsService: UserDetailsService,
  private val bCryptPasswordEncoder: BCryptPasswordEncoder
) : WebSecurityConfigurerAdapter() {

  @Throws(Exception::class)
  override fun configure(http: HttpSecurity) {
    http.cors().and().csrf().disable().authorizeRequests()
      .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
      .antMatchers("/actuator/**").permitAll()
      .anyRequest().authenticated()
      .and()
      .addFilter(JWTAuthorizationFilter(authenticationManager()))
      .addFilter(JWTAuthenticationFilter(authenticationManager()))
      // this disables session creation on Spring Security
      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
  }

  @Throws(Exception::class)
  public override fun configure(auth: AuthenticationManagerBuilder?) {
    auth!!.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder)
  }

  @Bean
  internal fun corsConfigurationSource(): CorsConfigurationSource {
    val source = UrlBasedCorsConfigurationSource()
    source.registerCorsConfiguration("/**", CorsConfiguration().applyPermitDefaultValues())
    return source
  }

  @Throws(Exception::class)
  override fun configure(web: WebSecurity?) {
    web!!
      .ignoring()
      .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**")
  }
}
