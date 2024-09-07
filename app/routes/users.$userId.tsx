import { useParams } from "@remix-run/react";

export default function User() {
  const params = useParams()

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">User Profile :{params.userId} </h1>
    </div>
  );
}