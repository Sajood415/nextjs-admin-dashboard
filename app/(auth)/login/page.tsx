import UserLoginForm from '@/components/login/user-login-form';

export default function LoginPage() {
  return (
    <>
      <div className="container relative h-screen md:flex md:flex-row lg:grid lg:max-w-full lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
        </div>
        <div className="lg:p-8 h-screen flex items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center"></div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to access.
              </p>
            </div>
            <UserLoginForm />
            <div className='flex flex-col space-y-2 text-center'>
							<p className='text-sm text-muted-foreground'>
								user name: emilys <br/>
								pass: emilyspass
							</p>
						</div>
          </div>
        </div>
      </div>
    </>
  );
}
