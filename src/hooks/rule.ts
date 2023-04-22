import {
  HeaderRemoveRule,
  HeaderRewriteRule,
  HeaderSetRule,
  RuleId,
} from "../types"

const generateHeaderSetOption = (rule: HeaderSetRule) => {
  const requestHeaders = rule.keyValue.map(({ header, value }) => ({
    operation: chrome.declarativeNetRequest.HeaderOperation.SET,
    header,
    value,
  }))

  return {
    id: rule.id,
    condition: {
      regexFilter: rule.regexFilter,
    },
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders,
    },
  }
}

const generateHeaderRemoveOption = (rule: HeaderRemoveRule) => {
  const requestHeaders = rule.headers.map((header) => ({
    operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
    header,
  }))

  return {
    id: rule.id,
    condition: {
      regexFilter: rule.regexFilter,
    },
    action: {
      type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
      requestHeaders,
    },
  }
}

export const addHeaderRewriteRules = async (rules: HeaderRewriteRule[]) => {
  const addRules = rules.map<chrome.declarativeNetRequest.Rule>((rule) => {
    switch (rule.type) {
      case "set":
        return generateHeaderSetOption(rule)
      case "remove":
        return generateHeaderRemoveOption(rule)
      default:
        const _: never = rule
        throw new Error()
    }
  })

  await chrome.declarativeNetRequest.updateDynamicRules({ addRules })
}

export const removeRules = async (ids: RuleId[]) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids,
  })
}

//
export const addRules = (rules: chrome.declarativeNetRequest.Rule[]) =>
  chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules })
