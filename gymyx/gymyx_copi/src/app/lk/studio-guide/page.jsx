'use client'

import Loading from "@/Components/Loading";
import StudioGuidePage from "@/Sections/StudioGuide/StudioGuidePage";
import { useState, useEffect } from "react";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/studioGuide`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const StudioGuide = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData()
    .then(res => setData(res?.data))
    .finally(() => setLoading(false))
  }, []);

  return (
    <>
      {loading && (<Loading full_screen={true}/>)}
      <StudioGuidePage data={data?.modules} />
    </>
  );
}

export default StudioGuide;