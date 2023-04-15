export const addRule = async (
  id: number,
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

export const removeRule = async (id: number) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [id],
  })
}
