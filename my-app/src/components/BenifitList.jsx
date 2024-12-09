export default function BenifitList() {
  return (
    <ul className="hidden mt-8 text-left font-medium md:flex flex-col items-center sm:items-start">
      <div className="space-y-2">
        <li className="flex gap-1.5 items-center text-left">Good reason one</li>
        <li className="flex gap-1.5 items-center text-left">Good reason two</li>
        <li className="flex gap-1.5 items-center text-left">
          Good reason three
        </li>
        <li className="flex gap-1.5 items-center text-left">
          Good reason four
        </li>
      </div>
    </ul>
  );
}
