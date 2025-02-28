import Nav from "@/components/nav/nav"
import Details_card from "../details_card/details_card"
const Details = () => {
    return (
        <main>
            <div className="">
                <div className=" bg-yellow-400 text-white sticky top-0 z-50">
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
