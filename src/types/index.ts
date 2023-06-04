export type HeaderRewriteOption = {
  name: string
  id: number
  rule: chrome.declarativeNetRequest.Rule
  enabled: boolean
}

export type ApplicationConfig = {
  version: 1
  options: HeaderRewriteOption[]
  enabledAll: boolean
}
