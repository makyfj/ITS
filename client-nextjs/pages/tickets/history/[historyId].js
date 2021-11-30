import React from "react";
import { useRouter } from "next/dist/client/router";

const CaseHistory = () => {
  const router = useRouter();

  const [historyId] = router.query;

  console.log(historyId);

  return (
    <>
      <h1>Case History</h1>
    </>
  );
};

export default CaseHistory;
