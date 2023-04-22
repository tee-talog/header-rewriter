import { useEffect, useState } from "react"
import "./App.css"
import { Rule } from "../types"
import { loadRules } from "../hooks/storage"

const convertToType = (type: chrome.declarativeNetRequest.HeaderOperation) =>
  type === chrome.declarativeNetRequest.HeaderOperation.SET ? "set" : "remove"

const App = () => {
  const [rules, setRules] = useState<Rule[]>([])

  const changeEnabled = (id: number, enabled: boolean) => {
    const items = rules.map((rule) =>
      rule.id === id ? { ...rule, enabled } : rule,
    )
    setRules(items)
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
            {rules.map((rule) => {
              const operation = rule.rule.action.requestHeaders?.[0].operation
              return (
                <tr key={rule.id}>
                  <td>{rule.name}</td>
                  <td>{rule.rule.condition.regexFilter}</td>
                  <td>{operation && convertToType(operation)}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => changeEnabled(rule.id, !rule.enabled)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default App
