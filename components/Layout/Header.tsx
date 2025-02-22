import Logo from "@/public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import HeaderMenu from "../HeaderMenu";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {
  const { fetchUserInfo } = useAuthStore();

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <header className="bg-gray100 py-[13px] px-[30px] flex justify-center">
      <div className="flex justify-between items-center w-full lg:max-w-[1520px] md:max-w-[800px] sm:max-w-[326px]">
        <h1 className="w-[88.67px] h-[16px] md:w-[133px] md:h-[24px] lg:w-[133px] lg:h-[24px]">
          <Link href={"/"}>
            <Image src={Logo} width={133} height={24} alt="로고" />
          </Link>
        </h1>
        <HeaderMenu />
      </div>
    </header>
  );
};

export default Header;
