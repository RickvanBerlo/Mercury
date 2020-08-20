package com.mercury.api.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.anonymous().and().authorizeRequests().antMatchers("/docs", "/actuator/**", "/v2/api-docs/**",
                "/swagger-ui.html", "/swagger-resources/**", "/webjars/**").permitAll().and().authorizeRequests()
                .anyRequest().fullyAuthenticated();
    }

}