# Forgot Password

### View to add a password reset functionality.

## Breaking changes: renaming

Routing:

- `modifica-password/:usuario` => `forgot-password/:username`

Provider

- `PasswordService` -> `ForgotPasswordService`

Component

- `modifica` -> `onEnterEvent`
- `usuario` -> `username`
- `passwordOld` -> `passwordOld`
- `passwordNew` -> `password`
- `passwordNew2` -> `passwordRep`
