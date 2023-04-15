import { useEffect, useState } from "react"
import { addRule, removeRule } from "../hooks/rule"
import "./App.css"

function App() {
  const [regExp, setRegExp] = useState("")
  const inputRegExp = (e: any) => {
    setRegExp(e.target.value)
  }

  useEffect(() => {
    updateNowBlockedDomains()
  }, [])

  const [enabledRules, setEnabledRules] = useState<
    chrome.declarativeNetRequest.Rule[]
  >([])

  const updateNowBlockedDomains = async () => {
    const rules = await chrome.declarativeNetRequest.getDynamicRules()
    setEnabledRules(rules)
  }

  const onAdd = async () => {
    await addRule(1, regExp, "z-test-header", "test-desu")
    updateNowBlockedDomains()
  }

  const onRemove = async (id: number) => {
    await removeRule(id)
    updateNowBlockedDomains()
  }

  return (
    <div className="App" style={{ width: "600px" }}>
      <div>
        <form>
          <label>
            Domain <input type="text" value={regExp} onChange={inputRegExp} />
          </label>
          <button type="button" onClick={onAdd}>
            Add Block Domain
          </button>
        </form>
      </div>

      <div>
        <ul>
          {enabledRules.map((r) => (
            <li key={r.id}>
              <label>
                {JSON.stringify(r)}
                <button type="button" onClick={() => onRemove(r.id)}>
                  Remove
                </button>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
