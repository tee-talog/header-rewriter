import {
  HeaderRemoveRule,
  HeaderRewriteRule,
  HeaderSetRule,
  RuleId,
} from "../types"

// TODO 削除
export const addRule = async (
  id: RuleId,
  regexFilter: string,
  headerName: string,
  value: string,
) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders: [
            {
              header: headerName,
              operation: chrome.declarativeNetRequest.HeaderOperation.SET,
              value,
            },
          ],
        },
        condition: {
          regexFilter,
        },
        id,
      },
    ],
  })
}

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
        throw new Error(rule satisfies never)
    }
  })

  await chrome.declarativeNetRequest.updateDynamicRules({ addRules })
}

// TODO 削除
export const removeRule = async (id: RuleId) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [id],
  })
}

export const removeRules = async (ids: RuleId[]) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids,
  })
}
