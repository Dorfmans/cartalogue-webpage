import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../../components/buttons";
import PublicInput from "../../components/publicInput";
import { validateEmail } from "../../utils/validations"
import UserService from "../../services/UserService";
import message from "../../public/images/message.svg";
import { useRouter } from "next/router";

const userService = new UserService

const Login = () => {

    const router = useRouter()

    const [email, setEmail] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            return;
        }

        setIsSubmiting(true);

        try {

            await userService.login(email);

        } catch (e) {
            alert("Something went wrong: " + e.response.data.error);
        }

        setIsSubmiting(false);
    }

    useEffect(() => {
        if (userService.loggedIn()) {
            router.push('/')
        }
    }, [isSubmiting])

    return (
        <section className={'loginPage'}>

            <div className="loginPageContent">

                <form onSubmit={onSubmit}>

                    <PublicInput
                        image={message}
                        placeholder="Email..."
                        type="email"
                        inValueChange={e => setEmail(e.target.value)}
                        value={email}
                        validateMessage="Invalid Email"
                        showValidateMessage={email && !validateEmail(email)}
                    />

                    <Button
                        text="Login"
                        type="submit"
                        disabled={!validateEmail(email) || isSubmiting}
                    />

                </form>

                <div className="loginPageFooter">
                    <p>Dont you have an account yet?</p>
                    <Link href="/signup">Sign Up</Link>
                </div>

            </div>
        </section>
    );
}


export default Login