import {
  ComponentProps,
  createContext,
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent,
  JSXElementConstructor,
  LegacyRef,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { clx } from "../utils";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

/*========================================================================================================================*/

interface TabsProps extends ComponentProps<typeof TabsPrimitive.Root> {
  variant?: "pill" | "enclosed" | "line";
  size?: "small" | "medium";
}

const TabsContext = createContext<TabsProps>({
  variant: "line",
  size: "small",
});

/*========================================================================================================================*/

const Tabs: ForwardRefExoticComponent<TabsProps> = forwardRef((props, ref) => (
  <TabsContext.Provider value={props}>
    <TabsPrimitive.Root ref={ref} {...props} />
  </TabsContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

/*========================================================================================================================*/

const tabs_list_cva = cva(
  "relative flex flex-row items-center space-x-1 justify-start font-medium py-1",
  {
    variants: {
      variant: {
        pill: "bg-transparent rounded-full",
        enclosed: "bg-bg-washed rounded-md",
        line: "before:h-[1px] before:absolute before:-bottom-[9px] before:bg-otl-gray-200 before:left-0 before:right-0",
      },
      width: {
        full: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "line",
    },
  },
);

interface TabsListProps extends ComponentProps<typeof TabsPrimitive.List> {
  width?: "fit" | "full";
}

const TabsList: ForwardRefExoticComponent<TabsListProps> = forwardRef(
  ({ className, width = "fit", ...props }, ref) => {
    const { variant } = useContext(TabsContext);

    return (
      <TabsPrimitive.List
        ref={ref}
        className={tabs_list_cva({ variant, width, className })}
        {...props}
      />
    );
  },
);
TabsList.displayName = TabsPrimitive.List.displayName;

/*========================================================================================================================*/

const tabs_trigger_cva = cva(
  [
    "relative flex gap-1 items-center text-txt-black-500 hover:text-txt-black-900 data-[state=active]:text-txt-black-900 outline-none border border-transparent",
    "focus:ring-2 focus:ring-fr-primary space",
  ],
  {
    variants: {
      variant: {
        pill: [
          "bg-transparent data-[state=active]:bg-bg-washed-active transition-colors rounded-full",
        ],
        enclosed: [
          "data-[state=active]:bg-bg-dialog-active rounded-md transition-[border] data-[state=active]:border-otl-gray-200",
          // "before:h-auto before:w-[1px] before:content-[''] before:absolute before:-left-1 before:bg-otl-gray-300 before:first-of-type:hidden",
        ],
        line: "rounded-md before:h-0.5 before:content-[''] before:absolute before:-bottom-2.5 before:left-0 before:right-0 before:data-[state=active]:bg-primary-600 before:transition-all before:duration-200",
      },
      size: {
        small: "text-body-sm py-1.5 px-2.5",
        medium: "text-body-md py-2 px-3",
      },
    },
    compoundVariants: [
      {
        variant: "enclosed",
        size: "small",
        className: "before:py-2",
      },
      {
        variant: "enclosed",
        size: "medium",
        className: "before:py-2.5",
      },
      {
        variant: "line",
        size: "small",
        className: "before:mx-2.5",
      },
      {
        variant: "line",
        size: "medium",
        className: "before:mx-3",
      },
    ],
    defaultVariants: {
      variant: "line",
      size: "small",
    },
  },
);

const TabsTrigger: ForwardRefExoticComponent<
  ComponentProps<typeof TabsPrimitive.TabsTrigger>
> = forwardRef(({ className, ...props }, ref) => {
  const { variant, size } = useContext(TabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={tabs_trigger_cva({ variant, size, className })}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/*========================================================================================================================*/

const tab_icon_cva = cva(
  "block shrink-0 stroke-inherit text-inherit stroke-[1.5px]",
  {
    variants: {
      size: {
        small: "size-4",
        medium: "size-5",
      },
    },
    defaultVariants: {
      size: "small",
    },
  },
);

interface TabsIconProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

const TabsIcon: FunctionComponent<TabsIconProps> = ({ children }) => {
  const { size } = useContext(TabsContext);

  return <Slot className={clx(tab_icon_cva({ size }))}>{children}</Slot>;
};

TabsIcon.displayName = "TabsIcon";
/*========================================================================================================================*/

interface TabsCounterProps extends ComponentProps<"span"> {
  children: ReactNode;
  ref?: LegacyRef<HTMLSpanElement>;
}

const TabsCounter: ForwardRefExoticComponent<TabsCounterProps> = forwardRef(
  ({ children, ...props }, ref) => {
    const { size } = useContext(TabsContext);
    return (
      <span
        ref={ref}
        className={clx(
          size === "medium" && "text-body-md",
          size === "small" && "text-body-sm",
          "text-txt-primary",
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

TabsCounter.displayName = "TabsCounter";

/*========================================================================================================================*/

const TabsContent: ForwardRefExoticComponent<
  ComponentProps<typeof TabsPrimitive.Content>
> = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={clx("text-txt-black-700", className)}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;

/*========================================================================================================================*/

export { Tabs, TabsIcon, TabsCounter, TabsList, TabsTrigger, TabsContent };
