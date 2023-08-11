import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function RegistrationForm() {
    return (
        <div
            className="h-[100%] w-[100%]  flex flex-row justify-center"
            // className="top-l w-[560px] h-[360px] border border-basicColors-light m-auto ui-background rounded-xl mt-l"
        >
            <SignUp
                appearance={{
                    baseTheme: dark,
                    
                }}
            />
        </div>
    );
}
