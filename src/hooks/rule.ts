export const addRules = (rules: chrome.declarativeNetRequest.Rule[]) =>
  chrome.declarativeNetRequest.updateDynamicRules({ addRules: rules })

export const removeRules = async (ids: number[]) => {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids,
  })
}
