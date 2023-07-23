'use client';

import { GridLoader } from "react-spinners";

function ListLoading() {
  return (
    <div className="w-full mt-32 flex justify-center items-center text-red-100">
      <GridLoader />
    </div>
  )
}

export default ListLoading