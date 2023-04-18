type RuleId = number

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

type HeaderSetRule = {
  id: RuleId
  regexFilter: string
  keyValue: {
    header: string
    value: string
  }[]
}

export const addHeaderSetRules = async (rules: HeaderSetRule[]) => {
  const addRules = rules.map<chrome.declarativeNetRequest.Rule>(
    ({ id, regexFilter, keyValue }) => {
      const requestHeaders = keyValue.map(({ header, value }) => ({
        operation: chrome.declarativeNetRequest.HeaderOperation.SET,
        header,
        value,
      }))

      return {
        id,
        condition: {
          regexFilter,
        },
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          requestHeaders,
        },
      }
    },
  )

  await chrome.declarativeNetRequest.updateDynamicRules({ addRules })
}

type HeaderRewriteRule = {
  id: RuleId
  regexFilter: string
} & (
  | {
      type: "set"
      keyValue: {
        header: string
        value: string
      }[]
    }
  | {
      type: "remove"
      headers: string[]
    }
)

export const addHeaderRewriteRules = async (rules: HeaderRewriteRule[]) => {
  const addRules = rules.map<chrome.declarativeNetRequest.Rule>((rule) => {
    switch (rule.type) {
      case "set": {
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

      case "remove": {
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

      default: {
        throw new Error(rule satisfies never)
      }
    }
  })

  await chrome.declarativeNetRequest.updateDynamicRules({ addRules })
}

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
