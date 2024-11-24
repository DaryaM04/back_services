import Header from "@/Components/AdminPages/Header.jsx";
import Page, {ActionButton, Button, CancelButton} from "@/Components/AdminPages/Page.jsx";
import {router} from "@inertiajs/react";
import React from "react";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import {useTranslation} from "react-i18next";
import mockImage from '@/Landing/assets/companyPolicy.png'
import InputError from "@/Components/InputError.jsx";
import Comment from "@/Admin/Passport/Approve/Components/Comment.jsx";

const mockPassport = {
    user_id: "25",
    passport_image: mockImage,
    passport_video: null
}

export default function ApprovePersonPassport({passport}) {
    passport ??= mockPassport
    console.log(passport)
    const {t} = useTranslation(['admin', 'common'])
    return (
        <Page>
            <Header title={t('passport.user.approve_title')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemName>
                        {t('passport.user.user_id') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        disabled
                        value={passport.user_id}
                        placeholder={t('passport.user.user_id')}
                    />
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>
                        {t('passport.user.uploadImage') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <div
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center">
                        <div className={'mx-auto rounded-lg'}>
                            {
                                passport.passport_image ? (
                                    <img className={'max-w-80 max-h-64'} alt={'avatar'} src={passport.passport_image}/>
                                ) : (
                                    t('passport.user.image_not_provided')
                                )
                            }
                        </div>
                    </div>
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>
                        {t('passport.user.uploadVideo') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <div
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 text-center">
                        <div className={'mx-auto rounded-lg'}>
                            <div className={'mx-auto rounded-lg'}>
                                {
                                    passport.passport_video ? (
                                        <video className={'max-w-80 max-h-64'} src={passport.passport_video}/>
                                    ) : (
                                        t('passport.user.video_not_provided')
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </ValueCell>

                {/*<CaptionCell>*/}
                {/*    <OptionItemName>*/}
                {/*        {t('passport.approve.comment')}*/}
                {/*    </OptionItemName>*/}
                {/*</CaptionCell>*/}
                {/*<ValueCell>*/}
                {/*    <Comment placeholder={t('passport.approve.youCanLeaveComment')}/>*/}
                {/*</ValueCell>*/}
            </FormTable>

            <ActionsContainer>
                <CancelButton label={t('common:action.cancel')} onClick={() => router.get(route("admin.passport.index"))}/>
                <Button
                    label={t('passport.actions.notApprove')} onClick={() => {}}
                    className={'bg-error text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-dark hover:bg-error-dark'}/>
                <ActionButton label={t('passport.actions.approve')} onClick={() => {}}/>
            </ActionsContainer>
        </Page>
    )
}
