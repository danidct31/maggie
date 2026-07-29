import { Suspense } from "react";
import LoginPage from "./LoginClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center px-5">
          <p className="text-sm text-mute">…</p>
        </main>
      }
    >
      <LoginPage />
    </Suspense>
  );
}
