export const dynamic = "force-dynamic"
import Footer from "@/components/footer/footer"
import Banner from "@/components/home/banner/banner"
import Categories from "@/components/home/categories/categories"
import Flash_sell from "@/components/home/flash_sell/flash_sell"
import JustForYou_products from "@/components/home/justForYou_products/justForYou_products"
const Home = () => {
  return (
    <main>
      <section className="">
        <Banner />
      </section>
      <section>
        <Flash_sell />
      </section>
      <section>
        <Categories />
      </section>
      <section>
        <JustForYou_products />
      </section>
      <section className="">
        <Footer />
      </section>
    </main>
  )
}

export default Home
