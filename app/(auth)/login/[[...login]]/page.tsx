import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
export default function LoginForm() {
    return (
        <div className='h-[100%] w-[100%]  flex flex-row justify-center '>
        <SignIn
            appearance={{
                baseTheme: dark,
                elements: {
                    formButtonPrimary:
                        "bg-slate-500 hover:bg-slate-400 text-sm normal-case text-slate-500",
                    },
                }}
        
        />
        </div>
    );
}
