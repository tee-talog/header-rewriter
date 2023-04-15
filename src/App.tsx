import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [domain, setDomain] = useState("")
  const inputDomain = (e: any) => {
    setDomain(e.target.value)
  }

  useEffect(() => {
    updateNowBlockedDomains()
  }, [])

  const [nowBlockedRules, setNowBlockedRules] = useState<
    chrome.declarativeNetRequest.Rule[]
  >([])

  const updateNowBlockedDomains = async () => {
    const rules = await chrome.declarativeNetRequest.getDynamicRules()
    setNowBlockedRules(rules)
  }

  const addRule = (domainRegExp: string) => {
    chrome.declarativeNetRequest.updateDynamicRules({
      addRules: [
        {
          action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
          condition: {
            regexFilter: domainRegExp,
          },
          id: 2,
        },
      ],
    })
    updateNowBlockedDomains()
  }

  const removeRule = (id: number) => {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [id],
    })
    updateNowBlockedDomains()
  }

  return (
    <div className="App" style={{ width: "600px" }}>
      <div>
        <form>
          <label>
            Domain <input type="text" value={domain} onChange={inputDomain} />
          </label>
          <button type="button" onClick={() => addRule(domain)}>
            Add Block Domain
          </button>
        </form>
      </div>

      <div>
        <ul>
          {nowBlockedRules.map((r) => (
            <li key={r.id}>
              <label>
                {JSON.stringify(r)}
                <button type="button" onClick={() => removeRule(r.id)}>
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
