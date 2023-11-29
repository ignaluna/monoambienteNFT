import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer flex justify-center border z-10 bg-[#121212] bg-opacity-90 border-t-[#33353F] h-16 overflow-hidden border-l-transparent border-r-transparent text-white">
      <div className="container flex justify-between items-center px-6">
      <Image
              src="/images/logo1.png"
              alt="hero image"
              width={50}
              height={50}
            />
        <p className="text-slate-600">The right candidate.</p>
      </div>
    </footer>
  );
};

export default Footer;