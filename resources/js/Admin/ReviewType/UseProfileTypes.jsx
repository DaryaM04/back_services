import {useTranslation} from "react-i18next";

export const useProfileTypes = () => {
    const {t} = useTranslation(['admin', 'common'])
    const types = [
        {
            id: 1,
            label: t('reviewTypes.profile_type.company'),
            value: 'company'
        }, {
            id: 2,
            label: t('reviewTypes.profile_type.user'),
            value: 'user'
        }
    ]
    const mapper = types.reduce((object, type) => {
        object[type.value] = type
        return object
    }, {})
    return {types, mapper}
}
