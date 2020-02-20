package com.team4.dayoff.Security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.endpoint.DefaultAuthorizationCodeTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.http.OAuth2ErrorResponseErrorHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.http.converter.OAuth2AccessTokenResponseHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
 
    @Override
    protected void configure(HttpSecurity http) throws Exception {

       http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers("/updateInvoice", "/orderList","/usersAnalysis","/usersAnalysis/user/sexAndAge/{yearMonth}",
        "/usersAnalysis/user/month/{year}","/usersAnalysis/user/withdrawReasons/{year}","/usersAnalysis/login/sexAndAge/{yearMonth}"
        ,"/usersAnalysis/login/month/{year}","/ordersAnalysis","/ordersAnalysis/order/sexAndAge/{yearMonth}","/ordersAnalysis/order/month/{year}"
        ,"/ordersAnalysis/order/refundReasons/{year}","/addProduct","/addProductProcess","/addSeveralProductProcess",
        "/getProduct", "/stopProductSale","/resaleProduct","/getUserList","/pickUpConfirm")
        .hasRole("ADMIN")
        .antMatchers("/updateUserProcess","/addReview","/changeCode","/review","/cancelOrder",
        "/refundRequestProcess","/refundRequest","/getGrade","/orderDetail/{groupId}",
        "/myOrderLIst","/order","/payInfoList{userId}","/kakaoPay","/kakaoPaySuccess",
        "/confirm","/orderCount","/signUp","/signUpProcess","/withdraw","/withdrawProcess")
        .hasRole("REALUSER")
        .anyRequest()
        .permitAll()
        .and()
        .oauth2Login()
        .tokenEndpoint()
        .accessTokenResponseClient(accessTokenResponseClient())
        .and()
        .defaultSuccessUrl("/loginSuccess")
        .failureUrl("/loginFailure")
        .loginPage("/loginPage")
        .and()
        .exceptionHandling()
        .accessDeniedPage("/deny")
        .and()
        .logout()
        .logoutUrl("/logoutaa")
        .invalidateHttpSession(true)
        .deleteCookies("JSESSIONID");
        // .logoutSuccessUrl("/login");
    }



@Bean
public OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> 
  accessTokenResponseClient() {
  
    DefaultAuthorizationCodeTokenResponseClient accessTokenResponseClient = new DefaultAuthorizationCodeTokenResponseClient();
    return accessTokenResponseClient;
}

@Bean
public ClientRegistrationRepository clientRegistrationRepository(OAuth2ClientProperties oAuth2ClientProperties,@Value("") String kakaoClientId, @Value("") String kakaoClientSecret){
  List<ClientRegistration> registrations=new ArrayList<ClientRegistration>();
  registrations.add(CustomOAuth2Provider.KAKAO.getBuilder("kakao")
  .clientId(kakaoClientId)
  .clientSecret(kakaoClientSecret)
  .jwkSetUri("temp")
  .build());
 registrations.add(CustomOAuth2Provider.GOOGLE.getBuilder("google")
  .clientId("")
  .clientSecret("")
  .scope("email","profile","https://www.googleapis.com/auth/user.phonenumbers.read","https://www.googleapis.com/auth/user.birthday.read")
  .build());
  registrations.add(CommonOAuth2Provider.FACEBOOK.getBuilder("facebook")
  .clientId("")
  .clientSecret("")
  .redirectUriTemplate("https://jaehoon-dayoff.ml:8443/login/oauth2/code/facebook")
  .userInfoUri("https://graph.facebook.com/me?fields=id,name,email,link")
  .scope("email","public_profile")
  .build());
  //user_birthday,user_gender



  return new InMemoryClientRegistrationRepository(registrations);
}


}