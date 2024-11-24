export function SubmitForWhiteBg() {
    return (
        <button type="submit"
                className="whitespace-nowrap inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm leading-6 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark ring-offset-white">
            Notify me
        </button>
    )
}

export function SubmitForBlackBg() {
    return (
        <button type="submit"
                className="whitespace-nowrap inline-flex justify-center items-center px-6 py-3 border border-transparent text-sm leading-6 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark ring-offset-black">
            Notify me
        </button>
    )
}
