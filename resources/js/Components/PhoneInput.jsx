import PhoneInput2 from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

export default function PhoneInput({phone, setPhone, ...props}) {
    return (
        <PhoneInput2
            {...props}
            country={'il'}
            buttonClass={'!border-0 hover:!bg-white focus-within:!bg-white !ps-[5px] !my-[1px] !ms-[1px]'}
            inputClass={'!h-[36px] focus:!bg-white active:!bg-white !w-full !py-2 shadow-sm flex-1 shadow-sm focus:!ring-primary focus:!border-primary block mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 border-gray-300 rounded-md'}
            disableDropdown={true}
            value={phone}
            containerStyle={{
                direction: "ltr"
            }}
            onChange={setPhone}
        />
    )
}
