import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

type searchParams = Promise<{ callbackUrl: string }>;

export default async function page({
  searchParams,
}: {
  searchParams: searchParams;
}) {
  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="Please click below to sing in"
      showLogin
      callbackUrl={(await searchParams).callbackUrl}
    />
  );
}
