import { useState } from "react";
import { useRouter } from "next/router";
import ImageUpload from "../../components/imageUpload";
import PublicInput from "../../components/publicInput";
import Button from "../../components/buttons";
import AdminService from "../../services/AdminService";
import uploadIcon from "../../public/images/uploadFile.svg";
import car from "../../public/images/car.svg";
import priceTag from "../../public/images/price.svg";
import { validateName, validateBrand, validatePrice } from "../../utils/validations";


const adminService = new AdminService();

const AdminInput = ({ method, vehicleId, vehicleName, vehicleBrand, vehicleModel, vehiclePrice, vehicleImage }) => {

    const router = useRouter();

    const [name, setName] = useState(vehicleName);
    const [brand, setBrand] = useState(vehicleBrand);
    const [model, setModel] = useState(vehicleModel);
    const [price, setPrice] = useState(vehiclePrice);
    const [image, setImage] = useState(vehicleImage);
    const [isSubmiting, setIsSubmiting] = useState(false);


    const signUpIsValid = () => {
        return (
            validateName(name)
            && validateName(model)
            && validateBrand(brand)
            && validatePrice(price)
            && image
        );
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!signUpIsValid()) {
            return;
        }

        setIsSubmiting(true);

        try {
            const body = new FormData();
            const query = localStorage.getItem('email');

            body.append("name", name);
            body.append("brand", brand);
            body.append("model", model);
            body.append("price", parseFloat(price));

            if (image.file) {
                body.append("image", image.file);
            }

            if (method === 'POST') {
                try {
                    await adminService.postVehicle(query, body);
                    alert("Vehicle posted successfully");
                    router.push('/');
                } catch (e) {
                    alert("Something went wrong: " + e.response.data.error);
                }
            }

            if (method === 'PUT') {
                try {
                    await adminService.putVehicle(vehicleId, body);
                    alert("Vehicle updated successfully");
                    router.push('/');
                } catch (e) {
                    alert("Something went wrong: " + e.response.data.error);
                }
            }

        } catch (e) {
            alert("Something went wrong: " + e.response.data.error);
        }

        setIsSubmiting(false);
    }

    return (

        <section className='adminInput'>
            <div className='adminInputContent'>
                <form onSubmit={onSubmit}>

                    <ImageUpload
                        setImage={setImage}
                        imagePreview={image.preview || image || uploadIcon.src}
                        imagePreviewClassName="imagePreview"
                    />

                    <PublicInput
                        image={car}
                        placeholder="Name..."
                        type="text"
                        inValueChange={e => setName(e.target.value)}
                        value={name}
                        validateMessage="Name must have at least 2 characters"
                        showValidateMessage={name && !validateName(name)} />

                    <PublicInput
                        image={car}
                        placeholder="Brand..."
                        type="text"
                        inValueChange={e => setBrand(e.target.value)}
                        value={brand}
                        validateMessage="Brand must have at least 3 characters"
                        showValidateMessage={brand && !validateBrand(brand)} />

                    <PublicInput
                        image={car}
                        placeholder="Model..."
                        type="text"
                        inValueChange={e => setModel(e.target.value)}
                        value={model}
                        validateMessage="Model must have at least 2 characters"
                        showValidateMessage={model && !validateName(model)} />

                    <PublicInput
                        image={priceTag}
                        placeholder='Price...'
                        type="text"
                        inValueChange={e => setPrice(e.target.value)}
                        validateMessage="Price must be a number"
                        showValidateMessage={price && !validatePrice(price)}
                        value={price} />

                    <Button
                        text="Submit"
                        type="submit"
                        disabled={!signUpIsValid() || isSubmiting}
                    />
                </form>
            </div>
        </section>
    )
}

export default AdminInput;

