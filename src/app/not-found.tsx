import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <div className="font-display text-6xl">🫖</div>
        <h1 className="mt-4 font-display text-3xl font-bold">Страница не найдена</h1>
        <p className="mt-2 text-muted">Похоже, эта чайхана уже закрылась.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-clay px-6 py-3 font-semibold text-white transition hover:bg-clay-dark"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
