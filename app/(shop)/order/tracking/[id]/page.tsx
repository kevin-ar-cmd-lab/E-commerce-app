import Link from "next/link";

const trackingStages = [
  "Order received",
  "Payment verified",
  "Packed at warehouse",
  "In transit",
  "Out for delivery",
];

export default async function OrderTrackingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const stageIndex = Math.abs(
    id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  ) % trackingStages.length;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/order/tracking" className="text-sm text-blue-600 hover:underline">
        Back to tracking
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Tracking {id}</h1>

      <ol className="mt-8 space-y-3">
        {trackingStages.map((stage, index) => {
          const completed = index <= stageIndex;
          return (
            <li
              key={stage}
              className={`rounded-md border px-4 py-3 ${
                completed
                  ? "border-green-200 bg-green-50 text-green-900"
                  : "border-gray-200 bg-white text-gray-500"
              }`}
            >
              {stage}
            </li>
          );
        })}
      </ol>
    </main>
  );
}
