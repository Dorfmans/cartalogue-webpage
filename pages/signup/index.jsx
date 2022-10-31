import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import PublicInput from "../../components/publicInput"
import Button from "../../components/buttons"
import { validateEmail, validateName } from "../../utils/validations"
import UserService from "../../services/UserService"
import message from "../../public/images/message.svg"
import user from "../../public/images/user.svg"


const userService = new UserService();

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const router = useRouter()

    const signUpIsValid = () => {
        return (
            validateName(name)
            && validateEmail(email)
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

            body.append("name", name)
            body.append("email", email)


            await userService.signUp(body);
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

        <section className='loginPage'>

            <div className="loginPageContent">

                <form onSubmit={onSubmit}>

                    <PublicInput
                        image={user}
                        placeholder="Name..."
                        type="text"
                        inValueChange={e => setName(e.target.value)}
                        value={name}
                        validateMessage="Name must have at least 3 characters"
                        showValidateMessage={name && !validateName(name)} />

                    <PublicInput
                        image={message}
                        placeholder="Email..."
                        type="email"
                        inValueChange={e => setEmail(e.target.value)}
                        value={email}
                        validateMessage="Insert a valid Email"
                        showValidateMessage={email && !validateEmail(email)} />

                    <Button
                        text="Sign Up"
                        type="submit"
                        disabled={!signUpIsValid() || isSubmiting}
                    />
                </form>

                <div className="loginPageFooter">
                    <p>Do you have an account?</p>
                    <Link href="/login">Login</Link>
                </div>
            </div>
        </section>
    )
}

export default SignUp