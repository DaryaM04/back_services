import React, {useEffect, useState} from "react";
import {CheckIcon, PencilIcon} from "@heroicons/react/24/outline/index.js";
import {OptionItemInputField} from "@/Components/AdminPages/OptionsList.jsx";

export const EditableItem = ({children, submit, initialText}) => {
    const [inEdit, setInEdit] = useState(false)
    const [text, setText] = useState(initialText)
    useEffect(() => {
        setText(initialText)
    }, [initialText]);

    const exit = () => setInEdit(false)
    const show = () => setInEdit(true)

    const textInvalid = text === ''
    const submitAndExit = () => {
        if(textInvalid) return
        setInEdit(false)
        submit(text)
    }

    if (inEdit)
        return (
            <div className={'flex items-center gap-2'}>
                <button onClick={submitAndExit} disabled={textInvalid}
                        className={'group w-6 h-6 text-primary rounded-full'}>
                    <CheckIcon className={'group-disabled:text-slate-400'}/>
                </button>
                <OptionItemInputField
                    className={textInvalid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    value={text}
                    // onBlur={submitAndExit}
                    onChange={value => setText(value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            submitAndExit()
                        }
                        if (e.key === "Escape") {
                            e.preventDefault()
                            exit()
                        }
                    }}
                />
            </div>
        )
    else
        return (
            <div className={'flex items-center gap-2'}>
                <button onClick={show}
                        className={'h-5 w-5 text-primary rounded-full'}>
                    <PencilIcon/>
                </button>
                <div tabIndex={0} onClick={show} onFocus={show} onBlur={exit}>
                    {children}
                </div>
            </div>
        )
}
