import {VideoCameraIcon} from "@heroicons/react/20/solid/index.js";
import React, {useRef} from "react";
import {useTranslation} from "react-i18next";

export default function VideoDropzone({video, handleFile}) {
    const {t} = useTranslation("common")
    const inputRef = useRef(null)
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }
    const handleChange = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    }

    return (
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
             onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        >
            <div className="text-center">
                {
                    video ? (
                        <div className={'mx-auto rounded-lg'}>
                            <video className={'max-w-80 max-h-64'} src={video}/>
                        </div>
                    ) : (
                        <div className={'mx-auto h-12 w-12 rounded-lg text-gray-300'}>
                            <VideoCameraIcon aria-hidden='true'/>
                        </div>
                    )
                }
                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-active focus-within:ring-offset-2 hover:text-primary-active"
                        onClick={() => inputRef.current.click()}
                    >
                        {t("common:video_props.upload_file")}
                        {/*  video/quicktime is .mov or .qt  */}
                        {/*  video/x-msvideo is for .avi  */}
                        <input className="sr-only" accept="video/mp4, video/webm, video/x-msvideo, video/quicktime" type="file" name="avatar" id="avatar"
                               onChange={handleChange}
                               ref={inputRef}
                        />
                    </label>
                    <p className="pl-1">{t("common:video_props.orDND")}</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">{t("common:video_props.domain")}</p>
            </div>
        </div>
    )
}
