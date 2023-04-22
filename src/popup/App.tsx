import { useEffect, useState } from "react"
import "./App.css"
import { HeaderRewriteRule } from "../types"
import { loadRules, saveRules } from "../hooks/storage"
import { addRules, removeRules } from "../hooks/rule"

const convertToType = (
  type: chrome.declarativeNetRequest.HeaderOperation | undefined,
) =>
  type === chrome.declarativeNetRequest.HeaderOperation.SET ? "set" : "remove"

const App = () => {
  const [rules, setRules] = useState<HeaderRewriteRule[]>([])

  // ルールの ON/OFF を切り替える
  const changeEnabled = (id: number, enabled: boolean) => {
    const items = rules.map((rule) =>
      rule.id === id ? { ...rule, enabled } : rule,
    )
    setRules(items)
    saveRules(items)

    if (enabled) {
      const item = rules.find((rule) => rule.id === id)
      if (item) {
        console.log(item)
        addRules([item.rule])
      }
    } else {
      removeRules([id])
    }
  }

  const load = async () => {
    const items = await loadRules()
    setRules(items)
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <div className="App" style={{ width: "600px" }}>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>pattern</th>
              <th>type</th>
              <th>on/off</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr key={rule.id}>
                <td>{rule.name}</td>
                <td>{rule.rule.condition.regexFilter}</td>
                <td>
                  {convertToType(
                    rule.rule.action.requestHeaders?.[0].operation,
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={() => changeEnabled(rule.id, !rule.enabled)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default App
