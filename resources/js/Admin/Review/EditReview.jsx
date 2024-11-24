import Page from "@/Components/AdminPages/Page.jsx";
import React from "react";
import Header from "@/Components/AdminPages/Header.jsx";


export default function EditReview({review}) {
    return (
        <Page>
            <Header title={'Empty edit review page'}/>
            {
                JSON.stringify(review)
            }
        </Page>
    )
}
