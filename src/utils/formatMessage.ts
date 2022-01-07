type paramsType = {
    id: string,
    defaultMessage?: string
}

import data from '@/locales/zh-CN';

export default function formatMessage(params: paramsType): string {
    // @ts-ignore
    return data[params.id] || params.defaultMessage;
}