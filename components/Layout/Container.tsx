import React, { useEffect, useState } from "react";
import ToTopBtn from "@/components/toTopBtn/ToTopBtn";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full lg:max-w-[1060px] md:max-w-[704px] sm:max-w-[325px] mx-auto">
      {children}
      {showBtn && <ToTopBtn />}
    </div>
  );
};

export default Container;
