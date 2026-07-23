"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Loader2,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import { useId, useMemo, useState } from "react";
import type { SiteIconKey, SiteImageKey } from "@/lib/site-content";

export type SiteContentPrimitive = string | number | boolean | null;

export type SiteContentValue =
  | SiteContentPrimitive
  | SiteContentValue[]
  | { [key: string]: SiteContentValue };

export type SiteContent = Record<string, SiteContentValue>;

export interface AdminContentEditorProps {
  initialContent: SiteContent;
  templateContent?: SiteContent;
  endpoint?: string;
  siteHref?: string;
  logoutHref?: string;
  title?: string;
  description?: string;
}

type ContentPath = Array<string | number>;
type SaveState =
  | { status: "idle"; message: string }
  | { status: "saving"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

interface ValueEditorProps {
  value: SiteContentValue;
  templateValue?: SiteContentValue;
  variantTemplateCatalog: VariantTemplateCatalog;
  label: string;
  path: ContentPath;
  idPrefix: string;
  onChange: (path: ContentPath, value: SiteContentValue) => void;
  showGroupLabel?: boolean;
}

type VariantTemplateCatalog = Record<
  string,
  Record<string, SiteContentValue>
>;

const COMMON_ACRONYMS = new Set([
  "api",
  "cta",
  "faq",
  "id",
  "seo",
  "url",
  "uesc",
]);

const MULTILINE_KEY_PATTERN =
  /address|answer|bio|body|caption|content|copy|description|message|quote|summary|text/i;

const IMAGE_KEY_OPTIONS = [
  "uesc-logo",
  "campus-aerial",
  "campus-garden",
  "college-reception",
  "computer-lab",
  "open-graph",
] as const satisfies readonly SiteImageKey[];
const ICON_KEY_OPTIONS = [
  "arrow-right",
  "award",
  "book-marked",
  "book-open",
  "briefcase",
  "building",
  "clipboard-list",
  "download",
  "flask",
  "graduation-cap",
  "lightbulb",
  "mail",
  "map-pin",
  "phone",
  "rocket",
  "settings",
  "sparkles",
  "trophy",
  "wrench",
] as const satisfies readonly SiteIconKey[];
const CAREER_TONES = ["blue", "emerald", "orange", "red", "navy"] as const;
const EXPERIENCE_TONES = [
  "blue",
  "emerald",
  "orange",
  "red",
  "indigo",
  "purple",
  "teal",
] as const;
const CHANGE_FREQUENCIES = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

interface SelectConfiguration {
  options: readonly string[];
  locked?: boolean;
}

function cloneContent<T extends SiteContentValue>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneContent(item)) as T;
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cloneContent(child)]),
    ) as T;
  }

  return value;
}

