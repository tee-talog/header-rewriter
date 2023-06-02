import { ApplicationConfig, HeaderRewriteOption } from "../types"

const OPTION_KEY = "HEADER_REWRITE_APPLICATION_CONFIG"

export const saveConfig = (options: HeaderRewriteOption[], enabled = true) => {
  const config = {
    options,
    version: 1,
    enabled,
  }
  chrome.storage.local.set({ [OPTION_KEY]: config })
}

export const loadConfig = async (): Promise<ApplicationConfig> => {
  const value = await chrome.storage.local.get(OPTION_KEY)
  return (
    value?.[OPTION_KEY] ?? {
      options: [],
      version: 1,
      enabled: true,
    }
  )
}
