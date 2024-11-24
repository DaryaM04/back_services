import {clsx} from "clsx";

export const Header = ({ children, className, ...props }) => {
    return (
        <h1 className={clsx(className, `my-6 text-2xl text-gray-900 bg-white-900 flex justify-center`)} {...props}>
            {children}
        </h1>
    );
};
