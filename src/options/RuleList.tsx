import React from "react"
import { HeaderRewriteRule } from "../types"

const RuleList: React.FC<{
  rules: HeaderRewriteRule[]
  onRemove: (id: number) => void
}> = ({ rules, onRemove }) => {
  const ListItem: React.FC<{ rule: chrome.declarativeNetRequest.Rule }> = ({
    rule,
  }) => (
    <li>
      {rule.action.requestHeaders?.[0].operation ===
      chrome.declarativeNetRequest.HeaderOperation.SET
        ? "set"
        : "remove"}
    </li>
  )

  return (
    <table>
      <tbody>
        {rules.map((rule) => (
          <tr key={rule.id}>
            <td>option name: {rule.name}</td>
            <td>regexp: {rule.rule.condition.regexFilter}</td>
            <td>
              <ul>
                <ListItem rule={rule.rule} />
              </ul>
            </td>
            <td>
              <button type="button" onClick={() => onRemove(rule.id)}>
                remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RuleList
