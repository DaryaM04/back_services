import {AcademicCapIcon, UsersIcon} from "@heroicons/react/24/outline";
import interfaceImage from '@/Landing/assets/photo_interface_ru.png';
import companyPolicyImage from '@/Landing/assets/companyPolicy.png';
import {Image, LeftImageWrapper, RightImageWrapper} from "@/Landing/Blocks/AlternativeFeature/Image.jsx";
import {Block} from "@/Landing/Blocks/AlternativeFeature/Block.jsx";
import {Text} from "@/Landing/Blocks/AlternativeFeature/Text.jsx";


function FirstBlock() {
    return (
        <Block className={'lg:h-[35rem]'}>
            <Text className={'lg:col-start-1 lg:rtl:col-start-2'}>
                <div className="mt-6">
                    <div
                        className="flex justify-center items-center w-[58px] h-[58px] rounded-lg bg-primary-dark mb-3">
                        <UsersIcon className='w-6 h-6 text-white'/>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        Учебный центр - быстро, просто, эффективно.
                    </h2>
                    <div className="mt-4 text-lg text-gray-500">
                        <p className="mt-4">
                            Позволяет создавать Учебные программы, Курсы и Уроки.
                        </p>
                        <p className="mt-4">
                            Гибкая настройка прав доступа к учебным материалам.
                        </p>
                        <p className="mt-4">
                            Для проверки усвоения матерала предусмотрены тесты, а также произвольные ответы
                            Ученика с дальнейшей проверкой Тренером.
                        </p>
                        <p className="mt-4">
                            Статистика прохождения обучения сотрудниками компании.
                        </p>
                    </div>
                    <div className="mt-6">
                        <a
                            href="#"
                            className="inline-flex bg-primary bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
                        >
                            Подробнее
                        </a>
                    </div>
                </div>
            </Text>
            <RightImageWrapper>
                <Image className={'lg:left-0 lg:scale-125 lg:translate-x-28'}
                       src={interfaceImage}
                       alt="Inbox user interface"
                />
            </RightImageWrapper>
        </Block>
    )
}

function SecondBlock() {
    return (
        <Block>
            <Text className={'lg:col-start-2 lg:rtl:col-start-1'}>
                <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        <div
                            className="flex justify-center items-center w-[58px] h-[58px] rounded-lg bg-primary-dark mb-3">
                            <AcademicCapIcon className='w-6 h-6 text-white'/>
                        </div>
                        Оргполитика - ваш сборник правил и инструкций
                    </h2>
                    <p className="mt-4 text-lg tracking-tight leading-8 text-gray-500">
                        Серьезной проблемой в компаниях со штатом более 10 человек является информирование всех
                        сотрудников о новых заказах. Сбои в работе и простои являются следствием несогласованной
                        работы регламентов или их отсутствия. Оперативно доносить важную информацию, правила,
                        технологии, приказы и распоряжения до сотрудников.
                    </p>
                    <div className="max-w-[200px] mt-6">
                        <a href="/company-policy"
                           className="inline-flex bg-primary bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2"
                        >
                            Подробнее
                        </a>
                    </div>
                </div>
            </Text>
            <LeftImageWrapper>
                <Image className="lg:right-0"
                       src={companyPolicyImage}
                       alt="Customer profile user interface"
                />
            </LeftImageWrapper>
        </Block>
    )
}

export default function AlternativeFeature() {
    return (
        <section className="relative pt-16 pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100"/>

            <FirstBlock/>

            <div className="mt-24">
               <SecondBlock/>
            </div>

            <div className="mt-24">
               <FirstBlock/>
            </div>

            <div className="mt-24">
                <SecondBlock/>
            </div>
        </section>
    )
}


