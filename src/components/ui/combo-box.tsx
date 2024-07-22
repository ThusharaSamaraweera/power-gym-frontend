// import * as React from "react";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command";
// import { Popover, PopoverContent, PopoverTrigger } from "./popover";
// import { Button } from "./button";
// import { cn } from "../../lib/utils";

// interface ComboboxProps {
//   label: string;
//   options?: { value: string; label: string }[];
//   onChange: (value: string) => void;
// }

// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

// const Combobox: React.FC<ComboboxProps> = ({ label, options = frameworks }) => {
//   console.log("🚀 ~ file: combo-box.tsx:17 ~ options:", options);
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
//           {value ? options?.find((option) => option?.value === value)?.label : `Search ${label?.toLowerCase()}`}
//           <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className='w-[200px] p-0'>
//         <Command>
//           <CommandInput placeholder={`Search ${label?.toLowerCase()}`} className='h-9' />
//           {/* <CommandEmpty>{label}</CommandEmpty> */}
//           <CommandGroup>
//             {options?.map((option) => {
//               console.log("🚀 ~ file: combo-box.tsx:57 ~ {options?.map ~ option:", option);

//               return (
//                 // <div>{option?.label}</div>
//                 <CommandItem
//                   key={option?.value}
//                   value={option?.value}
//                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                   onSelect={(currentValue: any) => {
//                     setValue(currentValue === value ? "" : currentValue);
//                     setOpen(false);
//                   }}>
//                   {option?.label}
//                   <CheckIcon className={cn("ml-auto h-4 w-4", value === option?.value ? "opacity-100" : "opacity-0")} />
//                 </CommandItem>
//               );
//             })}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default Combobox;
