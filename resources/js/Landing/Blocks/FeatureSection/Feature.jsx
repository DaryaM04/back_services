export default function Feature({feature}) {
    //
    return (
        <div className={'bg-gray-50 rounded-lg md:bg-transparent -pt-6'}>
            <article className={'-mt-6 md:mt-0 px-6 md:pt-6 pb-8 flex flex-col items-center w-feature-card'}>
                <IconWrapper>
                    {feature.icon}
                </IconWrapper>
                <h1 className={'mt-8 text-lg font-medium text-center'}>
                    {feature.title}
                </h1>
                <h2 className={'mt-5 text-center'}>
                    {feature.subtitle}
                </h2>
            </article>
        </div>
    )
}

function IconWrapper({children}) {
    return (
        <div className={'bg-[#1D4ED8] p-3 rounded-md aspect-square shadow-xl'}>
            {children}
        </div>
    )
}
