import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../../AuctionForm";
import { getDetailedViewData } from "@/app/actions/auctionActions";

type Params = Promise<{ id: string }>;

export default async function Update({ params }: { params: Params }) {
  const data = await getDetailedViewData((await params).id);
  return (
    <div className="mx-auto mx-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Upadate your auction"
        subtitle="Please update the details of your car"
      />
      <AuctionForm auction={data} />
    </div>
  );
}