function isContentObject(value: unknown): value is SiteContent {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function contentMatches(left: SiteContent, right: SiteContent) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function friendlyLabel(key: string) {
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "Untitled";
  }

  return words
    .map((word) => {
      const lowerWord = word.toLowerCase();
      if (COMMON_ACRONYMS.has(lowerWord)) {
        return lowerWord.toUpperCase();
      }
      return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

function pathId(path: ContentPath) {
  return path
    .map((part) => String(part))
    .join("-")
    .replace(/[^a-zA-Z0-9_-]/g, "-");
}

function normalizedPath(path: ContentPath) {
  return path
    .map((part) => (typeof part === "number" ? "*" : part))
    .join(".");
}

function isNullableHrefPath(path: ContentPath) {
  return normalizedPath(path) === "locations.cards.*.entries.*.href";
}

function buildVariantTemplateCatalog(template: SiteContent) {
  const catalog: VariantTemplateCatalog = {};

  const visit = (value: SiteContentValue, path: ContentPath) => {
    if (Array.isArray(value)) {
      const variants: Record<string, SiteContentValue> = {};

      value.forEach((item) => {
        if (
          isContentObject(item) &&
          typeof item.kind === "string" &&
          variants[item.kind] === undefined
        ) {
          variants[item.kind] = cloneContent(item);
        }
      });

      if (Object.keys(variants).length > 0) {
        const catalogKey = normalizedPath(path);
        catalog[catalogKey] = {
          ...(catalog[catalogKey] ?? {}),
          ...variants,
        };
      }

      value.forEach((item, index) => visit(item, [...path, index]));
      return;
    }

    if (isContentObject(value)) {
      Object.entries(value).forEach(([key, child]) =>
        visit(child, [...path, key]),
      );
    }
  };

  visit(template, []);
  return catalog;
}

function replaceAtPath(
  root: SiteContentValue,
  path: ContentPath,
  nextValue: SiteContentValue,
): SiteContentValue {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(root) && typeof head === "number") {
    const nextArray = [...root];
    nextArray[head] = replaceAtPath(nextArray[head], tail, nextValue);
    return nextArray;
  }

  if (isContentObject(root) && typeof head === "string") {
    return {
      ...root,
      [head]: replaceAtPath(root[head], tail, nextValue),
    };
  }

  return root;
}

function createUniqueIdentifier(baseId: string, items: SiteContentValue[]) {
  const existingIds = new Set(
    items.flatMap((item) =>
      isContentObject(item) && typeof item.id === "string" ? [item.id] : [],
    ),
  );
  const normalizedBase =
    baseId
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/^[^a-z]+/, "") || "item";

  let copyNumber = 1;
  while (true) {
    const suffix = copyNumber === 1 ? "-copy" : `-copy-${copyNumber}`;
    const availableLength = Math.max(1, 80 - suffix.length);
    const prefix =
      normalizedBase.slice(0, availableLength).replace(/-+$/g, "") || "item";
    const candidate = `${prefix}${suffix}`;

    if (!existingIds.has(candidate)) {
      return candidate;
    }
    copyNumber += 1;
  }
}

function newArrayItem(
  template: SiteContentValue,
  items: SiteContentValue[],
) {
  const nextItem = cloneContent(template);
  if (isContentObject(nextItem) && typeof nextItem.id === "string") {
    return {
      ...nextItem,
      id: createUniqueIdentifier(nextItem.id, items),
    };
  }

  return nextItem;
}

function templateForArrayItem(
  templateItems: SiteContentValue[],
  item: SiteContentValue,
  index: number,
) {
  if (isContentObject(item)) {
    if (typeof item.id === "string") {
      const idMatch = templateItems.find(
        (candidate) =>
          isContentObject(candidate) && candidate.id === item.id,
      );
      if (idMatch !== undefined) {
        return idMatch;
      }
    }

    if (typeof item.kind === "string") {
      const kindMatch = templateItems.find(
        (candidate) =>
          isContentObject(candidate) && candidate.kind === item.kind,
      );
      if (kindMatch !== undefined) {
        return kindMatch;
      }
    }
  } else {
    const valueMatch = templateItems.find((candidate) => candidate === item);
    if (valueMatch !== undefined) {
      return valueMatch;
    }
  }

  return templateItems[index] ?? templateItems[0];
}

function isProtectedOrderPath(path: ContentPath) {
  const finalKey = path[path.length - 1];
  return (
    finalKey === "mainSectionOrder" || finalKey === "footerSectionOrder"
  );
}

function selectConfigurationForPath(
  path: ContentPath,
  value: string,
): SelectConfiguration | null {
  const sourceKey = path[path.length - 1];
  const parentKey = path[path.length - 2];
  const topLevelKey = path[0];

  if (sourceKey === "iconKey") {
    return { options: ICON_KEY_OPTIONS };
  }

  if (
    sourceKey === "imageKey" ||
    parentKey === "imageKeys" ||
    (sourceKey === "key" && (parentKey === "image" || parentKey === "logo"))
  ) {
    return { options: IMAGE_KEY_OPTIONS };
  }

  if (sourceKey === "tone") {
    return {
      options:
        topLevelKey === "careerDevelopment"
          ? CAREER_TONES
          : EXPERIENCE_TONES,
    };
  }

  if (sourceKey === "changeFrequency") {
    return { options: CHANGE_FREQUENCIES };
  }

  // Discriminators and schema literals cannot be changed safely without
  // replacing the surrounding object shape, so expose them as locked selects.
  if (sourceKey === "kind" || sourceKey === "type" || sourceKey === "card") {
    return { options: [value], locked: true };
  }

  return null;
}

function arrayItemLabel(item: SiteContentValue, index: number) {
  if (isContentObject(item)) {
    for (const key of ["title", "name", "label", "heading"]) {
      const candidate = item[key];
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate;
      }
    }
  }

  return `Item ${index + 1}`;
}

