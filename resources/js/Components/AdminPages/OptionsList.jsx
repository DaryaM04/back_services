import React, { useEffect, useState, useRef } from 'react';
import { Switch } from '@headlessui/react';
import Access from '../Access';
// import Editor from "../../Components/Editor/Editor";
const Editor = React.lazy(() => import("../Editor/Editor"));

import {useTranslation} from "react-i18next";
import { WhiteTooltip } from '../Tooltip';
import BlackTooltip from '../Tooltip'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const OptionsList = ({ children }) => {
  return (
    <ul>
      {children}
    </ul>
  );
};

export const OptionItem = ({children, className}) => {
  return (
    <li className={classNames(className,
          "px-4 py-3 rounded-md ",
    )}>
      {children}
    </li>
  );
}

export const OptionItemName = ({ children, className }) => {
  return (
      <span className={classNames(className, "block font-medium text-gray-700")}>{children}</span>
  );
};

export const OptionItemNameWithError = ({children, error}) => {
    return (
        <OptionItemName className={error ? 'text-red-500' : ''}>
            {children}
        </OptionItemName>
    )
}

export const OptionItemErrorText = ({ errorText }) => {
  return (
    <>{errorText && <div className="text-sm font-medium text-red-500 text-red-600 col-end-3">{errorText}</div>}</>
  );
};

export const OptionItemCustomField = ({ children, className }) => {
  return (
    <div className={classNames(className, "text-sm font-medium text-gray-500")}>
      {children}
    </div>
  );
};

export const OptionItemInputField = ({ value, onChange, className, ...props }) => {
  return (
    <input
          className={classNames(className, "shadow-sm focus:ring-primary focus:border-primary block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md placeholder:text-gray-600 disabled:bg-[#F3F4F6] disabled:text-gray-700" )}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
          {...props}
    />
  );
};

export const OptionItemInputTimeField = ({ value, onChange, className }) => {
  const [min, setMin] = useState(value ?? 0);
  const { t } = useTranslation(['common'])
  // const [hour, setHour] = useState(value?.hour ?? 0);
  return (
    <>
      {/*<label className="flex">*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    className={`focus:border-indigo-500 w-12 text-base block w-100 focus:ring-indigo-500 shadow-sm w-full text-gray-900 border-gray-300 rounded-md ${className ? className : ""}`}*/}
      {/*    value={hour}*/}
      {/*    placeholder="00"*/}
      {/*    maxLength={2}*/}
      {/*    onChange={(e) => {*/}
      {/*      setHour(e.target.value);*/}
      {/*      onChange(e.target.value, min);*/}
      {/*    }}*/}
      {/*    />*/}

      {/*  <span className="ml-1.5 mr-1.5 mt-3 text-sm font-medium text-gray-500">часов</span>*/}
      {/*</label>*/}
      <label className="flex">
        <input type="text"
          className={`focus:border-indigo-500 w-12 text-base block w-100 focus:ring-indigo-500 shadow-sm text-gray-900 border-gray-300 rounded-md ${className ? className : ""}`}
          value={min}
          placeholder="00"
          maxLength={2}
          onChange={(e) => {
            setMin(e.target.value);
            onChange(e.target.value);
          }} />
        <span className="ml-1.5 mr-1.5 mt-3 text-sm font-medium text-gray-500">{t('common:minutes')}</span>
      </label>
    </>
  );
};


export const OptionItemInputNumberField = ({value, onChange, className, min, disabled}) => {
  return (
    <input
      type="number"
      value={value}
      disabled={disabled}
      min={min}
      onChange={(e) => onChange(e.target.value)}
      className={classNames(className, "shadow-sm focus:ring-primary focus:border-primary block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md placeholder:text-gray-600 disabled:bg-[#F3F4F6] disabled:text-gray-700")}
    />
  );
};

export const OptionItemInputEmailField = ({ value, onChange, className, placeholder }) => {
  return (
    <input
      type="email"
      value={value}
      placeholder={'you@example.com'}
      onChange={(e) => onChange(e.target.value)}
          className={classNames(className, "flex-1 shadow-sm focus:ring-primary focus:border-primary block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md")}
    />
  );
};

export const OptionItemInputPhoneField = ({ value, onChange, className }) => {
  return (
    <input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
          className={classNames(className, "flex-1 shadow-sm focus:ring-[#15B097] focus:border-[#15B097] block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md")}
    />
  );
};

export const OptionItemInputPasswordField = ({ value, onChange, className, placeholder }) => {
  return (
    <input
      type="password"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
          className={classNames(className, "flex-1 shadow-sm focus:ring-primary focus:border-primary block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md")}
    />
  );
};

