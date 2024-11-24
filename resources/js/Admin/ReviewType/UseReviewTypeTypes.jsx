import {useTranslation} from "react-i18next";

export const useReviewTypeTypes = () => {
    const {t} = useTranslation(['admin', 'common'])
    const types = [
        {
            id: 1,
            value: "common",
            label: t('reviewTypes.type.common')
        },
        {
            id: 2,
            value: "service",
            label: t('reviewTypes.type.service')
        },
    ]
    const mapper = types.reduce((object, type) => {
        object[type.value] = type
        return object
    }, {})
    return {types, mapper}
}