function errorMessageFromPayload(payload: unknown, fallback: string) {
  if (isContentObject(payload)) {
    for (const key of ["message", "error"]) {
      const candidate = payload[key];
      if (typeof candidate === "string" && candidate.trim()) {
        return candidate;
      }
    }
  }

  return fallback;
}

async function readResponsePayload(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    return null;
  }
}

function NumberEditor({
  id,
  label,
  value,
  onCommit,
}: {
  id: string;
  label: string;
  value: number;
  onCommit: (value: number) => void;
}) {
  const [inputValue, setInputValue] = useState(String(value));
  const [lastValue, setLastValue] = useState(value);

  if (value !== lastValue) {
    setLastValue(value);
    if (
      inputValue.trim() === "" ||
      !Number.isFinite(Number(inputValue)) ||
      Number(inputValue) !== value
    ) {
      setInputValue(String(value));
    }
  }

  const commitValue = () => {
    const parsedValue = Number(inputValue);
    if (inputValue.trim() === "" || !Number.isFinite(parsedValue)) {
      setInputValue(String(value));
      return;
    }

    onCommit(parsedValue);
    setInputValue(String(parsedValue));
  };

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={inputValue}
        onChange={(event) => {
          const nextInputValue = event.target.value;
          setInputValue(nextInputValue);

          const parsedValue = Number(nextInputValue);
          if (
            nextInputValue.trim() !== "" &&
            Number.isFinite(parsedValue)
          ) {
            onCommit(parsedValue);
          }
        }}
        onBlur={commitValue}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
          if (event.key === "Escape") {
            event.preventDefault();
            setInputValue(String(value));
          }
        }}
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20"
      />
    </div>
  );
}