export const OptionItemInputPasswordRepeatField = ({ value, onChange, className }) => {
  return (
    <input
      type="password"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  );
};

export const OptionItemSwitchField = ({value, onChange, className, disabled = false, tooltip = ''}) => {
  return (
    <span className={classNames(className, `mt-2 text-sm text-gray-900 sm:mt-0 sm:col-span-2`)}>
      <BlackTooltip tooltip={tooltip} className={'[&>span]:!min-w-[170px]'}>
        <Switch
          checked={Boolean(value)}
          disabled={disabled}
          onChange={(e) => onChange(e)}
          className={`
          ${Boolean(value) ? 'bg-primary' : 'bg-gray-200'} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
          ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}
          `}
        >
          <span className="sr-only">Course state</span>
            <span
              className={`
              ${Boolean(value) ? 'translate-x-5 rtl:-translate-x-5' : 'translate-x-0'}
                'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200
                `}
            >
              <span
                className={`
                ${Boolean(value) ? 'opacity-0 ease-out duration-100' : 'opacity-100 ease-in duration-200'}
                absolute inset-0 h-full w-full flex items-center justify-center transition-opacity
                `}
                aria-hidden="true"
              >
                <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                  <path
                    d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span
                className={`${Boolean(value) ? 'opacity-100 ease-in duration-200' :'opacity-0 ease-out duration-100'} absolute inset-0 h-full w-full flex items-center justify-center transition-opacity`}
                aria-hidden="true"
              >
                <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 12 12">
                  <path
                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"/>
                </svg>
              </span>
            </span>
        </Switch>
      </BlackTooltip>
    </span>

  );
};


