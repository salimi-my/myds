import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { createStory } from "../utils";
import { AnnounceBar } from "@myds/react/announce-bar";

/**
 * ### Overview
 * Insert a brief description of the component here.
 *
 * > Insert a ChatGPT pantun here 
 *
 * ### Usage
 * ```tsx
 * import AnnounceBar from "@myds/react/announce-bar";
 *
 * <AnnounceBar />
 * ```
 */
const meta = {
  title: "@myds/react/AnnounceBar",
  component: AnnounceBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
  argTypes: {
    type: {
      table: {
        type: {
          summary: "enum",
        },
      },
      description: "insert-description-here",
      control: "inline-radio",
      options: ["option-1", "option-2", "option-3"],
    },
  }
} satisfies Meta<typeof AnnounceBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Storybook stories for different variants of a component.
 *
 * @example
 * export const Default: Story = createStory({ ... });
 * export const DarkDefault: Story = createStory({ ... , className="dark"}, "dark");
 */

// export const Default: Story = createStory({
//  children: "Example",
// });