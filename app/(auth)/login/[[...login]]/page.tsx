import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function LoginForm() {
  return (
    //  <div className="top-l w-[560px] h-[360px] border border-basicColors-light m-auto ui-background rounded-xl mt-l">
    //      Login Form
    //  </div>
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'bg-[#e74c3c]',
        },
      }}
    />
  );
}
