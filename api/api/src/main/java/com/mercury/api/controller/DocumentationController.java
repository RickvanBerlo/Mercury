package com.mercury.api.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DocumentationController {

    @RequestMapping(value = "/docs", method = RequestMethod.GET)
    public void getSwagger(HttpServletResponse response) {
        response.setHeader("Location", "/api/swagger-ui.html");
        response.setStatus(302);
    }
}