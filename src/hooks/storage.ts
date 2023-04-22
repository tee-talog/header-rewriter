import { HeaderRewriteRule } from "../types"

const RULE_KEY = "RULE_KEY"

export const saveRules = (rules: HeaderRewriteRule[]) =>
  chrome.storage.local.set({ [RULE_KEY]: rules })

export const loadRules = async (): Promise<HeaderRewriteRule[]> => {
  const value = await chrome.storage.local.get(RULE_KEY)
  return value[RULE_KEY] as HeaderRewriteRule[]
}
