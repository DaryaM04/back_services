import {useState} from "react";

export default function Element({title, description}) {
    const [open, setOpen] = useState(false)
    return (
        <div className={'pt-6'}>
            <div className={'flex justify-between items-center'}>
                <span className={'font-medium text-lg text-black'}>{title}</span>
                <button onClick={() => setOpen(!open)}>
                    <div style={{
                        rotate: open ? "180deg" : "0deg",
                        transition: "rotate 300ms"
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 9L12 16L5 9" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>
                </button>
            </div>
            <div className={'grid overflow-hidden'} style={{
                gridTemplateRows: !open ? "0fr" : "1fr",
                transition: "grid-template-rows 300ms"
            }}>
                <div className={'min-h-0 text-gray-500 text-lg'}>
                    {description}
                </div>
            </div>
        </div>
    )
}
