import 'antd/dist/antd.css';
import '@/styles/global.less';
import React, { useState, useEffect, Suspense } from 'react';
import createRouter from '@/routes';
import { useLocation, useNavigate } from "react-router-dom";
import { ConfigProvider, message } from 'antd';
import { RawIntlProvider } from 'react-intl';
import { getDirection, localeInfo, getLocale, getIntl, event, LANG_CHANGE_EVENT } from './locale';
import moment from 'moment';
import 'moment/locale/bn-bd';
import 'moment/locale/fa';
import 'moment/locale/id';
import 'moment/locale/ja';
import 'moment/locale/pt-br';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import { PageLoading } from '@ant-design/pro-layout';
import { currentUser } from '@/service/api';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const element = createRouter();
    const direction = getDirection();
    const [locale, setLocale] = useState(() => getLocale());
    const [intl, setContainerIntl] = useState(() => getIntl(locale, true));
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleLangChange = (locale:string) => {
        if (moment?.locale) {
            moment.locale(localeInfo[locale]?.momentLocale || 'en');
        }
        setLocale(locale);
        setContainerIntl(getIntl(locale));
    };
    
    useEffect(() => {
        event.on(LANG_CHANGE_EVENT, handleLangChange);
        if (!isLogin) {
            const loginPage = location.pathname === '/user/login';
            
            currentUser().then(data => {
                if (data.data.userid) {
                    setIsLogin(true);
                    loginPage && navigate('/');
                } else {
                    if (!loginPage) {
                        message.error(data.errorMessage);
                        navigate('/user/login?redirect=' + location.pathname);
                    }
                }
            }).catch(err => {
                message.error(err.message);
                !loginPage && navigate('/user/login?redirect=' + location.pathname)
            }).finally(() => setLoading(false));
        }
        return () => {
            event.off(LANG_CHANGE_EVENT, handleLangChange);
        };
    }, []);

    return (
        !loading 
        ? <ConfigProvider direction={direction} locale={localeInfo[locale]?.antd || {}}>
            <RawIntlProvider value={intl}>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoading />}>
                        {element}
                    </Suspense>
                </ErrorBoundary>
            </RawIntlProvider>
        </ConfigProvider>
        : <PageLoading />
    );
}
