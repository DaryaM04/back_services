import React from 'react';

const languages = ['Израиль', 'Canada', 'EU']

const LanguageSelect = ({...selectProps}) => {
    return (
        <select
            id="location"
            name="location"
            className=" mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-active focus:border-primary-active sm:text-sm rounded-md"
            defaultValue="Израиль"
            {...selectProps}
        >
            {
                languages.map((value, idx) => (
                    <option key={idx} value={value}>{value}</option>
                ))
            }
        </select>
    );
};

export default LanguageSelect;
