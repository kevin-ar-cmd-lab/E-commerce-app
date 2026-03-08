import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
        Order Confirmed
      </p>
      <h1 className="mt-3 text-3xl font-bold">Thank you for your purchase</h1>
      <p className="mt-4 text-gray-600">
        The order was placed successfully and is now being prepared for
        dispatch.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/order/tracking"
          className="rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Track your order
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-gray-300 px-6 py-3 text-gray-800 hover:bg-gray-50"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
