import {
  getBidsForAuction,
  getDetailedViewData,
} from "@/app/actions/auctionActions";
import React from "react";
import CountdownTimer from "../../CountdownTimer";
import CarImage from "../../CarImage";
import DetailedSpecs from "./DetailedSpecs";
import Heading from "@/app/components/Heading";
import { getCurrentUser } from "@/app/actions/authActions";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import BidItem from "./BidItem";

export default async function Details({ params }: { id: string }) {
  const data = await getDetailedViewData(params.id);
  const user = await getCurrentUser();
  const bids = await getBidsForAuction(params.id);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Heading title={`${data.make} ${data.model}`} />
          {user?.username === data.seller && (
            <>
              <EditButton id={data.id} /> <DeleteButton id={data.id} />
            </>
          )}
        </div>
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountdownTimer auctionEnd={data.auctionEnd} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
          <CarImage imageUrl={data.imageUrl} />
        </div>
        <div className="border-2 rounded-lg p-2 bg-gray-1000">
          <Heading title="Bids" />
          {bids.map((bid) => (
            <p key={bid.id}>
              <BidItem key={bid.id} bid={bid} />
            </p>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={data} />
      </div>
    </div>
  );
}