function PrimitiveEditor({
  value,
  label,
  path,
  idPrefix,
  onChange,
}: ValueEditorProps & { value: SiteContentPrimitive }) {
  const id = `${idPrefix}-${pathId(path)}`;
  const sourceKey = String(path[path.length - 1] ?? "");

  if (sourceKey === "href" && isNullableHrefPath(path)) {
    const hasLink = typeof value === "string";
    const modeId = `${id}-mode`;

    return (
      <div className="space-y-2">
        <label
          htmlFor={modeId}
          className="block text-sm font-semibold text-slate-800"
        >
          {label}
        </label>
        <select
          id={modeId}
          value={hasLink ? "link" : "none"}
          onChange={(event) =>
            onChange(path, event.target.value === "link" ? "" : null)
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20"
        >
          <option value="none">No link</option>
          <option value="link">Add a link</option>
        </select>
        {hasLink ? (
          <input
            id={id}
            type="text"
            aria-label={`${label} address`}
            value={value}
            placeholder="https://example.com or /page"
            onChange={(event) => onChange(path, event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20"
          />
        ) : null}
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-center justify-between gap-5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <label htmlFor={id} className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={value}
          onClick={() => onChange(path, !value)}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] focus-visible:ring-offset-2 ${
            value
              ? "border-[#0A3073] bg-[#0A3073]"
              : "border-slate-300 bg-slate-200"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              value ? "translate-x-6" : "translate-x-1"
            }`}
          />
          <span className="sr-only">{value ? "Enabled" : "Disabled"}</span>
        </button>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <NumberEditor
        id={id}
        label={label}
        value={value}
        onCommit={(nextValue) => onChange(path, nextValue)}
      />
    );
  }

  if (value === null) {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
        <select
          id={id}
          value=""
          onChange={(event) => {
            const valueType = event.target.value;
            if (valueType === "string") onChange(path, "");
            if (valueType === "number") onChange(path, 0);
            if (valueType === "boolean") onChange(path, false);
            if (valueType === "array") onChange(path, []);
            if (valueType === "object") onChange(path, {});
          }}
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20"
        >
          <option value="">Empty — choose a content type</option>
          <option value="string">Text</option>
          <option value="number">Number</option>
          <option value="boolean">Toggle</option>
          <option value="array">List</option>
          <option value="object">Group</option>
        </select>
      </div>
    );
  }

  const selectConfiguration = selectConfigurationForPath(path, value);
  if (selectConfiguration) {
    const options = selectConfiguration.options.includes(value)
      ? selectConfiguration.options
      : [value, ...selectConfiguration.options];
    const helpId = `${id}-help`;

    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
        <select
          id={id}
          value={value}
          disabled={selectConfiguration.locked}
          aria-describedby={selectConfiguration.locked ? helpId : undefined}
          onChange={(event) => onChange(path, event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-600"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {friendlyLabel(option)}
            </option>
          ))}
        </select>
        {selectConfiguration.locked ? (
          <p id={helpId} className="text-xs leading-5 text-slate-500">
            This value is fixed by the content schema.
          </p>
        ) : null}
      </div>
    );
  }

  const isMultiline =
    value.includes("\n") ||
    value.length > 80 ||
    MULTILINE_KEY_PATTERN.test(sourceKey);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
        {label}
      </label>
      {isMultiline ? (
        <textarea
          id={id}
          value={value}
          rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))}
          onChange={(event) => onChange(path, event.target.value)}
          className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm leading-6 text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(event) => onChange(path, event.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm transition focus:border-[#0A3073] focus:outline-none focus:ring-2 focus:ring-[#0A3073]/20"
        />
      )}
    </div>
  );
}

function ObjectEditor({
  value,
  templateValue,
  variantTemplateCatalog,
  label,
  path,
  idPrefix,
  onChange,
  showGroupLabel = true,
}: ValueEditorProps & { value: SiteContent }) {
  const entries = Object.entries(value);
  const templateObject = isContentObject(templateValue)
    ? templateValue
    : undefined;
  const content = (
    <div className="grid gap-5">
      {entries.map(([key, child]) => (
        <ValueEditor
          key={key}
          value={child}
          templateValue={templateObject?.[key]}
          variantTemplateCatalog={variantTemplateCatalog}
          label={friendlyLabel(key)}
          path={[...path, key]}
          idPrefix={idPrefix}
          onChange={onChange}
        />
      ))}
      {entries.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-500">
          This group has no editable fields.
        </p>
      ) : null}
    </div>
  );

  if (!showGroupLabel) {
    return content;
  }

  return (
    <fieldset className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
      <legend className="px-2 font-serif text-lg font-semibold text-slate-950">
        {label}
      </legend>
      {content}
    </fieldset>
  );
}

function ArrayEditor({
  value,
  templateValue,
  variantTemplateCatalog,
  label,
  path,
  idPrefix,
  onChange,
  showGroupLabel = true,
}: ValueEditorProps & { value: SiteContentValue[] }) {
  const templateItems = Array.isArray(templateValue) ? templateValue : [];
  const itemTemplate = templateItems[0] ?? value[0];
  const variantTemplates =
    variantTemplateCatalog[normalizedPath(path)] ?? {};
  const variantTemplateEntries = Object.entries(variantTemplates);
  const availableTemplates = [
    ...templateItems,
    ...variantTemplateEntries.map(([, template]) => template),
  ];
  const protectedOrder = isProtectedOrderPath(path);
  const addItem = (template: SiteContentValue | undefined = itemTemplate) => {
    if (template === undefined || protectedOrder) {
      return;
    }
    onChange(path, [...value, newArrayItem(template, value)]);
  };

  const content = (
    <div className="space-y-4">
      {value.map((item, index) => {
        const itemName = arrayItemLabel(item, index);
        return (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <p className="min-w-0 truncate text-sm font-bold text-slate-800">
                {itemName}
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => {
                    const nextItems = [...value];
                    [nextItems[index - 1], nextItems[index]] = [
                      nextItems[index],
                      nextItems[index - 1],
                    ];
                    onChange(path, nextItems);
                  }}
                  aria-label={`Move ${itemName} up`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-[#0A3073] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  disabled={index === value.length - 1}
                  onClick={() => {
                    const nextItems = [...value];
                    [nextItems[index], nextItems[index + 1]] = [
                      nextItems[index + 1],
                      nextItems[index],
                    ];
                    onChange(path, nextItems);
                  }}
                  aria-label={`Move ${itemName} down`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-[#0A3073] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
                {!protectedOrder ? (
                  <button
                    type="button"
                    onClick={() =>
                      onChange(
                        path,
                        value.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    aria-label={`Remove ${itemName}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
            {protectedOrder && typeof item === "string" ? (
              <p className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700">
                {friendlyLabel(item)}
              </p>
            ) : (
              <ValueEditor
                value={item}
                templateValue={templateForArrayItem(
                  availableTemplates,
                  item,
                  index,
                )}
                variantTemplateCatalog={variantTemplateCatalog}
                label={itemName}
                path={[...path, index]}
                idPrefix={idPrefix}
                onChange={onChange}
                showGroupLabel={false}
              />
            )}
          </div>
        );
      })}

      {value.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-5 text-sm text-slate-500">
          {protectedOrder
            ? "This fixed order list is empty."
            : "This list is empty. Add an item to begin."}
        </p>
      ) : null}

      {protectedOrder ? (
        <p className="text-xs leading-5 text-slate-500">
          This list has a fixed set of sections. Use the arrow controls to
          change their order.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {variantTemplateEntries.length > 1 ? (
              variantTemplateEntries.map(([kind, template]) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => addItem(template)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#0A3073]/25 bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#0A3073] transition hover:border-[#0A3073]/40 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] focus-visible:ring-offset-2"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add {friendlyLabel(kind)}
                </button>
              ))
            ) : (
              <button
                type="button"
                onClick={() => addItem()}
                disabled={itemTemplate === undefined}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#0A3073]/25 bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#0A3073] transition hover:border-[#0A3073]/40 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add item
              </button>
            )}
          </div>
          {itemTemplate === undefined ? (
            <p className="text-xs leading-5 text-slate-500">
              Add is unavailable because this list has no content template.
            </p>
          ) : null}
        </>
      )}
    </div>
  );

  if (!showGroupLabel) {
    return content;
  }

  return (
    <fieldset className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
      <legend className="px-2 font-serif text-lg font-semibold text-slate-950">
        {label}
      </legend>
      {content}
    </fieldset>
  );
}

