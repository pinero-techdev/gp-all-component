import {InjectionToken} from '@angular/core';

// import translations
import {LANG_DE_NAME, LANG_DE_TRANS} from '../locales/de';
import {LANG_EN_NAME, LANG_EN_TRANS} from '../locales/en';
import {LANG_ES_NAME, LANG_ES_TRANS} from '../locales/es';
import {LANG_FR_NAME, LANG_FR_TRANS} from '../locales/fr';
import {LANG_IT_NAME, LANG_IT_TRANS} from '../locales/it';
import {LANG_PT_NAME, LANG_PT_TRANS} from '../locales/pt';

// translation token
export const TRANSLATIONS = new InjectionToken<string>("translation");

// all translations
var d:any = {};
d[LANG_DE_NAME] = LANG_DE_TRANS;
d[LANG_EN_NAME] = LANG_EN_TRANS;
d[LANG_ES_NAME] = LANG_ES_TRANS;
d[LANG_FR_NAME] = LANG_FR_TRANS;
d[LANG_IT_NAME] = LANG_IT_TRANS;
d[LANG_PT_NAME] = LANG_PT_TRANS;

export const dictionary = d;

// providers
export const TRANSLATION_PROVIDERS:any[] = [
    {provide: TRANSLATIONS, useValue: dictionary},
];