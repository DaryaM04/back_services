import {NavElement} from "@/Landing/Blocks/Footer/NavElement.jsx";
import {NavColumn} from "@/Landing/Blocks/Footer/NavColumn.jsx";

const support = [
    "Pricing", "Documentation", "Guides",
    "API Status",
]
const company = [
    "About", "Blog",
    "Jobs", "Press", "Partners",
]
const legal = [
    "Claim", "Privacy", "Terms",
]

export default function Footer() {
    return (
        <footer className={'max-w-container mx-auto pt-16 pb-8 px-3 md:px-8 divide-y'}>
            <div className={'flex flex-wrap justify-between gap-4 pb-8'}>
                <nav className={'flex flex-wrap gap-8'}>
                    <NavColumn title={'Support'}>
                        {
                            support.map((s, i) => (
                                <NavElement key={i}>
                                    {s}
                                </NavElement>
                            ))
                        }
                    </NavColumn>

                    <NavColumn title={'Company'}>
                        {
                            company.map((s, i) => (
                                <NavElement key={i}>
                                    {s}
                                </NavElement>
                            ))
                        }
                    </NavColumn>

                    <NavColumn title={'Legal'}>
                        {
                            legal.map((s, i) => (
                                <NavElement key={i}>
                                    {s}
                                </NavElement>
                            ))
                        }
                    </NavColumn>
                </nav>
                <address className={'not-italic'}>
                    <div className={'uppercase  font-semibold text-gray-400'}>Contact us</div>
                    <div className={'mt-4'}>
                        <a type={'email'}
                           className={'underline border-none p-0 text-gray-500'}
                        >
                            info@guild.itdelta.com
                        </a>
                    </div>
                </address>
            </div>
            <div className={'text-gray-400 pt-8 text-left'}>
                © 2020 Workflow, Inc. All rights reserved.
            </div>
        </footer>
    )
}
