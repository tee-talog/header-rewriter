import { HeaderRewriteOption } from "../types"

const HEADER_REWRITE_OPTIONS_KEY = "options"

export const saveOptions = (options: HeaderRewriteOption[]) =>
  chrome.storage.local.set({ [HEADER_REWRITE_OPTIONS_KEY]: options })

export const loadOptions = () =>
  chrome.storage.local.get(HEADER_REWRITE_OPTIONS_KEY) as unknown as Promise<
    HeaderRewriteOption[]
  >
