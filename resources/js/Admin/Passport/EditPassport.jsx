import {router} from "@inertiajs/react";
import EditCompanyPassport from "@/Admin/Passport/Edit/EditCompanyPassport.jsx";
import EditPersonPassport from "@/Admin/Passport/Edit/EditPersonPassport.jsx";

export default function EditPassport({passport}) {
    if(passport?.id) {
        // update passport
        if(passport.isCompany)
            return <EditCompanyPassport passport={passport}/>
        else
            return <EditPersonPassport passport={passport}/>
    } else {
        // create passport is forbidden
        // permitted only by direct reference to EditPersonPassport or EditCompanyPassport
        router.get(route("admin.passport.index"))
    }
    return null
}
