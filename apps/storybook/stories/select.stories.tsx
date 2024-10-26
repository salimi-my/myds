import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { createStory } from "../utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectHeader,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroupTitle,
  SelectFooter,
} from "@myds/react/select";
import { Input, InputIcon } from "@myds/react/input";
import { SearchIcon } from "../../../packages/react/src/icons/search";
import { Button } from "@myds/react/button";

const CONTENT = (
  <SelectGroup>
    <SelectGroupTitle>Fruits</SelectGroupTitle>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="blueberry">Blueberry</SelectItem>
    <SelectItem value="grapes">Grapes</SelectItem>
    <SelectItem value="pineapple1">Pineapple1</SelectItem>
    <SelectItem value="pineapple2">Pineapple2</SelectItem>
    <SelectItem value="pineapple3">Pineapple3</SelectItem>
    <SelectItem value="pineapple4">Pineapple4</SelectItem>
    <SelectItem value="pineapple5">Pineapple5</SelectItem>
    <SelectItem value="pineapple6">Pineapple6</SelectItem>
    <SelectItem value="pineapple7">Pineapple7</SelectItem>
    <SelectItem value="pineapple8">Pineapple8</SelectItem>
    <SelectItem value="pineapple9">Pineapple9</SelectItem>
  </SelectGroup>
);

/**
 * ### Overview
 * Insert a brief description of the component here.
 *
 * > Insert a ChatGPT pantun here
 *
 * ### Usage
 * ```tsx
 * import Select from "@myds/react/select";
 *
 * <Select
 *  size="small"
 * variant="outline"
 * >
 * <SelectTrigger>
 *    <SelectValue
 *     label="Fruit"
 *     placeholder="Select"
 *   />
 * </SelectTrigger>
 * <SelectContent>
 *   //* Header
 *   <SelectHeader>
 *     <Input size="small">
 *       <InputIcon position="right">
 *         <SearchIcon className="text-otl-gray-300" />
 *       </InputIcon>
 *     </Input>
 *   </SelectHeader>
 *   //* Content
 *   <SelectGroup>
 *     <SelectGroupTitle>
 *       Fruits
 *     </SelectGroupTitle>
 *     <SelectItem value="apple">
 *       Apple
 *     </SelectItem>
 *     <SelectItem value="banana">
 *       Banana
 *     </SelectItem>
 *     <SelectItem value="blueberry">
 *       Blueberry
 *     </SelectItem>
 *     <SelectItem value="grapes">
 *       Grapes
 *     </SelectItem>
 *     <SelectItem value="pineapple1">
 *       Pineapple1
 *     </SelectItem>
 *   </SelectGroup>
 *   //* Footer
 *   <SelectFooter>
 *     <Button
 *       size="small"
 *       variant="default-ghost"
 *     >
 *       Reset
 *     </Button>
 *   </SelectFooter>
 * </SelectContent>
 * </Select>
 * ```
 */
