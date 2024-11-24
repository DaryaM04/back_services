import Header from "@/Public/Header.jsx";
import CommonLayout from "@/CommonLayout.jsx";

export default function Layout(children) {
    return (
      <CommonLayout {...children.props} >
        <Header />
        <div className="lg:h-[calc(100vh-95px)]  h-[calc(100vh-88px)] flex flex-col bg-gray-50">
          <div className="sm:mx-auto sm:w-full sm:max-w-md m-auto py-11">
            <div className='flex justify-center'>
              <div className='w-10 h-10 p-1 flex items-center border border-[#172B6E] mb-3'>
                <img src="/img/logo-mobile.svg" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </CommonLayout>
    );
}
