import { CustomFlowbiteTheme } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";

export const flowbiteTheme: CustomFlowbiteTheme = {
  footer: {
    base: "flex flex-col bg-white dark:bg-gray-800 bottom-0",
    brand: {
      base: "m-6 flex items-center",
    },
    icon: {
      base: "text-gray-400 hover:text-gray-900 dark:hover:text-white",
    },
  },
  modal: {
    body: {
      base: "space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8",
    },
  },
  navbar:{
    inner:{
      base:  "mx-auto flex flex-wrap items-center justify-start"
    }
  }
};