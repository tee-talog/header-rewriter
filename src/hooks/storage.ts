import { HeaderRewriteOption } from "../types"

const HEADER_REWRITE_OPTIONS_KEY = "options"

export const saveOptions = (options: HeaderRewriteOption[]) =>
  chrome.storage.local.set({ [HEADER_REWRITE_OPTIONS_KEY]: options })

export const loadOptions = async () => {
  const value = await chrome.storage.local.get(HEADER_REWRITE_OPTIONS_KEY)
  return (value[HEADER_REWRITE_OPTIONS_KEY] ?? []) as Promise<
    HeaderRewriteOption[]
  >
}
