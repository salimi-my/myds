"use client";

import {
  SearchBar,
  SearchBarInput,
  SearchBarInputContainer,
  SearchBarSearchButton,
  SearchBarClearButton,
  SearchBarHint,
} from "@govtechmy/myds-react/search-bar";
import { Pill } from "@govtechmy/myds-react/pill";
import { useEffect, useRef, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@govtechmy/myds-react/tabs";
import type { IconData } from "./IconDataList";
import ResultMap from "./ResultMap";
import { clx } from "@govtechmy/myds-react/utils";

type Props = {
  iconDataList: IconData[];
};

export default function SearchBarIcons({ iconDataList }: Props) {
  const [hasFocus, setHasFocus] = useState(false);
  const [query, setQuery] = useState("");
  const filterIcons = (query: any, conditions: any) => {
    return iconDataList.filter(({ type, filename }) => {
      const iconData = `${type} ${filename}`.toLowerCase();
      const iconType = type.toLowerCase();
      return (
        iconData.includes(query.toLowerCase()) &&
        conditions.every((condition: (arg0: string) => any) =>
          condition(iconType),
        )
      );
    });
  };

  const resultAll = filterIcons(query, [() => true]);
  const resultGeneric = filterIcons(query, [
    (iconType: string | string[]) => !iconType.includes("legacy"),
    (iconType: string | string[]) => iconType.includes("generic"),
    (iconType: string | string[]) => !iconType.includes("filled"),
  ]);
  const resultFilled = filterIcons(query, [
    (iconType: string | string[]) => !iconType.includes("legacy"),
    (iconType: string | string[]) => iconType.includes("filled"),
  ]);
  const resultWYSIWYG = filterIcons(query, [
    (iconType: string | string[]) => !iconType.includes("legacy"),
    (iconType: string | string[]) => iconType.includes("wysiwyg"),
  ]);
  const resultSocialMedia = filterIcons(query, [
    (iconType: string | string[]) => !iconType.includes("legacy"),
    (iconType: string | string[]) => iconType.includes("social media"),
  ]);
  const resultMedia = filterIcons(query, [
    (iconType: string | string[]) => !iconType.includes("legacy"),
    (iconType: string | string[]) => !iconType.includes("social"),
    (iconType: string | string[]) => iconType.includes("media"),
  ]);
  const resultLegacyGeneric = filterIcons(query, [
    (iconType: string | string[]) => iconType.includes("legacy"),
  ]);

  const inputRef = useFocusOnKeyPress<HTMLInputElement>("/", hasFocus);
  const results = [
    resultAll,
    resultGeneric,
    resultFilled,
    resultWYSIWYG,
    resultSocialMedia,
    resultMedia,
    resultLegacyGeneric,
  ];

  return (
    <div className="">
      <SearchBar
        size="large"
        onBlur={(e) => {
          const blurredByChild = e.currentTarget.contains(e.relatedTarget);
          if (blurredByChild) return;
          setHasFocus(false);
        }}
        className="pb-6"
      >
        <SearchBarInputContainer>
          <SearchBarInput
            ref={inputRef}
            placeholder="Search by name"
            value={query}
            onValueChange={setQuery}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          />
          {query && <SearchBarClearButton onClick={() => setQuery("")} />}
          {!hasFocus && (
            <SearchBarHint className="hidden lg:flex">
              Press <Pill size="small">/</Pill> to search
            </SearchBarHint>
          )}
          <SearchBarSearchButton />
        </SearchBarInputContainer>
      </SearchBar>

      <Tabs defaultValue="2" size="medium" variant="line">
        <div className="border-otl-gray-200 h-[60px] border-b-2">
          <TabsList
            width="full"
            className={clx(
              "no-scrollbar h-full flex-grow overflow-y-clip overflow-x-scroll scroll-smooth text-nowrap",
              "before:-bottom-0 before:contents before:h-0 before:bg-transparent",
            )}
          >
            <div className="w-1 shrink-0"></div>
            <TabsTrigger value="1">All</TabsTrigger>
            <TabsTrigger value="2">Generic</TabsTrigger>
            <TabsTrigger value="3">Filled</TabsTrigger>
            <TabsTrigger value="4">WYSIWYG</TabsTrigger>
            <TabsTrigger value="5">Social Media</TabsTrigger>
            <TabsTrigger value="6">Media</TabsTrigger>
            <TabsTrigger value="7">Agency Icon (Legacy)</TabsTrigger>
          </TabsList>
        </div>

        {results.map((result, index) => (
          <TabsContent
            key={index}
            className="py-6"
            value={(index + 1).toString()}
          >
            <ResultMap result={result} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function useFocusOnKeyPress<T extends HTMLElement>(
  key: string,
  isFocused: boolean,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused && e.key === key) {
        ref.current?.focus();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFocused, ref]);

  return ref;
}
