package com.mercury.api.service;

import java.util.List;

import org.keycloak.adapters.springsecurity.account.SimpleKeycloakAccount;
import org.keycloak.representations.AccessToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class BaseService {
    protected String getUserId(){
        try{
            SimpleKeycloakAccount auth = (SimpleKeycloakAccount) SecurityContextHolder.getContext().getAuthentication()
                .getDetails();
            AccessToken token = auth.getKeycloakSecurityContext().getToken();
            return token.getSubject();
        }catch(Exception e){
            return "";
        }  
    }
}
