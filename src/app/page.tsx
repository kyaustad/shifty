import { AuthForms } from "@/features/auth/components/auth-forms";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <div className="flex flex-row gap-2 items-center">
        <Image src="/logo.svg" alt="Shifty" width={35} height={35} />
        <h1 className="text-4xl font-bold ">Shifty</h1>
      </div>
      <p className="text-lg text-gray-500">
        Shift work and schedules made easy
      </p>
      <AuthForms className="w-full max-w-md " />
    </div>
  );
}
