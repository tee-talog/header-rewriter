import { HeaderRewriteOption } from "../types"

const RULE_KEY = "RULE_KEY"

export const saveOptions = (rules: HeaderRewriteOption[]) =>
  chrome.storage.local.set({ [RULE_KEY]: rules })

export const loadOptions = async (): Promise<HeaderRewriteOption[]> => {
  const value = await chrome.storage.local.get(RULE_KEY)
  return value[RULE_KEY] as HeaderRewriteOption[]
}
