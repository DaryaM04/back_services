import Element from '@/Landing/Blocks/Questions/Element.jsx'

const question = {
    title: "What’s the best thing about Switzerland?",
    description: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat."
}
const questions = [question, question, question, question, question]

export default function Questions() {
    return (
        <section className={'bg-white'}>
            <div className={'max-w-container px-8 py-16 min-h-[687px] mx-auto'}>
                <div className={'max-w-[768px] mx-auto'}>
                    <div className={'w-full divide-y divide-y-gray-200 flex flex-col gap-6'}>
                        <h1 className={'font-extrabold text-4xl text-gray-900 tracking-tight text-center'}>
                            Frequently asked questions
                        </h1>
                        {
                            questions.map(({title, description}, i) => (
                                <Element key={i} title={title} description={description}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
