import { HeaderRewriteOption } from "../types"

const OPTION_KEY = "OPTION_KEY"

export const saveOptions = (options: HeaderRewriteOption[]) =>
  chrome.storage.local.set({ [OPTION_KEY]: options })

export const loadOptions = async (): Promise<HeaderRewriteOption[]> => {
  const value = await chrome.storage.local.get(OPTION_KEY)
  return (value[OPTION_KEY] ?? []) as HeaderRewriteOption[]
}
