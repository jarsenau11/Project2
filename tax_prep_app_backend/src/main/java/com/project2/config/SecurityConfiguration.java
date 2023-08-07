package com.project2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableMethodSecurity
public class SecurityConfiguration {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        .authorizeHttpRequests((authorizeHttpRequests) -> 
            authorizeHttpRequests
                .mvcMatchers("/users/private_info").authenticated()
                .mvcMatchers(HttpMethod.POST, "/users/newUser").permitAll()
                .mvcMatchers(HttpMethod.POST, "/userDetail/newUserDetail").permitAll()

                .mvcMatchers(HttpMethod.GET, "/users/**").authenticated()
                .mvcMatchers(HttpMethod.PUT, "/users/**").authenticated()
                .mvcMatchers(HttpMethod.DELETE, "/users/**").authenticated()
                .mvcMatchers(HttpMethod.GET, "/userDetail/**").authenticated()
                .mvcMatchers(HttpMethod.PUT, "/userDetail/**").authenticated()
                .mvcMatchers(HttpMethod.DELETE, "/userDetail/**").authenticated()

                // change the following depending on naming convention for w2 and 1099 paths when the controllers are set up
                .mvcMatchers(HttpMethod.GET, "/formW2s/**").authenticated()
                .mvcMatchers(HttpMethod.PUT, "/formW2s/**").authenticated()
                .mvcMatchers(HttpMethod.POST, "/formW2s/**").authenticated()
                .mvcMatchers(HttpMethod.DELETE, "/formW2s/**").authenticated()
                .mvcMatchers(HttpMethod.GET, "/form1099s/**").authenticated()
                .mvcMatchers(HttpMethod.PUT, "/form1099s/**").authenticated()
                .mvcMatchers(HttpMethod.POST, "/form1099s/**").authenticated()
                .mvcMatchers(HttpMethod.DELETE, "/form1099s/**").authenticated()
        )
        .httpBasic();
        http.csrf((csrf) ->
            csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).ignoringAntMatchers("/users/newUser", "/userDetail/newUserDetail")
        );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }
}
