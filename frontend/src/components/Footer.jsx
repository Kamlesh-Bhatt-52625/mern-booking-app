const Footer = () => {
  return (
    <div className="bg-blue-800 py-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          BhattHolidays.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
          <a
            href="https://kamlesh-bhatt-52625.github.io/"
            className="cursor-pointer decoration-0"
            target="_blank"
          >
            Contact Us
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
