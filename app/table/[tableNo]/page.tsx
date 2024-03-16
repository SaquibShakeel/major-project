import React from "react";
import Inventory from "../../pages/Inventory";

interface PageProps {
  params: {
    tableNo: string;
  };
}

const page = ({ params }: PageProps) => {
  const { tableNo } = params;
  return (
    <div>
      <Inventory />
    </div>
  );
};

export default page;
