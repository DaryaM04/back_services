import {Page} from "@/User/Components/Page.jsx";
import {useTranslation} from "react-i18next";
import {router, useForm} from "@inertiajs/react";
import React, {useState} from "react";
import {Header} from "@/User/Components/Header.jsx";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName, OptionItemNameWithError} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";
import AvatarDropzone from "@/Components/Form/AvatarDropzone.jsx";
import VideoDropzone from "@/Components/Form/VideoDropzone.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import {ActionButton, CancelButton} from "@/Components/AdminPages/Page.jsx";

export default function UserPassport({passport}) {
    const {t} = useTranslation(['user', 'common']);

    const {data, setData, errors, post} = useForm({
        image: passport?.image,
        video: passport?.video
    });
    console.log(data)

    const [imageUrl, setImageUrl] = useState(data.image)
    const [videoUrl, setVideoUrl] = useState(data.video)

    const handleImage = (file) => {
        setData('image', file)
        const reader = new FileReader();
        reader.onload = function (ev) {
            setImageUrl(ev.target.result);
        };
        reader.readAsDataURL(file);
    }
    const handleVideo = (file) => {
        setData('video', file)
        const reader = new FileReader();
        reader.onload = function (ev) {
            setVideoUrl(ev.target.result)
        };
        reader.readAsDataURL(file);
    }

    const handleSave = () => {
        post(route('user.passport'))
    }

    return (
        <Page>
            <Header>
                {t('passport.title')}
            </Header>
            <FormTable>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.image}>
                        {t('passport.user.upload_image') + ' *'}
                    </OptionItemNameWithError>
                    <div className={'mt-1 md:mt-4 text-gray-700 text-sm italic'}>
                        {t('passport.user.image_info')}
                    </div>
                </CaptionCell>
                <ValueCell>
                    <AvatarDropzone image={imageUrl} handleFile={handleImage}/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.video}>
                        {t('passport.user.upload_video') + ' *'}
                    </OptionItemNameWithError>
                    <div className={'mt-1 md:mt-4 text-gray-700 text-sm italic'}>
                        {t('passport.user.video_info')}
                    </div>
                </CaptionCell>
                <ValueCell>
                    <VideoDropzone video={videoUrl} handleFile={handleVideo}/>
                </ValueCell>
            </FormTable>
            <ActionsContainer>
                <CancelButton label={t('common:action.cancel')} onClick={() => router.get(route("user.profile"))}/>
                <ActionButton label={t('common:action.send')} onClick={handleSave}/>
            </ActionsContainer>
        </Page>
    )
}
