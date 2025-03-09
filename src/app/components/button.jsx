
export default function Button(props){
    return(
            <div className="flex gap-1 text-lg font-semibold hover:bg-[#4b4b4b] hover:cursor-pointer rounded-xl p-2">
                <div className="translate-y-0.5">
                    {props.icon}
                </div>
                {props.title}
            </div>
    )
}