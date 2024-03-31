import { useEffect } from "react";

const Toast = ({ message, type, onClose }) => {
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  let seconds = 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, seconds);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={styles}>
      <div className="flex justify-center items-center gap-6">
        <span className="text-lg font-semibold">{message}</span>
        <span
          className="rounded-full bg-slate-500 px-2 py-1 mx-auto cursor-pointer "
          onClick={() => onClose()}
        >
          x
        </span>
      </div>
    </div>
  );
};

export default Toast;
