import { MessagesService } from './../../services/core/messages.service';
import { LANGUAGE_ORDER } from './../../resources/constants/language-order.constant';
import {
  MultiLanguageService,
  GetTranslationsRq,
  UpdateTranslationsRq, //
} from './../../services/api/multi-language/multi-language.service';
import { Component, OnInit, Input } from '@angular/core';
import { Translation } from '../../resources/data/translation.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'gp-multi-language',
  templateUrl: './multi-language.component.html',
})
export class MultiLanguageComponent implements OnInit {
  @Input() table: string;
  @Input() pKey: string;
  @Input() schema: string;
  @Input() field: string;
  @Input() description: string;
  @Input() isEditing: boolean;
  @Input() orderByLangCod = true;
  showTranslations: boolean;
  showHTMLEditor: boolean;
  currentTextHTML: string;
  currentLanguageHTML: string;
  text: Translation;
  translations: Translation[];
  working = false;

  constructor(
    private multiLanguageService: MultiLanguageService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.showTranslations = false;
    this.showHTMLEditor = false;
  }

  initTranslations() {
    if (this.pKey) {
      this.getTranslations();
    } else {
      this.messagesService.showErrorAlert(
        'Debe guardar primero el registro para ' + 'poder insertar o visualizar las traducciones.'
      );
    }
  }

  getTranslations() {
    const request = new GetTranslationsRq(this.pKey, this.schema, this.table, this.field);
    this.multiLanguageService
      .getTranslations(request)
      .first()
      .subscribe(
        (data: any) => {
          if (data.ok) {
            let translations = data.translations;
            if (!this.orderByLangCod) {
              translations = this.sortTranslations(data.translations, LANGUAGE_ORDER);
            }
            this.translations = translations;
          } else if (data.error != null) {
            console.error(data.error.internalErrorMessage);
          }
        },
        (err) => console.error(err),
        () => {
          this.showTranslations = true;
        }
      );
  }

  sortTranslations(translations: Translation[], ordenIds: string[]): Translation[] {
    const sorted: Translation[] = [];
    for (const codIdioma of ordenIds) {
      for (const translation of translations) {
        if (translation.langCode === codIdioma) {
          sorted.push(translation);
          break;
        }
      }
    }
    return sorted;
  }

  save() {
    this.working = true;
    for (const item of this.translations) {
      const request = new UpdateTranslationsRq(
        this.pKey,
        this.schema,
        this.table,
        this.field,
        item.langCode,
        item.langCountryTranslation
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
            if (data.ok) {
              // TODO:
            } else if (data.error != null) {
              console.error(data.error.internalErrorMessage);
            }
          },
          (err) => console.error(err)
        );
    }
    this.hideTranslations();
  }

  hasHTMLContent(traduccion: string): boolean {
    return (
      traduccion != null &&
      (traduccion.indexOf('</') !== -1 ||
        traduccion.indexOf('/>') !== -1 ||
        traduccion.indexOf('&lt;') !== -1 ||
        traduccion.indexOf('&gt;') !== -1)
    );
  }

  hideTranslations() {
    this.showTranslations = false;
  }

  showEditorHTMLDialog(traduccion: Translation) {
    this.text = new Translation(
      traduccion.langCode,
      traduccion.langCountry,
      traduccion.langCountryTranslation != null ? traduccion.langCountryTranslation : ''
    );
    if (this.isEditing) {
      this.showTranslations = false;
      this.showHTMLEditor = true;
      this.currentTextHTML = this.text.langCountryTranslation;
      this.currentLanguageHTML = this.text.langCountry;
    }
  }

  saveHTML() {
    for (const item in this.translations) {
      if (this.translations[item].langCountry === this.currentLanguageHTML) {
        this.translations[item].langCountryTranslation = this.currentTextHTML;
        this.closeHTMLEditor();
      }
    }
  }

  closeHTMLEditor() {
    this.showHTMLEditor = false;
    this.showTranslations = true;
    this.text = null;
  }
}
