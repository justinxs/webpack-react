
import bnBD0 from 'antd/es/locale/bn_BD';
import lang_bnBD0 from "@/locales/bn-BD";
import enUS0 from 'antd/es/locale/en_US';
import lang_enUS0 from "@/locales/en-US";
import faIR0 from 'antd/es/locale/fa_IR';
import lang_faIR0 from "@/locales/fa-IR";
import idID0 from 'antd/es/locale/id_ID';
import lang_idID0 from "@/locales/id-ID";
import jaJP0 from 'antd/es/locale/ja_JP';
import lang_jaJP0 from "@/locales/ja-JP";
import ptBR0 from 'antd/es/locale/pt_BR';
import lang_ptBR0 from "@/locales/pt-BR";
import zhCN0 from 'antd/es/locale/zh_CN';
import lang_zhCN0 from "@/locales/zh-CN";
import zhTW0 from 'antd/es/locale/zh_TW';
import lang_zhTW0 from "@/locales/zh-TW";

export const localeInfo: {[key: string]: any} = {
    'bn-BD': {
        messages: {
            ...lang_bnBD0,
        },
        locale: 'bn-BD',
        antd: {
            ...bnBD0,
        },
        momentLocale: 'bn-bd',
    },
    'en-US': {
        messages: {
            ...lang_enUS0,
        },
        locale: 'en-US',
        antd: {
            ...enUS0,
        },
        momentLocale: '',
    },
    'fa-IR': {
        messages: {
            ...lang_faIR0,
        },
        locale: 'fa-IR',
        antd: {
            ...faIR0,
        },
        momentLocale: 'fa',
    },
    'id-ID': {
        messages: {
            ...lang_idID0,
        },
        locale: 'id-ID',
        antd: {
            ...idID0,
        },
        momentLocale: 'id',
    },
    'ja-JP': {
        messages: {
            ...lang_jaJP0,
        },
        locale: 'ja-JP',
        antd: {
            ...jaJP0,
        },
        momentLocale: 'ja',
    },
    'pt-BR': {
        messages: {
            ...lang_ptBR0,
        },
        locale: 'pt-BR',
        antd: {
            ...ptBR0,
        },
        momentLocale: 'pt-br',
    },
    'zh-CN': {
        messages: {
            ...lang_zhCN0,
        },
        locale: 'zh-CN',
        antd: {
            ...zhCN0,
        },
        momentLocale: 'zh-cn',
    },
    'zh-TW': {
        messages: {
            ...lang_zhTW0,
        },
        locale: 'zh-TW',
        antd: {
            ...zhTW0,
        },
        momentLocale: 'zh-tw',
    },
};

import EventEmitter from 'events';
export const event = new EventEmitter();
event.setMaxListeners(5);
export const LANG_CHANGE_EVENT = Symbol('LANG_CHANGE');
import { createIntl, IntlShape } from 'react-intl';
let g_intl: IntlShape;


/**
 * 获取当前选择的语言
 * @returns string
 */
export const getLocale = () => {
    const lang = typeof localStorage !== 'undefined'  ? window.localStorage.getItem('locale') : '';
    // support baseNavigator, default true
    let browserLang;
    const isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
    browserLang = isNavigatorLanguageValid ? navigator.language.split('-').join('-') : '';
    return lang || browserLang || "zh-CN";
};

/**
 * 获取当前的 intl 对象，可以在 node 中使用
 * @param locale 需要切换的语言类型
 * @param changeIntl 是否不使用 g_intl
 * @returns IntlShape
 */
export const getIntl = (locale?: string, changeIntl?: boolean) => {
    // 如果全局的 g_intl 存在，且不是 setIntl 调用
    if (g_intl && !changeIntl && !locale) {
        return g_intl;
    }
    // 如果存在于 localeInfo 中
    if (locale && localeInfo[locale]) {
        return createIntl(localeInfo[locale]);
    }
    // 不存在需要一个报错提醒
    if (!locale||!!localeInfo[locale]) {
        console.warn(`The current popular language does not exist, please check the locales folder!`)
    }
    // 使用 zh-CN
    if (localeInfo["zh-CN"]) return createIntl(localeInfo["zh-CN"]);
  
    // 如果还没有，返回一个空的
    return createIntl({
        locale: "zh-CN",
        messages: {},
    });
};

/**
 * 切换全局的 intl 的设置
 * @param locale 语言的key
 */
export const setIntl = (locale: string) => {
    g_intl = getIntl(locale, true);
};


/**
 * 切换语言
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @returns string
 */
export const setLocale = (lang: string, realReload: boolean = true) => {
    const updater = () => {
        if (getLocale() !== lang) {
            if (typeof window.localStorage !== 'undefined') {
                window.localStorage.setItem('locale', lang || '');
            }
            setIntl(lang);
            if (realReload) {
                window.location.reload();
            } else {
                event.emit(LANG_CHANGE_EVENT, lang);
                // chrome 不支持这个事件。所以人肉触发一下
                if (window.dispatchEvent) {
                    const event = new Event('languagechange');
                    window.dispatchEvent(event);
                }
            }
        }
    }
  
    updater();
};


/**
 * 获取当前选择的方向
 * @returns string
 */
export const getDirection = () => {
    const lang = getLocale();
    // array with all prefixs for rtl langueges ex: ar-EG , he-IL
    const rtlLangs = ['he', 'ar', 'fa', 'ku']
    const direction =  rtlLangs.filter(lng => lang.startsWith(lng)).length ? 'rtl' : 'ltr';
    return direction;
};

/**
 * 获取语言列表
 * @returns string[]
 */
export const getAllLocales = () => Object.keys(localeInfo);
