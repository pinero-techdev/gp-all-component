### Forgot Password

### Upgrading 1.1.0 => 1.1.2

Routing:

-   `modifica-password/:usuario` => `forgot-password/:username` <br>

Provider

-   `PasswordService` -> `ForgotPasswordService` <br>

Component

-   `modifica` -> `onEnterEvent`
-   `usuario` -> `username`
-   `passwordOld` -> `passwordOld`
-   `passwordNew` -> `password`
-   `passwordNew2` -> `passwordRep`
