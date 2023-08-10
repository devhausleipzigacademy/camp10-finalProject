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
          card: 'bg-basicColors-dark',
          headerTitle: '',
          headerSubtitle: '',
          main: '',
          socialButtons: '',
          socialButtonsBlockButton: '',
          //How should we decide between git/ gmail
          dividerRow: '',
          dividerText: '',
          formFieldLabelRow: '',

          formButtonPrimary: 'bg-[#e74c3c]',
        },
      }}
    />
  );
}
