import Banner from "../components/Banner";
import LatestProducts from "../components/LatestProducts";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestProducts />
      <WhyChooseUs />
      {/* Add one more extra section here */}
    </div>
  );
};

export default Home;
