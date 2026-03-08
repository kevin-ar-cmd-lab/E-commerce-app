import Link from "next/link";

const recentOrderIds = [
  "JMT-2026-1042",
  "JMT-2026-1043",
  "JMT-2026-1044",
];

export default function OrderTrackingPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Order Tracking</h1>
      <p className="mt-3 text-gray-600">
        Use your order reference to view current shipping status and delivery
        milestones.
      </p>

      <div className="mt-8 rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold">Recent examples</h2>
        <div className="mt-4 flex flex-col gap-3">
          {recentOrderIds.map((orderId) => (
            <Link
              key={orderId}
              href={`/order/tracking/${orderId}`}
              className="rounded-md border px-4 py-3 hover:bg-gray-50"
            >
              {orderId}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
