# Login  

<p>User login view, used to get access to the app. Logon requires that the user have credentials to enter in the app.</p>
<p>Accepts query params as `usuario`, `password`, `urlToRedirect`.</p> 
<p>Example: `/login?usuario=test@gp.com&password=1234` or `/login?usuario=test@gp.com&password=1234&urlToRedirect=concierge`. </p>
<p>The redirect's urls should exist in your app. GP-all-component doesn´t manage those urls.</p>

## Upgrading 1.1.0 => 1.1.2 ###

<p>LoginComponent variables</p>
<ul>
    <li>`usuario` => `username`</li>
    </li> `passwordErrors` => it has been removed</li>
</ul>