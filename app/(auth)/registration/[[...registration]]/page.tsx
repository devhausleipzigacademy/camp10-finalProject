import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function RegistrationForm() {
    return (
        <div className="h-[100%] w-[100%]  flex flex-row justify-center">
            <SignUp
                appearance={{
                    baseTheme: dark,
                }}
            />
        </div>
    );
}
