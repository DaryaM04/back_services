import firstBlockImage from "@/Landing/assets/firstBlock.png";

export function Media() {
    // lg:px-5 xl:px-[76px] xl:py-[52px]
    return (
        <div className={'md:w-1/2'}>
            <img className={'mx-auto rounded-lg'} src={firstBlockImage} alt={''}/>
        </div>
    )
}
