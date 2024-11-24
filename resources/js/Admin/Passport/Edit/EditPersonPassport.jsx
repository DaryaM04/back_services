import {useTranslation} from "react-i18next";
import {router, useForm} from "@inertiajs/react";
import Header from "@/Components/AdminPages/Header.jsx";
import React, {useState} from "react";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import Page, {ActionButton, CancelButton, RedButton} from "@/Components/AdminPages/Page.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName, OptionItemNameWithError} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import AvatarDropzone from "@/Components/Form/AvatarDropzone.jsx";
import VideoDropzone from "@/Components/Form/VideoDropzone.jsx";

const mock = {
    id: 2,
    name: "Albert Mock 2",
    status: "active",
    profileType: "user",
    user_id: "10",
    passport_image: null,
    passport_video: null
}

export default function EditPersonPassport({user}) {
    const {t} = useTranslation(['admin', 'common']);

    const {data, setData, errors} = useForm({
        name: user?.profile?.name ?? "",
        user_id: user?.id ?? "",
        // status: user?.profile?.is_verified ?? 0,
        image: user?.profile?.passport_data?.image ?? null,
        video: user?.profile?.passport_data?.video ?? null
    });
    console.log(data)

    const [imageUrl, setImageUrl] = useState(data?.passport_image)
    const [videoUrl, setVideoUrl] = useState(data?.passport_image)

    const handleImage = (file) => {
        const reader = new FileReader();
        reader.onload = function (ev) {
            setImageUrl(ev.target.result);
        };
        reader.readAsDataURL(file);
    }
    const handleVideo = (file) => {
        const reader = new FileReader();
        reader.onload = function (ev) {
            setVideoUrl(ev.target.result)
        };
        reader.readAsDataURL(file);
    }

    return (
        <Page>
            <Header title={!user
                ? t('passport.user.create')
                : t('passport.user.edit')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.user_id}>
                        {t('passport.user.user_id')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                  <OptionItemName>{data.user_id}</OptionItemName>
                </ValueCell>

                <CaptionCell>
                    <OptionItemNameWithError error={errors.name}>
                        {t('passport.user.name')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                <OptionItemName>{data.name}</OptionItemName>
                </ValueCell>

                {data.image &&<>
                <CaptionCell>
                    <OptionItemNameWithError error={errors.image}>
                        {t('passport.user.uploadImage')}
                    </OptionItemNameWithError>
                </CaptionCell>
                <ValueCell>
                        <div className={'mx-auto rounded-lg flex justify-center items-center'}>
                            <img className={'max-w-80 max-h-64'} alt={'avatar'} src={data.image}/>
                        </div>
                </ValueCell>
                </>}
                {data.video &&<>
                <CaptionCell>
                    <OptionItemName error={errors.video}>
                        {t('passport.user.uploadVideo') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                        <div className={'mx-auto rounded-lg'}>
                            <video className={'max-w-80 max-h-64'} src={data.video}/>
                        </div>
                </ValueCell>
                </>}

            </FormTable>
            <ActionsContainer>
            <CancelButton label={t('admin:actions.cancel')} onClick={() => router.get(route("admin.passport.index"))}/>
                <RedButton label={t('admin:actions.notApprove')} onClick={() => {setData('status', 'verify')}}/>
                <ActionButton label={t('admin:actions.confirm')} onClick={() => {}}/>
            </ActionsContainer>
        </Page>
    )
}
