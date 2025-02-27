import Image from "next/image"
import Link from "next/link"

interface Items {
    title: string,
    descriptions: string,
    price: number,
    img: string,
    id: string | any
}
const Card_type_1 = ({ item }: { item: Items }) => {
    return (
        <div className=" hover:scale-105">
            <Link href={`/products/details/${item?.id}`}>

                <div className="  bg-white shadow-lg rounded-md p-2">
                    <div className="">
                        <Image src={item?.img} alt={item?.title} width={500} height={500} />
                    </div>
                    <div className=" mt-2">
                        <h1 className=" text-center text-2xl font-semibold">
                            {
                                item?.title
                            }
                        </h1>
                        <p>
                            {
                                item?.descriptions.substring(0, 100)
                            }
                            ......
                        </p>
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default Card_type_1
