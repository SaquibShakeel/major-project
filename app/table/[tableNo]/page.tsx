import React from "react";
import Inventory from "../../pages/Inventory";

interface PageProps {
  params: {
    tableNo: string;
  };
}

export const dynamic='force-dynamic';
export const revalidate = 5;

const page = ({ params }: PageProps) => {
  const { tableNo } = params;
  return (
    <div>
      <Inventory />
    </div>
  );
};

export default page;
