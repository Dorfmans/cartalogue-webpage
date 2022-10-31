import { useState, useEffect } from 'react';
import Image from 'next/image';
import Card from '../../components/card';
import Button from "../../components/buttons";
import AdminService from '../../services/AdminService';
import home from '../../public/images/home.svg';
import logout from '../../public/images/logout.svg';
import close from "../../public/images/close.svg"
import { useRouter } from 'next/router';
import AdminInput from '../../components/adminInput';


const adminService = new AdminService();

const Admin = () => {

    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const router = useRouter();

    const [catalogue, setCatalogue] = useState([]);
    const [showAdminInput, setShowAdminInput] = useState(false);
    const [method, setMethod] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [vehicleBrand, setVehicleBrand] = useState('');
    const [vehicleModel, setVehicleModel] = useState('');
    const [vehiclePrice, setVehiclePrice] = useState('');
    const [vehicleImage, setVehicleImage] = useState('');

    const goToHome = () => {
        router.push('/');
    }

    const logOut = () => {
        localStorage.clear();
        router.replace('/');
    }

    const postVehicle = () => {
        setMethod('POST');
        setVehicleName('');
        setVehicleBrand('');
        setVehicleModel('');
        setVehiclePrice('');
        setVehicleImage('');
        setVehicleId('');
        setShowAdminInput(!showAdminInput);
    }

    const putVehicle = (vehicle) => {
        setMethod('PUT');
        setVehicleName(vehicle.name);
        setVehicleBrand(vehicle.brand);
        setVehicleModel(vehicle.model);
        setVehiclePrice(vehicle.price);
        setVehicleImage(vehicle.image);
        setVehicleId(vehicle.id);
        setShowAdminInput(!showAdminInput);
    }

    const deleteVehicle = (vehicleId) => {
        try {
            adminService.deleteVehicle(vehicleId);
            alert('Vehicle deleted successfully');
        } catch (e) {
            alert("Something went wrong: " + e.response.data.error);

        }
        router.push('/');
    }

    const getCatalogue = async () => {
        try {
            const { data } = await adminService.getCatalogue(email);
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
        } catch (e) {

        }
    }

    useEffect(() => {
        if (!token) {
            router.replace('/')
        }
        setCatalogue([]);
        getCatalogue();
    }, [token]);

    return (
        <section>
            <div className='headerContainer'>
                <div className='headerContent'>
                    <a>
                        <Image src={home} onClick={goToHome} height={40} />
                    </a>
                    <strong className='adminUser'>{user}</strong>
                    <a>
                        <Image src={logout} onClick={logOut} height={40}></Image>
                    </a>
                </div>
            </div>

            <div className='adminCatalogue'>
                {catalogue.length > 0
                    ? catalogue.map(info => (
                        <div className="adminCatalogueCard">
                            <Card
                                key={info.id}
                                {...info}
                            />
                            <div className="adminCatalogueCardButtons">

                                <Button
                                    type='button'
                                    handleClick={() => putVehicle(info)}
                                    text={'Edit'}
                                    color='outlined'>
                                </Button>

                                <Button
                                    type='button'
                                    handleClick={() => deleteVehicle(info.id)}
                                    text={'Delete'}
                                    color='outlined'>
                                </Button>
                            </div>
                        </div>

                    ))
                    : <strong className='noVehicleMessage'>No vehicles to show.</strong>
                }
            </div>

            {showAdminInput
                ? (
                    <>
                        <img className="close" src={close.src} onClick={() => setShowAdminInput(!showAdminInput)} />
                        <AdminInput
                            method={method}
                            vehicleId={vehicleId}
                            vehicleName={vehicleName}
                            vehicleBrand={vehicleBrand}
                            vehicleModel={vehicleModel}
                            vehiclePrice={vehiclePrice}
                            vehicleImage={vehicleImage}
                        >
                        </AdminInput>
                    </>
                )
                : null
            }

            <div className="adminFooter">
                <strong onClick={postVehicle}>Register your vehicle</strong>
            </div>
        </section >
    )
}


export default Admin;
