import Image from "next/image";
import logo from "../../public/assets/images/logo-header.png";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image src={logo} alt="Logo" width={100} height={100} />
          </div>
          <div className="flex items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-primary px-4 py-1 text-sm rounded-full hover:bg-primary hover:text-white transition duration-500 font-semibold uppercase border-primary border-2">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
