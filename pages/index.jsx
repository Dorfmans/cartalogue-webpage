import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import Card from '../components/card';
import HomeService from '../services/HomeService';
import UserService from '../services/UserService';
import logo from '../public/images/cartalogue.svg';
import logo2 from '../public/images/cartalogue2.png';
import { useRouter } from 'next/router'


const homeService = new HomeService();
const userService = new UserService();

const Home = () => {

  const router = useRouter();

  const [catalogue, setCatalogue] = useState([]);
  const [logged, setLogged] = useState('Login')

  const getCatalogue = async () => {
    const { data } = await homeService.publicCatalogue();
    const loadedCatalogue = data.map((vehicle) =>
    ({
      id: vehicle._id,
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      price: vehicle.price,
      image: vehicle.image
    }));

    setCatalogue(loadedCatalogue);
  }

  const handleClick = () => {
    if (logged === 'Login') {
      return router.push('/login')
    }
    router.push('/admin')
  }

  useEffect(() => {
    if (userService.loggedIn()) {
      setLogged(localStorage.getItem('user'))
    }
    getCatalogue();
  }, []);

  return (
    <section>
      <div className='headerContainer'>
        <div className='headerContent'>
          <div>
            <Image src={logo} height={50} />
            <Image src={logo2} height={50} />
          </div>
          <strong onClick={handleClick}>{logged}</strong>
        </div>
      </div>

      <Carousel
        autoPlay={true}
        swipeable={false}
        showThumbs={false}
        showStatus={false}
        useKeyboardArrows={true}
      >
        {catalogue &&
          catalogue.map(info => (
            <Card
              key={info.id}
              {...info}
            />
          ))}
      </Carousel>

    </section >
  )
}


export default Home;
