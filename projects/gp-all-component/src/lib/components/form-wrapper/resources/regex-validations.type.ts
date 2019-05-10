export class RegexValidations {
  static BLANK_SPACE = /\s/;
  static CONTROL_SPACE = /[\u0000-\u0019]/;
  static SPECIAL_CHARACTERS = /[\u0080-\uFFFF]/;

  static hasBlankSpace = (text: string): boolean => RegexValidations.BLANK_SPACE.test(text);
  static hasControlSpace = (text: string): boolean => RegexValidations.CONTROL_SPACE.test(text);
  static hasSpecialCharacters = (text: string): boolean =>
    RegexValidations.SPECIAL_CHARACTERS.test(text);
}
