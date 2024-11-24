import React from "react";
import {Header} from "@/User/Components/Header.jsx";
import {Page} from "@/User/Components/Page.jsx";
import {
    CheckBadgeIcon,
    CheckIcon,
    GlobeEuropeAfricaIcon,
    IdentificationIcon
} from "@heroicons/react/24/outline/index.js";
import {Link} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import {clsx} from "clsx";

const IsVerifiedEnum = {
    NEW: "NEW", VERIFIED: "VERIFIED", DECLINED: "DECLINED"
}
const IsVerifiedMap = [
    "NEW", "VERIFIED", "DECLINED"
]
// is_verified is not boolean!
// it's enum: { new=0, verified=1, declined=2 }
export default function Index({is_verified}) {
    is_verified = IsVerifiedMap[is_verified] // number to enum
    const {t} = useTranslation(['user'])
    //
    return (
        <Page>
            <Header>
                {t('profile.Profile')}
            </Header>
            <div className={'mt-12 md:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-11'}>
                <Card href={'/'}>
                    <CardIcon>
                        <IdentificationIcon width={24} height={24} color={'white'} style={{
                            strokeWidth: 2
                        }}/>
                    </CardIcon>
                    <CardTitle>
                        {t('profile.questionnaire_title')}
                    </CardTitle>
                    <CardSubtitle>
                        {t('profile.questionnaire_subtitle')}
                    </CardSubtitle>
                </Card>

                {/* tag name is 'span', when user is verified */}
                {/* otherwise it is Link with href */}
                <Card as={is_verified !== IsVerifiedEnum.VERIFIED ? Link : 'span'} className={'relative'}
                      href={is_verified !== IsVerifiedEnum.VERIFIED && route('user.passport')}
                >
                    <CardIcon>
                        <CheckBadgeIcon width={24} height={24} color={'white'} style={{
                            strokeWidth: 2
                        }}/>
                    </CardIcon>
                    <CardTitle>
                        {t('profile.passport_title')}
                        {
                            is_verified !== IsVerifiedEnum.NEW ? (
                                <span className={clsx(
                                    `absolute end-0 top-0 mt-2 me-3 px-2 m-auto max-h-6 justify-center inline-flex text-xs leading-5 font-semibold rounded-full`,
                                    is_verified === IsVerifiedEnum.VERIFIED ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}
                                >
                                    {
                                        is_verified === IsVerifiedEnum.VERIFIED ? t('profile.passport_approved') : t('profile.passport_declined')
                                    }
                                </span>
                            ) : null
                        }
                    </CardTitle>
                    <CardSubtitle>
                        {t('profile.passport_subtitle')}
                    </CardSubtitle>
                </Card>

                <Card href={'/'}>
                    <CardIcon>
                        <GlobeEuropeAfricaIcon width={24} height={24} color={'white'} style={{
                            strokeWidth: 2
                        }}/>
                    </CardIcon>
                    <CardTitle>
                        {t('profile.preview_title')}
                    </CardTitle>
                    <CardSubtitle>
                        {t('profile.preview_subtitle')}
                    </CardSubtitle>
                </Card>
            </div>
        </Page>
    )
}


const Card = ({children, as = Link, className, ...props}) => {
    const Component = as;
    return (
        <Component {...props}
                   className={clsx(className, 'rounded-lg hover:bg-gray-50 -pt-6 border border-gray-300 focus:outline-none focus:border-primary h-full')}>
            <article className={'-mt-6 px-6 pb-1 md:pb-3 flex flex-col items-start'}>
                {children}
            </article>
        </Component>
    )
}
const CardTitle = ({children}) => (
    <h1 className={'mt-0.5 md:mt-2 font-semibold text-gray-900'}>
        {children}
    </h1>
)
const CardSubtitle = ({children}) => (
    <h2 className={'text-gray-500'}>
        {children}
    </h2>
)

function CardIcon({children}) {
    return (
        <div className={'bg-primary-superdark p-2.5 md:p-3 rounded-md aspect-square'}>
            {children}
        </div>
    )
}
