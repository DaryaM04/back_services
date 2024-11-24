import Page, {ActionButton, Button, CancelButton} from "@/Components/AdminPages/Page.jsx";
import Header from "@/Components/AdminPages/Header.jsx";
import {useTranslation} from "react-i18next";
import {FormTable} from "@/Components/Form/FormTable.jsx";
import {CaptionCell} from "@/Components/Form/CaptionCell.jsx";
import {OptionItemInputField, OptionItemName} from "@/Components/AdminPages/OptionsList.jsx";
import {ValueCell} from "@/Components/Form/ValueCell.jsx";
import InputError from "@/Components/InputError.jsx";
import {ActionsContainer} from "@/Components/Form/ActionsContainer.jsx";
import {router} from "@inertiajs/react";
import React from "react";
import Comment from "@/Admin/Passport/Approve/Components/Comment.jsx";

const mockPassport = {
    name: "Mock company",
    company_info: "1245599982383",
    founder_id: "1425 5618",
    founder_name: "Oleg Gold",
}

export default function ApproveCompanyPassport({passport}) {
    passport ??= mockPassport
    const {t} = useTranslation(['admin', 'common']);
    console.log(passport)

    return (
        <Page>
            <Header title={t('passport.company.approve_title')}
                    className='flex justify-center'
            />
            <FormTable>
                <CaptionCell>
                    <OptionItemName>
                        {t('passport.company.name') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        value={passport.name}
                        disabled={true}
                    />
                    <InputError className="mt-2"/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>
                        {t('passport.company.info') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        value={passport.company_info}
                        disabled={true}
                    />
                    <InputError className="mt-2"/>
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>
                        {t('passport.company.founder_name') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        value={passport.founder_name}
                        disabled
                        placeholder={t('passport.company.founder_name')}
                    />
                </ValueCell>

                <CaptionCell>
                    <OptionItemName>
                        {t('passport.company.founder_id') + ' *'}
                    </OptionItemName>
                </CaptionCell>
                <ValueCell>
                    <OptionItemInputField
                        value={passport.founder_id}
                        disabled
                        placeholder={t('passport.company.founder_id')}
                    />
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
                    label={t('passport.actions.notApprove')} onClick={() => {}} className={'bg-error text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-dark hover:bg-error-dark'}/>
                <ActionButton label={t('passport.actions.approve')} onClick={() => {}}/>
            </ActionsContainer>
        </Page>
    )
}
