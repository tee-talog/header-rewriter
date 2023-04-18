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
export type HeaderSetOption = {
  type: "set"
  name: string
  regexFilter: string
  keyValue: {
    header: string
    value: string
  }[]
}

export type HeaderRemoveOption = {
  type: "remove"
  name: string
  regexFilter: string
  headers: string[]
}

export type HeaderRewriteOption = HeaderSetOption | HeaderRemoveOption
