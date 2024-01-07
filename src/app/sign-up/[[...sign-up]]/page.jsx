import { SignUp } from "@clerk/nextjs";
import Sidebar from "../../components/sideBar";

export default function Page() {
    return (
        <div className="flex bg-black">
            <Sidebar/>
            <div className="h-screen w-full bg-black py-2 pr-2">
                <div className="h-full w-full flex items-center justify-center rounded-xl  bg-[#101418]">
                    <SignIn />;
                </div>
            </div>
        </div>
    )
}