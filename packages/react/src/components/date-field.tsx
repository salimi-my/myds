import React from "react";
import {
  DateValue,
  DateFieldProps as PrimitiveDateFieldProps,
  DateField as PrimitiveDateField,
  DateInput as PrimitiveDateInput,
  DateSegment as PrimitiveDateSegment,
  I18nProvider,
} from "react-aria-components";
import { CalendarIcon } from "../icons/calendar";
import { cva, VariantProps } from "class-variance-authority";
import { clx } from "../utils";

const DEFAULT_SIZE = "medium";

const datefield_cva = cva(
  [
    "flex items-center gap-2 rounded-md border border-otl-gray-200 bg-bg-white text-txt-black-900 shadow-button",
    "focus-within:border-otl-primary-300 focus-within:ring focus-within:ring-fr-primary",
  ],
  {
    variants: {
      size: {
        small: "px-[10px] py-[6px] text-sm",
        medium: "px-[12px] py-[8px] text-base",
        large: "px-[14px] py-[10px] text-lg",
      },
    },
    defaultVariants: {
      size: DEFAULT_SIZE,
    },
  },
);

const icon_cva = cva([], {
  variants: {
    size: {
      small: "size-4",
      medium: "size-4",
      large: "size-5",
    },
  },
  defaultVariants: {
    size: DEFAULT_SIZE,
  },
});

type BaseProps = PrimitiveDateFieldProps<DateValue> &
  VariantProps<typeof datefield_cva>;

interface DateFieldProps extends BaseProps {
  className?: string;
  locale?: string;
}

/**
 * Uses react-aria-components' DateField API
 * @see {@link https://react-spectrum.adobe.com/react-aria/DateField.html}
 */
function DateField({
  className,
  size,
  locale = "en-MS",
  ...props
}: DateFieldProps) {
  return (
    <I18nProvider locale={locale}>
      <PrimitiveDateField
        className={clx(
          datefield_cva({ size }),
          props.isDisabled &&
            "bg-bg-washed text-txt-black-500 cursor-not-allowed",
          props.isInvalid && "border-otl-danger-300 ring-fr-danger ring",
          className,
        )}
        shouldForceLeadingZeros
        {...props}
      >
        <CalendarIcon className={icon_cva({ size })} />
        <PrimitiveDateInput className="flex items-center gap-0.5">
          {(segment) => (
            <PrimitiveDateSegment
              className={clx(
                "focus-visible:outline-none",
                "data-[placeholder]:text-txt-black-500 data-[type=literal]:text-txt-black-500",
                "data-[focused]:bg-primary-500 data-[focused]:data-[placeholder]:text-txt-white data-[focused]:text-txt-white",
              )}
              segment={segment}
            />
          )}
        </PrimitiveDateInput>
      </PrimitiveDateField>
    </I18nProvider>
  );
}

export { DateField };
