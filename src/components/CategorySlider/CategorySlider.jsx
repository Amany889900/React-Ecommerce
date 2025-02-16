import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { displayValue } from './../../../node_modules/react-query/es/devtools/utils';

export default function CategorySlider() {

    const {data} = useQuery("categories",getAllCategory)

    async function getAllCategory(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed: 1000
  };
  return (
    <div className="py-6">
        <Slider {...settings}>
       {data?.data.data.map(function(item,idx){return <div key={idx}>
        <img src={item.image} alt="" className="w-full h-[200px]" />
        <h1 className="text-green-600 text-center font-bold">{item.name}</h1>
       </div>})}
    </Slider>
    </div>
  );
}

