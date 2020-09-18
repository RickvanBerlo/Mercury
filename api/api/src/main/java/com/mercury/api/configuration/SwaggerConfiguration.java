package com.mercury.api.configuration;

import java.time.LocalTime;

import com.google.common.base.Predicates;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Value("${swagger.description}")
    private String description;

    @Value("${swagger.title}")
    private String title;

    @Value("${name}")
    private String name;

    @Value("${email}")
    private String email;

    @Value("${website}")
    private String website;

    ApiInfo apiInfo() {
        return new ApiInfoBuilder().title(title).description(description).license("Apache 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html").version("1.0.0")
                .contact(new Contact(name, website, email)).build();
    }

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2).directModelSubstitute(LocalTime.class, String.class).select()
                .apis(RequestHandlerSelectors.basePackage("com.mercury.api"))
                .paths(Predicates.not(PathSelectors.regex("/docs.*"))).build().apiInfo(apiInfo());
    }

}