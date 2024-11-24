import React from 'react';
import {useTranslation} from "react-i18next";

const PhoneNumberInput = ({...inputProps}) => {
    return (
        <div className={'w-full'}>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                        Country
                    </label>
                    <select id="country" name="country"
                            className="focus:ring-primary-active focus:border-primary-active h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                    >
                        <option>US</option>
                        <option>CA</option>
                        <option>EU</option>
                    </select>
                </div>
                <input type="text" name="phone-number" id="phone-number"
                       className="focus:ring-primary-active focus:border-primary-active block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
                       placeholder="+1 (555) 987-6543"
                       {...inputProps}
                />
            </div>
        </div>
    );
};

export default PhoneNumberInput;
