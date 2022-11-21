import { CustomFlowbiteTheme } from "flowbite-react/lib/esm/components/Flowbite/FlowbiteTheme";

export const flowbiteTheme: CustomFlowbiteTheme = {
  footer: {
    base: "flex flex-col bg-white dark:bg-gray-800",
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
  sidebar: {
    base: "h-full bg-gray-50",
    collapse: {
      list: "space-y-2 py-2 list-none",
    },
    inner:
      "h-full overflow-y-auto overflow-x-hidden bg-white py-4 px-3 dark:bg-gray-800",
    item: {
      base: "no-underline flex items-center rounded-lg p-2 text-lg font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    },
    itemGroup:
      "list-none border-t border-gray-200 pt-3 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
  },
  navbar:{
    inner:{
      base:  "mx-auto flex flex-wrap items-center justify-start"
    }
  }
};