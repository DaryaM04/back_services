import {clsx} from "clsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";
import portfolio from "./portfolio.jpeg";
import {Header} from "@/User/Components/Header.jsx";
import {Link, router} from "@inertiajs/react";
import {useTranslation} from "react-i18next";
import {PlusButton} from "@/User/Components/PlusButton.jsx";
import {useContext} from "react";
import {CommonContext} from "@/reducer.jsx";
import {Page} from "@/User/Components/Page.jsx";

const title = "Наименование услуги Наименование услуги Наименование услуги"
const subtitle = "Краткое описание работы. Краткое описание работы. Краткое описание работы..."

/*const items = [
  {title, subtitle, image: portfolio3},
  {title, subtitle, image: portfolio2},
  {title, subtitle, image: portfolio3},
  {title, subtitle, image: portfolio3},
  {title, subtitle, image: portfolio2},
  {title, subtitle, image: portfolio2},
]*/

const Alert = ({children, className}) => {
  return (
    <div className={clsx('flex px-4 py-2 md:py-3 gap-2 rounded-md', className)}>
      {children}
    </div>
  )
}
const AlertHeader = ({children, className}) => {
  return (
    <span className={clsx('font-semibold text-sm', className)}>
      {children}
    </span>
  )
}
const AlertText = ({children, className}) => {
  return (
    <span className={clsx('text-sm leading-tight', className)}>
        {children}
    </span>
  )
}
const Advice = () => {
  const {t} = useTranslation('user')
  return (
    <Alert className={'bg-blue-50'}>
      <div>
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11V14C9 14.5523 9.44772 15 10 15H11C11.5523 15 12 14.5523 12 14C12 13.4477 11.5523 13 11 13V10C11 9.44772 10.5523 9 10 9H9Z"
                fill="#60A5FA"/>
        </svg>
      </div>
      <div>
        <AlertHeader className={'text-blue-800'}>
          {t('portfolio.advice.header')}
        </AlertHeader>
      </div>
    </Alert>
  )
}

const Caution = () => {
  const {t} = useTranslation('user')
  return (
    <Alert className={'bg-yellow-50'}>
      <div>
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
                d="M8.25608 3.09882C9.02069 1.73952 10.9778 1.73952 11.7424 3.09882L17.3227 13.0194C18.0726 14.3526 17.1092 15.9999 15.5795 15.9999H4.41893C2.88927 15.9999 1.92585 14.3526 2.67578 13.0194L8.25608 3.09882ZM10.9991 13C10.9991 13.5523 10.5514 14 9.99915 14C9.44686 14 8.99915 13.5523 8.99915 13C8.99915 12.4477 9.44686 12 9.99915 12C10.5514 12 10.9991 12.4477 10.9991 13ZM9.99915 5C9.44686 5 8.99915 5.44772 8.99915 6V9C8.99915 9.55228 9.44686 10 9.99915 10C10.5514 10 10.9991 9.55228 10.9991 9V6C10.9991 5.44772 10.5514 5 9.99915 5Z"
                fill="#FBBF24"/>
        </svg>
      </div>
      <div className={'flex flex-col'}>
        <AlertHeader className={'text-yellow-800'}>
          {t('portfolio.caution.header')}
        </AlertHeader>
        <AlertText className={'text-yellow-700'}>
          {t('portfolio.caution.text')}
        </AlertText>
      </div>
    </Alert>
  )
}

export default function Index({portfolios, is_exceeded}) {
  const {t} = useTranslation('user')
  const {dispatch} = useContext(CommonContext);

  const onItemDelete = (item) => {
    dispatch({
      type: 'SHOW_MODAL', payload: {
        action: () => {
           router.delete(route("user.portfolio.destroy", item.id), {
             onSuccess: () => {

             }
           })
        },
        text: `${t('common:alert.AreYouSure')} '${item.title}'?`,
        type: 'delete'
      }
    });
  }

  const items = portfolios.map((item) => {
    return{
      id: item.id,
      title: item.service_name,
      subtitle: item.description,
      image: item.photo
    }
  })

  return (
    <Page>
      <Header>
        {t('portfolio.Portfolio')}
      </Header>
      {console.log(is_exceeded)}
      <div className={'mt-3'}>
        <div className={'flex gap-2 justify-between'}>
          <div className={'flex flex-col gap-3 w-full max-w-[583px]'}>
            {is_exceeded ?  <Caution/> :  <Advice/>}
          </div>
          <PlusButton className={'shrink-0'} href={is_exceeded ? '' : route('user.portfolio.create')}/>
        </div>
        <div className={'mt-[14px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[27px] md:gap-7'}>
          {
            items.map((item, i) => {
              const edit_link = route('user.portfolio.edit', item.id)
              return (
                <div className={'border-[0.5px] border-[#A6AAB3]/41 focus:border-primary rounded-md shadow-lg'} key={i}>
                  <article className={'p-3 pb-2'}>
                    <Link href={edit_link}>
                      <img className={'shadow-lg rounded-md w-full h-[200px] object-cover'} src={item.image}
                           alt={item.title}/>
                    </Link>
                    <Link href={edit_link}>
                      <h1 className={'mt-3 leading-6 text-primary hover:text-primary-dark'}>
                        {item.title}
                      </h1>
                    </Link>
                    <h2 className={'mt-2 text-ellipsis text-gray-500 leading-5 text-sm break-all'}>
                      {item.subtitle}
                    </h2>
                    <div className={'mt-1 flex justify-end gap-3'}>
                      <Link href={edit_link}>
                        <PencilIcon className={'w-5 h-5 stroke-2 text-primary hover:text-primary-dark'}/>
                      </Link>
                      <button onClick={() => onItemDelete(item)}>
                        <TrashIcon className={'w-5 h-5 stroke-2 text-error hover:text-error-dark'}/>
                      </button>
                    </div>
                  </article>
                </div>
              )
            })
          }
        </div>
      </div>
    </Page>
  )
}
