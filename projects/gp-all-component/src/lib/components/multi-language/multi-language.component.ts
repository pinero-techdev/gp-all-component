import { LocaleES } from './../../resources/localization/es-ES.lang';
import { MessagesService } from './../../services/core/messages.service';
import { LANGUAGE_ORDER } from './../../resources/constants/language-order.constant';
import {
  MultiLanguageService,
  GetTranslationsRq,
  UpdateTranslationsRq,
} from './../../services/api/multi-language/multi-language.service';
import { Component, OnInit, Input } from '@angular/core';
import { Translation } from '../../resources/data/translation.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'gp-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.scss'],
})
export class MultiLanguageComponent implements OnInit {
  /* Table reference only used for service */
  @Input() table: string;
  /* Key reference  only used for service */
  @Input() pKey: string;
  /* Schema reference only used for service  */
  @Input() schema: string;
  /* Field reference only used for service */
  @Input() field: string;

  /* Part of the title, usuarlly the section where the MultiLanguage is open  */
  @Input() description: string;
  /* Depending if the user is editing some text input and buttons are shown. */
  @Input() isEditing: boolean;
  /* Used for sorting */
  @Input() orderByLangCod = true;

  /* Current target language edited */
  currentLanguageHTML: string;
  /* Current target text edited */
  currentTextHTML: string;
  /* Localizations */
  readonly localeES = LocaleES;
  /* Set to true when is editing */
  showHTMLEditor: boolean;
  /* Set to true when the translations are returned from service */
  showTranslations: boolean;
  /* Current translation edited by the HTML Editor */
  text: Translation;
  /* Component's HTML title */
  title: string;
  /* The translations retrieved by the service */
  translations: Translation[];
  /* Show the spinner when is false */
  working = false;

  constructor(
    private multiLanguageService: MultiLanguageService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.showTranslations = false;
    this.showHTMLEditor = false;
    this.title = LocaleES.TRANSLATIONS_MANAGEMENT(this.description);
  }

  /* Start the translations init; the component needs the pKey for the service. */
  initTranslations() {
    if (this.pKey) {
      this.getTranslations();
    } else {
      this.messagesService.showErrorAlert(LocaleES.YOU_MUST_SAVE_BEFORE_MODIFY_VIEW_TRANSLATIONS);
    }
  }

  /**
   * Getting translations
   */
  getTranslations() {
    const request = new GetTranslationsRq(this.pKey, this.schema, this.table, this.field);
    this.multiLanguageService
      .getTranslations(request)
      .first()
      .subscribe(
        (data: any) => {
          if (data.ok) {
            let translations = data.traducciones;
            if (!this.orderByLangCod) {
              translations = this.sortTranslations(data.traducciones, LANGUAGE_ORDER);
            }
            this.translations = translations;
          } else if (data.error) {
            console.error(data.error.internalErrorMessage);
          }
        },
        (err) => console.error(err),
        () => {
          this.showTranslations = true;
        }
      );
  }

  /**
   * Sort by language code
   * @param translations data from service
   * @param ordenIds language codes
   */
  sortTranslations(translations: Translation[], ordenIds: string[]): Translation[] {
    const sorted: Translation[] = [];
    for (const codIdioma of ordenIds) {
      for (const translation of translations) {
        if (translation.idiomaCodigo === codIdioma) {
          sorted.push(translation);
          break;
        }
      }
    }
    return sorted;
  }

  /* When user clicks on submit button */
  save() {
    this.working = true;
    for (const item of this.translations) {
      const request = new UpdateTranslationsRq(
        this.pKey,
        this.schema,
        this.table,
        this.field,
        item.idiomaCodigo,
        item.idiomaPaisTraduccion
      );
      this.multiLanguageService
        .updateTranslations(request)
        .first()
        .pipe(
          finalize(() => {
            this.working = false;
          })
        )
        .subscribe(
          (data: any) => {
            if (!data.ok && data.error) {
              console.error(data.error.internalErrorMessage);
            }
          },
          (err) => console.error(err)
        );
    }
    this.hideTranslations();
  }

  /* If the translations has HTML Code added in the editor */
  hasHTMLContent(traduccion: string): boolean {
    return (
      traduccion &&
      (traduccion.indexOf('</') !== -1 ||
        traduccion.indexOf('/>') !== -1 ||
        traduccion.indexOf('&lt;') !== -1 ||
        traduccion.indexOf('&gt;') !== -1)
    );
  }

  /* After save or when the user clicks on cancel button */
  hideTranslations() {
    this.showTranslations = false;
  }

  /* There is a button to active another dialog for editing with p-editor  */
  showEditorHTMLDialog(translation: Translation) {
    this.text = new Translation(
      translation.idiomaCodigo,
      translation.idiomaPais,
      translation.idiomaPaisTraduccion !== null ? translation.idiomaPaisTraduccion : ''
    );
    if (this.isEditing) {
      this.showTranslations = false;
      this.showHTMLEditor = true;
      this.currentTextHTML = this.text.idiomaPaisTraduccion;
      this.currentLanguageHTML = this.text.idiomaPais;
    }
  }

  /* After edit the HTML */
  saveHTML() {
    for (const item in this.translations) {
      if (this.translations[item].idiomaPais === this.currentLanguageHTML) {
        this.translations[item].idiomaPaisTraduccion = this.currentTextHTML;
        this.closeHTMLEditor();
      }
    }
  }

  /* Cancel the HTML Editor */
  closeHTMLEditor() {
    this.showHTMLEditor = false;
    this.showTranslations = true;
    this.text = null;
  }
}
