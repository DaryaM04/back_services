export function SignUp({children}) {
    return (
        <form className={'flex flex-col md:min-w-[445px] w-full md:flex-row gap-3'}>
            {children}
        </form>
    )
}
