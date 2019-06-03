# Styling components

The chosen strategy is the encapsulation of styles by component, indicating in its declaration the stylesheet to be applied.

```
@Component({
  selector: 'gp-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
```

This stylesheet should only import mixins, variables and stylesheets of generic components contained on it, for example buttons.scss (if it contains a button), dialogs.scss, etc.

After that, it is only necessary to generate style rules for all the elements of our component.

```
@import 'global/variables';
@import 'global/mixins';
@import 'global/buttons';

.login-body {
  background-image: url('./../../resources/images/bg-launcher.jpg');
  ...
  ...
```