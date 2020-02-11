package com.team4.dayoff.Security;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistration.Builder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;

public enum CustomOAuth2Provider{
    KAKAO{
        @Override
        public ClientRegistration.Builder getBuilder(String registrationId){
            ClientRegistration.Builder builder=getBuilder(registrationId,ClientAuthenticationMethod.POST,DEFAULT_LOGIN_REDIRECT_URL)
            .authorizationUri("https://kauth.kakao.com/oauth/authorize")
            .tokenUri("https://kauth.kakao.com/oauth/token")
            .userInfoUri("https://kapi.kakao.com/v2/user/me")
            .userNameAttributeName("id")
            .clientName("kakao");

            return builder;
        }
        
    },
    GOOGLE {

		@Override
		public ClientRegistration.Builder getBuilder(String registrationId) {
			ClientRegistration.Builder builder = getBuilder(registrationId,
					ClientAuthenticationMethod.POST, DEFAULT_LOGIN_REDIRECT_URL)
			.scope("openid", "profile", "email")
			.authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
			.tokenUri("https://www.googleapis.com/oauth2/v4/token")
			.jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
			.userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
			.userNameAttributeName(IdTokenClaimNames.SUB)
			.clientName("Google");
			return builder;
		}
	},

	

	FACEBOOK {

		@Override
		public Builder getBuilder(String registrationId) {
			ClientRegistration.Builder builder = getBuilder(registrationId,
					ClientAuthenticationMethod.POST, DEFAULT_LOGIN_REDIRECT_URL);
			builder.scope("public_profile", "email");
			builder.authorizationUri("https://www.facebook.com/v2.8/dialog/oauth");
			builder.tokenUri("https://graph.facebook.com/v2.8/oauth/access_token");
			builder.userInfoUri("https://graph.facebook.com/me?fields=id,name,email");
			builder.userNameAttributeName("id");
			builder.clientName("Facebook");
			return builder;
		}
	};
   

    private static final String DEFAULT_LOGIN_REDIRECT_URL="https://jaehoon-dayoff.ml:8443/login/oauth2/code/{registrationId}";

    protected final ClientRegistration.Builder getBuilder(String registrationId, ClientAuthenticationMethod method, String redirectUri){
        ClientRegistration.Builder builder=ClientRegistration.withRegistrationId(registrationId)
        .clientAuthenticationMethod(method)
        .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
        .redirectUriTemplate(redirectUri);
        return builder;
    }

    public abstract ClientRegistration.Builder getBuilder(String registrationId);
}
