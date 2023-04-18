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