export const OptionItemTextAreaField = ({ value, onChange, className, maxLength }) => {
  return (
    <textarea
      className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md " + className}
      defaultValue={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
    />
  );
};

export const OptionItemEditorField = ({ value, getEditorInstance }) => {
  return (
    <div className={`shadow-sm border-[1px] py-5 bg-white rounded-md sm:pl-12 focus:ring-indigo-500 focus:border-indigo-500 block w-full mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300"`}>
      <Editor
        blocks={value}
        getEditorInstance={getEditorInstance}
      />
    </div>
  );
};

export const OptionItemAccessField = ({ permissions, permissionHistory, visibleTypes, setPermission, className }) => {
  return (
    <span className={classNames(className, "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2")}>
      <Access
        permissions={permissions}
        setPermission={setPermission}
        visibleTypes={visibleTypes}
        permissionHistory={permissionHistory}
      />
    </span>
  );
};

export const OptionItemFilesField = ({ onChange, className, accept, filesCount }) => {
  const filesRef = useRef();
  const { t } = useTranslation(['common']);
  return (
    <>
      <div className='py-2'>
        <label htmlFor="files"
          className='p-2 rounded-lg text-sm bg-indigo-600 text-white border-transparent hover:bg-indigo-700 cursor-pointer '>
          {t('common:uploadFiles')}
          <input
            ref={filesRef}
            className='hidden'
            multiple
            type="file"
            name="files"
            id="files"
            onChange={(e) => onChange(e.target.files)}
          />
        </label>
        <label id="files-count" className='w-full ml-2 text-sm'>
          {t('common:newFilesCount') + filesCount}
        </label>
      </div>
    </>
  );
};

export const OptionItemCheckboxField = ({ label, checked, onChange }) => {
  return (
    <label className='flex items-start'>
          <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className='text-blue-700 focus:ring-blue-700 border-gray-300 rounded mt-0.5'
      />
          <div className="ms-2 block text-sm text-gray-600"><span className='font-light'>{label}</span>
          </div>
    </label>
  );
};


export const OptionItemNameTooltip = ({ children, tooltip, className }) => {
  return (
    <WhiteTooltip tooltip={tooltip} withIcon={true}>
      <span className={classNames(className, "font-medium text-gray-700")}>
        {children}
      </span>
    </WhiteTooltip>
  )
}

export const OptionSelectPhone = ({ className, countries, onChangeCountries, value, onChange }) => {
    return (
        <div className={classNames(className, 'w-full relative bg-white border border-gray-300 rounded-md')}>
            <select
                id="country_code"
                name="country_code"
                autoComplete="country_code"
                onChange={(e) => onChangeCountries(e.target.value)}
                className="absolute z-[5] border-none h-[36px] rounded-md focus:ring-0 focus:border-none"
            >
                {countries.map((country, id) =>
                    <option key={id} value={country.code}>{country.flag}</option>
                )}
            </select>
            <input type="tel" value={value} onChange={(e) => onChange(e.target.value)} placeholder="+1 (555) 987-6543"
                className='relative w-full border-none rounded-md text-sm ps-20 py-2 outline-none focus:ring-blue-700 focus:border-blue-700 focus:border-2 placeholder:text-gray-600  focus:ring-2 focus:ring-offset-2' />
        </div>
    )
};

export const OptionPhoneInput = ({className, flag, value, onChange}) => {
    return (
        <div className={classNames(className, 'flex w-full bg-white border border-gray-300 rounded-md')}>
            <div className="flex justify-center items-center border-none w-1/5 h-[36px] rounded-md focus:ring-0 focus:border-none">
                {flag}
            </div>
            <input type="tel" value={value} onChange={(e) => onChange(e.target.value)} placeholder="+1 (555) 987-6543"
                   className='w-4/5 border-none rounded-md text-sm py-2 outline-none focus:ring-blue-700 focus:border-blue-700 focus:border-2 placeholder:text-gray-600 focus:ring-2' />
        </div>
    )
}

export const OptionItemFiles = ({ handleFile }) => {
    const {t} = useTranslation('common')
    const [dragActive, setDragActive] = useState(false);
    const [userImage, setUserImage] = useState(undefined);
    const [errorFileType, setError] = useState(false);

    const inputRef = useRef(null);

    const getImage = (e) => {
        const reader = new FileReader();
        reader.onload = function (ev) {
            setUserImage(ev.target.result);
        };
        reader.readAsDataURL(e);
    };


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
            getImage(e.dataTransfer.files[0]);
        }
    }

    const handleChange = (e) => {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
          const fileExten = e.target.files[0].name.split('.').pop().toLowerCase();
          const allowed = ['jpg', 'jpeg', 'png', 'gif'];
          if(allowed.indexOf(fileExten) != -1){
            handleFile(e.target.files[0]);
            getImage(e.target.files[0]);
            setError(false);
          }
          else{
            setError(true);
          }
      }
    }

    return (
      <>
        <div className={`border-dashed border-2 border-gray-300 px-[26px] pt-[22px] pb-[26px] ${dragActive ? 'border-blue-700' : ''}`}>
            {<div className='flex flex-col items-center justify-center' onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <input ref={inputRef} id="input-file-upload" type="file" accept='image/png, image/jpg, image/jpeg, image/gif' onChange={handleChange} multiple={true} className="hidden" />
                {userImage ? <img src={userImage} className="mb-5"/> : <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 8H12C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12V32M8 32V36C8 37.0609 8.42143 38.0783 9.17157 38.8284C9.92172 39.5786 10.9391 40 12 40H36C37.0609 40 38.0783 39.5786 38.8284 38.8284C39.5786 38.0783 40 37.0609 40 36V28M8 32L17.172 22.828C17.9221 22.0781 18.9393 21.6569 20 21.6569C21.0607 21.6569 22.0779 22.0781 22.828 22.828L28 28M40 20V28M40 28L36.828 24.828C36.0779 24.0781 35.0607 23.6569 34 23.6569C32.9393 23.6569 31.9221 24.0781 31.172 24.828L28 28M28 28L32 32M36 8H44M40 4V12M28 16H28.02" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                <p className='mb-1 text-sm font-normal text-[#4B5563]'>
                    <span onClick={() => inputRef.current.click()} className='text-blue-700 hover:text-blue-800 cursor-pointer'>{t('image_props.upload_file')}</span> {t('image_props.orDND')}
                </p>
                <p className='text-sm font-normal text-[#4B5563]'>{t('image_props.domain')}</p>
            </div>}
        </div>
        {errorFileType &&
              <div className='mt-2 rounded'>
                <p className='bg-red-100 px-2 text-red-600 text-sm'>
                  {t('common:fileTypeError')}
                </p>
              </div>
        }
      </>
    )
}

export const OptionItemRadioField = ({label, children, onChange, ...props}) => {
    return (
        <label className='flex items-center'>
            <input type="radio" onChange={onChange} {...props} className='text-blue-700 focus:ring-blue-800 border-gray-300 '/>
            <div className="ms-2 block text-sm text-gray-600">
                <span className='font-light'>
                    {label} {/* saving backward compability */}
                    {children}
                </span>
            </div>
        </label>
    )
}

export const OptionItemTitle = ({ className, children }) => {
    return (
        <span className={classNames(className, "block text-base font-normal leading-6 text-gray-900 mb-1")}>{children}</span>
    );
}
