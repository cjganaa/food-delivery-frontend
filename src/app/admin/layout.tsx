import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
import { LayoutDashboard,Truck,Settings } from 'lucide-react';
  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    return (
      <ClerkProvider>
        <html lang="en">
          <body>
            <SignedOut>
              <SignInButton>
                <div className='w-full h-full flex justify-end p-6'>
                  <button className='bg-black text-white p-2 rounded-md'>login in</button>
                </div>
                
              </SignInButton>
            </SignedOut>
            <SignedIn>
                <div className="bg-muted w-screen h-screen flex">
                    <div className="bg-background h-full w-1/6 flex flex-col items-center pt-10 gap-6">
                    <div className="flex gap-3">
                    <img src="/LogoNomNom.svg" alt="" />
                    <div>
                        <div className="text-foreground flex font-bold">NomNom</div>
                        <div className="text-foreground text-xs">Swift delivery</div>
                    </div>
                    </div>
                        <a href="/admin/menu" className="w-4/5 flex justify-center rounded-full hover:bg-black p-4 hover:text-white">
                          <LayoutDashboard />
                          Food menu
                        </a>
                        <a href="/admin/orders" className="w-4/5 flex justify-center rounded-full hover:bg-black p-4 hover:text-white">
                          <Truck />
                          Orders
                        </a>
                        <a href="/admin/settings" className="w-4/5 flex justify-center rounded-full hover:bg-black p-4 hover:text-white">
                          <Settings />
                          Settings
                        </a>
                    </div>
                    <div className="absolute self-end right-6 top-6">
                        <UserButton/>
                    </div>
                    {children}
                        
                </div>
              
              
            </SignedIn>
          </body>
        </html>
      </ClerkProvider>
    )
  }