// 拡張機能に渡される書き換えルール
export type RuleId = number

export type HeaderSetRule = {
  type: "set"
  id: RuleId
  regexFilter: string
  keyValue: {
    header: string
    value: string
  }[]
}

export type HeaderRemoveRule = {
  type: "remove"
  id: RuleId
  regexFilter: string
  headers: string[]
}

export type HeaderRewriteRule = HeaderSetRule | HeaderRemoveRule

// ユーザーが設定するオプション
export type UuidString = ReturnType<typeof crypto.randomUUID>

export type HeaderSetOption = {
  id: UuidString
  type: "set"
  name: string
  regexFilter: string
  keyValue: {
    header: string
    value: string
  }[]
}

export type HeaderRemoveOption = {
  id: UuidString
  type: "remove"
  name: string
  regexFilter: string
  headers: string[]
}

export type HeaderRewriteOption = HeaderSetOption | HeaderRemoveOption

// TODO
// HeaderRewriteRule にリネーム
export type Rule = {
  name: string
  id: number
  rule: chrome.declarativeNetRequest.Rule
}
