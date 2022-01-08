import 'antd/dist/antd.css';
import '@/styles/global.less';
import React, { useState, useEffect, Suspense } from 'react';
import createRouter from '@/routes';
import { ConfigProvider } from 'antd';
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
import Loading from '@/components/Loading';
import { PageLoading } from '@ant-design/pro-layout';

type stateType = {
    hasError: boolean
}
interface ErrorBoundary {
    state: stateType
}
class ErrorBoundary extends React.Component {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: Error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // 你同样可以将错误日志上报给服务器
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // 你可以自定义降级后的 UI 并渲染
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
}

export default function App() {
    const element = createRouter();
    const direction = getDirection();
    const [locale, setLocale] = useState(() => getLocale());
    const [intl, setContainerIntl] = useState(() => getIntl(locale, true));

    const handleLangChange = (locale:string) => {
        if (moment?.locale) {
            moment.locale(localeInfo[locale]?.momentLocale || 'en');
        }
        setLocale(locale);
        setContainerIntl(getIntl(locale));
    };
    
    useEffect(() => {
        event.on(LANG_CHANGE_EVENT, handleLangChange);
        return () => {
            event.off(LANG_CHANGE_EVENT, handleLangChange);
        };
    }, []);

    return (
        <ConfigProvider direction={direction} locale={localeInfo[locale]?.antd || {}}>
            <RawIntlProvider value={intl}>
                <ErrorBoundary>
                    <Suspense fallback={<PageLoading />}>
                        {element}
                    </Suspense>
                </ErrorBoundary>
            </RawIntlProvider>
        </ConfigProvider>
    );
}
