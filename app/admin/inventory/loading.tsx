import { BarLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <BarLoader color="#0066cc" />
    </div>
  );
}
