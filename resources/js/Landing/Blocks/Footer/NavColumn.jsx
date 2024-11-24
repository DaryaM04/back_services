export function NavColumn({title, children}) {
    return (
        <figure className={'md:w-[220px]'}>
            <figcaption className={'uppercase font-semibold text-gray-400'}>
                {title}
            </figcaption>
            <ul className={'mt-4 flex flex-col gap-4'}>
                {children}
            </ul>
        </figure>
    )
}
