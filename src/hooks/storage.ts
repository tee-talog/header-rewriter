import { Rule } from "../types"

const RULE_KEY = "RULE_KEY"

export const saveRules = (rules: Rule[]) =>
  chrome.storage.local.set({ [RULE_KEY]: rules })

export const loadRules = async (): Promise<Rule[]> => {
  const value = await chrome.storage.local.get(RULE_KEY)
  return value[RULE_KEY] as Rule[]
}
