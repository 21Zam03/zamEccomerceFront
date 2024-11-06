import Switcher from '../components/switchTheme/Switcher';
import NavBarComponent from '../components/navbar/NavBarComponent';
import SliderComponent from '../components/slider/SliderComponent';
import Footer from '../components/footer/FooterComponent';
import ProductListCategories from '../components/products/ProductsListCategories';

export default function Home() {
  return (
    <div className="h-screen">
      <header>
        <NavBarComponent/>
      </header>
      <main className="">
        <SliderComponent/>
        <ProductListCategories/>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Footer/>
      </footer>
    </div>
  );
}
