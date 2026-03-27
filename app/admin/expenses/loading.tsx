import { ClipLoader } from "react-spinners";
export default function Loading() {
  return (
    <div className="flex flex-1 w-full items-center justify-center">
      <ClipLoader color="#000000" />
    </div>
  );
}
