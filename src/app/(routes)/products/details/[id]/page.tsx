import Nav from "@/components/nav/nav"
import Image from "next/image"
import Details_card from "../details_card/details_card"
const Details = async ({ params }: { params: Promise<{ id: string }> }) => {
    const reqId = await params
    return (
        <main>
            <div className="">
                <div className=" bg-yellow-400 text-white">
                    <Nav />
                </div>
                <div className="">
                    <Details_card />
                </div>
            </div>
        </main>
    )
}

export default Details
