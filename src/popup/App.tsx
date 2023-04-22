import { useEffect, useState } from "react"
import "./App.css"
import { HeaderRewriteOption } from "../types"
import { loadOptions, saveOptions } from "../hooks/storage"
import { addRules, removeRules } from "../hooks/rule"

const convertToType = (
  type: chrome.declarativeNetRequest.HeaderOperation | undefined,
) =>
  type === chrome.declarativeNetRequest.HeaderOperation.SET ? "set" : "remove"

const App = () => {
  const [options, setOptions] = useState<HeaderRewriteOption[]>([])

  // ルールの ON/OFF を切り替える
  const changeEnabled = (id: number, enabled: boolean) => {
    const items = options.map((option) =>
      option.id === id ? { ...option, enabled } : option,
    )
    setOptions(items)
    saveOptions(items)

    if (enabled) {
      const item = options.find((option) => option.id === id)
      if (item) {
        addRules([item.rule])
      }
    } else {
      removeRules([id])
    }
  }

  const load = async () => {
    const items = await loadOptions()
    setOptions(items)
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
            {options.map((option) => (
              <tr key={option.id}>
                <td>{option.name}</td>
                <td>{option.rule.condition.regexFilter}</td>
                <td>
                  {convertToType(
                    option.rule.action.requestHeaders?.[0].operation,
                  )}
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={option.enabled}
                    onChange={() => changeEnabled(option.id, !option.enabled)}
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
