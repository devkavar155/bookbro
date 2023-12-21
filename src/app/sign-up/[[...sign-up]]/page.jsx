import { SignUp } from "@clerk/nextjs";
import Sidebar from "../../components/sideBar";

export default function Page() {
    return (
        <div className="">
            <Sidebar></Sidebar>
            <div className="h-screen w-full bg-black p-2">

                <div className="h-full w-full flex items-center justify-center rounded-xl  bg-[#101418]">
                    <SignUp />;
                </div>
            </div>
        </div>
    )
}