const meta = {
  title: "@myds/react/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    multiple: false,
    disabled: false,
    size: "small",
    variant: "outline",
    children: "Options only",
  },
  argTypes: {
    size: {
      table: {
        type: {
          summary: "small | medium | large",
        },
      },
      description: "Available sizes for the select component",
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    multiple: {
      table: {
        type: {
          summary: "boolean",
        },
      },
      description: "Single or multiple selection",
      control: "boolean",
    },
    variant: {
      table: {
        type: {
          summary: "enum",
        },
      },
      description: "Available variants for the select component",
      control: "inline-radio",
      options: ["outline", "ghost"],
    },
    disabled: {
      table: {
        type: {
          summary: "boolean",
        },
      },
      description: "Disabled state of the select component",
      control: "boolean",
    },
    children: {
      type: "string",
      control: "select",
      options: [
        "Options only",
        "Options + Header",
        "Options + Footer",
        "Options + Header + Footer",
      ],
      mapping: {
        "Options only": [
          <SelectTrigger>
            <SelectValue label="Fruit" placeholder="Select" />
          </SelectTrigger>,
          <SelectContent>{CONTENT}</SelectContent>,
        ],
        "Options + Header": [
          <SelectTrigger>
            <SelectValue label="Fruit" placeholder="Select" />
          </SelectTrigger>,
          <SelectContent>
            <SelectHeader>
              <Input size={"small"}>
                <InputIcon position="right">
                  <SearchIcon className="text-otl-gray-300" />
                </InputIcon>
              </Input>
            </SelectHeader>
            {CONTENT}
          </SelectContent>,
        ],
        "Options + Footer": [
          <SelectTrigger>
            <SelectValue label="Fruit" placeholder="Select" />
          </SelectTrigger>,
          <SelectContent>
            {CONTENT}
            <SelectFooter>
              <Button variant={"default-ghost"} size={"small"}>
                Reset
              </Button>
            </SelectFooter>
          </SelectContent>,
        ],
        "Options + Header + Footer": [
          <SelectTrigger>
            <SelectValue label="Fruit" placeholder="Select" />
          </SelectTrigger>,
          <SelectContent>
            <SelectHeader>
              <Input size={"small"}>
                <InputIcon position="right">
                  <SearchIcon className="text-otl-gray-300" />
                </InputIcon>
              </Input>
            </SelectHeader>
            {CONTENT}
            <SelectFooter>
              <Button variant={"default-ghost"} size={"small"}>
                Reset
              </Button>
            </SelectFooter>
          </SelectContent>,
        ],
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Storybook stories for different variants of a component.
 *
 * @example
 * export const Default: Story = createStory({ ... });
 * export const DarkDefault: Story = createStory({ ... , className="dark"}, "dark");
 */

export const Default: Story = createStory({
  children: [
    <SelectTrigger>
      <SelectValue label="Fruit" placeholder="Select" />
    </SelectTrigger>,
    <SelectContent>
      <SelectGroup>
        <SelectGroupTitle>Fruits</SelectGroupTitle>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple1">Pineapple1</SelectItem>
        <SelectItem value="pineapple2">Pineapple2</SelectItem>
        <SelectItem value="pineapple3">Pineapple3</SelectItem>
        <SelectItem value="pineapple4">Pineapple4</SelectItem>
        <SelectItem value="pineapple5">Pineapple5</SelectItem>
        <SelectItem value="pineapple6">Pineapple6</SelectItem>
        <SelectItem value="pineapple7">Pineapple7</SelectItem>
        <SelectItem value="pineapple8">Pineapple8</SelectItem>
        <SelectItem value="pineapple9">Pineapple9</SelectItem>
      </SelectGroup>
    </SelectContent>,
  ],
});

export const WithHeader: Story = createStory({
  children: [
    <SelectTrigger>
      <SelectValue label="Fruit" placeholder="Select" />
    </SelectTrigger>,
    <SelectContent>
      <SelectHeader>
        <Input size={"small"}>
          <InputIcon position="right">
            <SearchIcon className="text-otl-gray-300" />
          </InputIcon>
        </Input>
      </SelectHeader>
      <SelectGroup>
        <SelectGroupTitle>Fruits</SelectGroupTitle>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple1">Pineapple1</SelectItem>
        <SelectItem value="pineapple2">Pineapple2</SelectItem>
        <SelectItem value="pineapple3">Pineapple3</SelectItem>
        <SelectItem value="pineapple4">Pineapple4</SelectItem>
        <SelectItem value="pineapple5">Pineapple5</SelectItem>
        <SelectItem value="pineapple6">Pineapple6</SelectItem>
        <SelectItem value="pineapple7">Pineapple7</SelectItem>
        <SelectItem value="pineapple8">Pineapple8</SelectItem>
        <SelectItem value="pineapple9">Pineapple9</SelectItem>
      </SelectGroup>
    </SelectContent>,
  ],
});

export const WithFooter: Story = createStory({
  children: [
    <SelectTrigger>
      <SelectValue label="Fruit" placeholder="Select" />
    </SelectTrigger>,
    <SelectContent>
      <SelectGroup>
        <SelectGroupTitle>Fruits</SelectGroupTitle>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple1">Pineapple1</SelectItem>
        <SelectItem value="pineapple2">Pineapple2</SelectItem>
        <SelectItem value="pineapple3">Pineapple3</SelectItem>
        <SelectItem value="pineapple4">Pineapple4</SelectItem>
        <SelectItem value="pineapple5">Pineapple5</SelectItem>
        <SelectItem value="pineapple6">Pineapple6</SelectItem>
        <SelectItem value="pineapple7">Pineapple7</SelectItem>
        <SelectItem value="pineapple8">Pineapple8</SelectItem>
        <SelectItem value="pineapple9">Pineapple9</SelectItem>
      </SelectGroup>
      <SelectFooter>
        <Button variant={"default-ghost"} size={"small"}>
          Reset
        </Button>
      </SelectFooter>
    </SelectContent>,
  ],
});

export const DarkDefault: Story = createStory(
  {
    children: [
      <div className="dark">
        <SelectTrigger>
          <SelectValue label="Fruit" placeholder="Select" />
        </SelectTrigger>
        ,
        <SelectContent className="dark">
          <SelectHeader>
            <Input size="small">
              <InputIcon position="right">
                <SearchIcon className="text-otl-gray-300" />
              </InputIcon>
            </Input>
          </SelectHeader>
          <SelectGroup>
            <SelectGroupTitle>Fruits</SelectGroupTitle>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
            <SelectItem value="pineapple1">Pineapple1</SelectItem>
            <SelectItem value="pineapple2">Pineapple2</SelectItem>
            <SelectItem value="pineapple3">Pineapple3</SelectItem>
            <SelectItem value="pineapple4">Pineapple4</SelectItem>
            <SelectItem value="pineapple5">Pineapple5</SelectItem>
            <SelectItem value="pineapple6">Pineapple6</SelectItem>
            <SelectItem value="pineapple7">Pineapple7</SelectItem>
            <SelectItem value="pineapple8">Pineapple8</SelectItem>
            <SelectItem value="pineapple9">Pineapple9</SelectItem>
          </SelectGroup>
          <SelectFooter>
            <Button variant={"default-ghost"} size={"small"}>
              Reset
            </Button>
          </SelectFooter>
        </SelectContent>
      </div>,
    ],
  },
  "dark",
);
