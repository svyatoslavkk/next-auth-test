import { SIGN_UP_PROMPT, SIGN_UP_TITLE } from "@/constants";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-16 w-full min-h-screen p-16">
      <Form />
      <p className="flex text-white text-sm font-light">
        {SIGN_UP_PROMPT}
        &nbsp;
        <span className="font-medium">{SIGN_UP_TITLE}</span>
      </p>
    </main>
  );
}