function ValueEditor(props: ValueEditorProps) {
  if (Array.isArray(props.value)) {
    return <ArrayEditor {...props} value={props.value} />;
  }

  if (isContentObject(props.value)) {
    return <ObjectEditor {...props} value={props.value} />;
  }

  return <PrimitiveEditor {...props} value={props.value} />;
}

function StatusNotice({
  state,
  isDirty,
}: {
  state: SaveState;
  isDirty: boolean;
}) {
  const isError = state.status === "error";
  const isSuccess = state.status === "success" && !isDirty;
  const isSaving = state.status === "saving";
  const message =
    state.status === "success" && isDirty
      ? "Published. New edits remain unpublished."
      : state.message;

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`flex min-h-11 items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm ${
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : isSuccess
            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
            : isSaving
              ? "border-blue-200 bg-blue-50 text-[#0A3073]"
              : isDirty
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {isError ? (
        <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : isSuccess ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : isSaving ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
      ) : isDirty ? (
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500"
          aria-hidden="true"
        />
      ) : (
        <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      )}
      <span>{message}</span>
    </div>
  );
}

export default function AdminContentEditor({
  initialContent,
  templateContent: suppliedTemplateContent,
  endpoint = "/api/admin/content",
  siteHref = "/",
  logoutHref = "/api/admin/logout",
  title = "Website content",
  description = "Update the public website content, review your changes, and publish when ready.",
}: AdminContentEditorProps) {
  const componentId = useId().replace(/:/g, "");
  const [templateContent] = useState<SiteContent>(() =>
    cloneContent(suppliedTemplateContent ?? initialContent),
  );
  const variantTemplateCatalog = useMemo(
    () => buildVariantTemplateCatalog(templateContent),
    [templateContent],
  );
  const [savedContent, setSavedContent] = useState<SiteContent>(() =>
    cloneContent(initialContent),
  );
  const [draftContent, setDraftContent] = useState<SiteContent>(() =>
    cloneContent(initialContent),
  );
  const sectionKeys = useMemo(() => Object.keys(draftContent), [draftContent]);
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(Object.keys(initialContent).slice(0, 1)),
  );
  const [saveState, setSaveState] = useState<SaveState>({
    status: "idle",
    message: "All changes are saved.",
  });

  const isDirty = useMemo(
    () => !contentMatches(draftContent, savedContent),
    [draftContent, savedContent],
  );
  const isSaving = saveState.status === "saving";

  const updateValue = (path: ContentPath, value: SiteContentValue) => {
    setDraftContent(
      (current) => replaceAtPath(current, path, value) as SiteContent,
    );
    setSaveState((current) =>
      current.status === "saving"
        ? current
        : {
            status: "idle",
            message: "You have unpublished changes.",
          },
    );
  };

  const resetToSaved = () => {
    setDraftContent(cloneContent(savedContent));
    setSaveState({
      status: "idle",
      message: "Changes reset to the last published version.",
    });
  };

  const publish = async () => {
    if (!isDirty || isSaving) {
      return;
    }

    const contentToPublish = cloneContent(draftContent);
    setSaveState({
      status: "saving",
      message: "Publishing your changes…",
    });

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: contentToPublish }),
      });
      const payload = await readResponsePayload(response);

      if (!response.ok) {
        throw new Error(
          errorMessageFromPayload(
            payload,
            `Publishing failed with status ${response.status}.`,
          ),
        );
      }

      const responseContent =
        isContentObject(payload) && isContentObject(payload.content)
          ? cloneContent(payload.content)
          : contentToPublish;

      setSavedContent(responseContent);
      setDraftContent((current) =>
        contentMatches(current, contentToPublish)
          ? cloneContent(responseContent)
          : current,
      );
      setSaveState({
        status: "success",
        message: "Changes published successfully.",
      });
    } catch (error) {
      setSaveState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while publishing.",
      });
    }
  };

  const toggleSection = (sectionKey: string) => {
    setOpenSections((current) => {
      const next = new Set(current);
      if (next.has(sectionKey)) {
        next.delete(sectionKey);
      } else {
        next.add(sectionKey);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f6f8] font-sans text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0A3073]">
                UESC administration
              </p>
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                {description}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:flex xl:flex-wrap xl:justify-end">
              <a
                href={siteHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#0A3073]/40 hover:text-[#0A3073] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] focus-visible:ring-offset-2"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                View site
              </a>
              <form action={logoutHref} method="post">
                <button
                  type="submit"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:px-8 lg:py-8">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-xl font-semibold text-slate-950">
                Content sections
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Open a section to edit its fields.
              </p>
            </div>
            {sectionKeys.length > 1 ? (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setOpenSections(new Set(sectionKeys))}
                  className="min-h-10 rounded-lg px-3 text-sm font-semibold text-[#0A3073] transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073]"
                >
                  Expand all
                </button>
                <button
                  type="button"
                  onClick={() => setOpenSections(new Set())}
                  className="min-h-10 rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073]"
                >
                  Collapse all
                </button>
              </div>
            ) : null}
          </div>

          {sectionKeys.map((sectionKey) => {
            const isOpen = openSections.has(sectionKey);
            const buttonId = `${componentId}-${pathId([sectionKey])}-button`;
            const panelId = `${componentId}-${pathId([sectionKey])}-panel`;

            return (
              <section
                key={sectionKey}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <h2>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleSection(sectionKey)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A3073] sm:px-6"
                  >
                    <span className="font-serif text-xl font-semibold text-slate-950">
                      {friendlyLabel(sectionKey)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h2>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="border-t border-slate-200 bg-slate-50/40 px-4 py-5 sm:px-6 sm:py-6"
                >
                  <ValueEditor
                    value={draftContent[sectionKey]}
                    templateValue={templateContent[sectionKey]}
                    variantTemplateCatalog={variantTemplateCatalog}
                    label={friendlyLabel(sectionKey)}
                    path={[sectionKey]}
                    idPrefix={componentId}
                    onChange={updateValue}
                    showGroupLabel={false}
                  />
                </div>
              </section>
            );
          })}

          {sectionKeys.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <h2 className="font-serif text-xl font-semibold text-slate-900">
                No content sections
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Supply at least one top-level section to begin editing.
              </p>
            </div>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div>
              <h2 className="font-serif text-xl font-semibold text-slate-950">
                Publishing
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Publish once you have reviewed every change.
              </p>
            </div>

            <StatusNotice state={saveState} isDirty={isDirty} />

            <div className="grid gap-2">
              <button
                type="button"
                onClick={publish}
                disabled={!isDirty || isSaving}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0A3073] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#08275f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )}
                {isSaving ? "Publishing…" : "Publish"}
              </button>
              <button
                type="button"
                onClick={resetToSaved}
                disabled={!isDirty || isSaving}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A3073] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset to saved
              </button>
            </div>

            <p className="border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
              Publishing updates the saved website content. Viewing the site opens
              a new tab so your edits remain here.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
