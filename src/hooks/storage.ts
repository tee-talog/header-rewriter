import { HeaderRewriteOption, Rule } from "../types"

const HEADER_REWRITE_OPTIONS_KEY = "options"

export const saveOptions = (options: HeaderRewriteOption[]) =>
  chrome.storage.local.set({ [HEADER_REWRITE_OPTIONS_KEY]: options })

export const loadOptions = async () => {
  const value = await chrome.storage.local.get(HEADER_REWRITE_OPTIONS_KEY)
  return (value[HEADER_REWRITE_OPTIONS_KEY] ?? []) as Promise<
    HeaderRewriteOption[]
  >
}

//
const RULE_KEY = "RULE_KEY"

export const saveRules = (rules: Rule[]) =>
  chrome.storage.local.set({ [RULE_KEY]: rules })

export const loadRules = async (): Promise<Rule[]> => {
  const value = await chrome.storage.local.get(RULE_KEY)
  return value as Rule[]
}
