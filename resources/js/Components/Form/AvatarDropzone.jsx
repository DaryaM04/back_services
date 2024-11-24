import React, {useRef} from 'react';
import {PhotoIcon} from "@heroicons/react/20/solid/index.js";
import {useTranslation} from "react-i18next";

const AvatarDropzone = ({image, handleFile}) => {
    const {t} = useTranslation(["common"])
    const types = ['png', 'jpg', 'jpeg', 'gif']
    const inputRef = useRef(null)
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            if(types.includes(e.dataTransfer.files[0].name.split('.')[1]))
            {
                handleFile(e.dataTransfer.files[0])
            }
        }
    }
    const handleChange = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target.files && e.target.files[0]) {
            if(types.includes(e.target.files[0].name.split('.')[1]))
            {
                handleFile(e.target.files[0])
            }
        }
    }

    return (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
             onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
            <div className="text-center">
                {
                    image ? (
                        <div className={'mx-auto rounded-lg'}>
                            <img className={'max-w-80 max-h-64'} alt={'avatar'} src={image}/>
                        </div>
                    ) : (
                        <div className={'mx-auto h-12 w-12 rounded-lg text-gray-300'}>
                            <PhotoIcon className="" aria-hidden="true"/>
                        </div>
                    )
                }
                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-active focus-within:ring-offset-2 hover:text-primary-active"
                        onClick={() => inputRef.current.click()}
                    >
                        {t("image_props.upload_file")}
                        <input className="sr-only" accept="image/png, image/jpg, image/gif" type="file" name="avatar" id="avatar"
                               onChange={handleChange}
                               ref={inputRef}
                        />
                    </label>
                    <p className="pl-1">{t("image_props.orDND")}</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">{t("image_props.domain")}</p>
            </div>
        </div>
    )
};

export default AvatarDropzone;
