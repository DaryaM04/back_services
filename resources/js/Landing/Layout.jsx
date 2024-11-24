import CommonLayout from "@/CommonLayout.jsx";

export default function LandingLayout (children) {
    return (
        <CommonLayout {...children.props} >
            {children}
        </CommonLayout>
    )
}
