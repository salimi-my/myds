/**
 * Script to extract SVG icon, convert to tsx and sanitize to React-friendly attributes.
 * Arguments: None
 */
import fs from "fs";
import path from "path";
import { icon_directory } from "./util";

const outputIconTemplate = (name: string, text: string) => {
  return `import React from "react";
import { FunctionComponent, SVGProps } from "react";

/**
* ${name} Icon
* @param className
* @returns ${name}Icon
*/
export const ${name}Icon: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
    return ${sanitizeToReactAttrs(text)}
}`;
};

const sanitizeToReactAttrs = (text: string) => {
  return text
    .replace(
      `xmlns="http://www.w3.org/2000/svg"`,
      `xmlns="http://www.w3.org/2000/svg" {...props}`,
    )
    .replaceAll("clip-rule", "clipRule")
    .replaceAll("clip-path", "clipPath")
    .replaceAll("stroke-width", "strokeWidth")
    .replaceAll("stroke-linecap", "strokeLinecap")
    .replaceAll("stroke-linejoin", "strokeLinejoin")
    .replaceAll("fill-rule", "fillRule")
    .replaceAll(`fill="#18181B"`, `fill="currentColor"`)
    .replaceAll(`stroke="#18181B"`, `stroke="currentColor"`);
};

interface MainScriptProps {
  framework: "react" | "vue" | "angular";
}

/**
 * Converts a dash-case string to PascalCase.
 * @param {string} str - The dash-case string to convert.
 * @returns {string} - The converted PascalCase string.
 */
function dashToPascalCase(str: string): string {
  const reserved = new Set([
    "spr",
    "moh",
    "moe",
    "mcmc",
    "mers",
    "pdn",
    "bnm",
    "jpj",
    "mof",
    "dosm",
    "bomba",
    "jps",
    "jpa",
    "icu",
    "jpm",
    "jpn",
    "jakoa",
    "mampu",
    "ipr",
    "epu",
    "epf",
    "kwap",
    "lhdn",
    "pdrm",
    "ntrc",
    "socso",
    "mot",
    "met",
    "unhcr",
    "perkeso",
    "rss",
    "pdf",
  ]);

  return str
    .split("-")
    .map((word) =>
      reserved.has(word)
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("")
    .replace("Legacy", "");
}
async function clearDirectory(dirPath) {
  fs.rmSync(dirPath, { recursive: true });
  fs.mkdirSync(dirPath);
}

// Script.
export default (props: MainScriptProps) => {
  const iconsDir = path.join(
    __dirname,
    `../../../packages/${props.framework}/src/svg/icons`,
  );
  clearDirectory(icon_directory[props.framework]);

  // Read the directory and filter only the SVG files
  const svgFiles = fs
    .readdirSync(iconsDir)
    .filter((file) => path.extname(file) === ".svg");

  // Build the output string with the export statements for each SVG icon
  const icons = svgFiles.map((svgFile) => {
    const iconDashName = path.basename(svgFile, ".svg");
    const iconPascalName = dashToPascalCase(iconDashName);
    const svgContent = fs.readFileSync(path.join(iconsDir, svgFile), "utf-8");
    return {
      path: path.join(
        __dirname,
        icon_directory[props.framework],
        `${iconDashName}.tsx`,
      ),
      content: outputIconTemplate(iconPascalName, svgContent),
    };
  });

  // Save & format output file
  icons.forEach(({ path, content }) => {
    fs.writeFileSync(path, content, "utf-8");
  });

  console.log(
    "✅ Conversion finished. Total icons converted: ",
    icons.length || 0,
  );
};
