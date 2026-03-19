import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <ClipLoader color="#000000" />
    </div>
  );
}
