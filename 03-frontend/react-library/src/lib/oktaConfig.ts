export const OktaConfig ={
    clientId:"0oad9o1lagtW9rOy55d7",
    issuer:"https://dev-83947238.okta.com/oauth2/default",
    redirectUri :"https://localhost:3000/login/callback",
    scopes:['openid','profile','email'],
    pkce: true,
    disableHttpsCheck: true
}