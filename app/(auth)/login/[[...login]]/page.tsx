import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
export default function LoginForm() {
    return (
        <SignIn
            appearance={{
                baseTheme: dark,
            }}
        />
    );
}
