import { useEffect, useState } from "react"
import { HeaderRewriteOption } from "../types"
import { loadOptions, saveOptions } from "../hooks/storage"
import { addRules, removeRules } from "../hooks/rule"
import clsx from "clsx"

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
    <div className={clsx("min-w-[600px]", "min-h-[100px]", "m-4")}>
      <header>
        <h1 className={clsx("sr-only")}>options</h1>
      </header>

      <main className={clsx("w-full", "my-2")}>
        <table className={clsx("w-full")}>
          <thead className={clsx("my-2")}>
            <tr className={clsx("border-b", "leading-8")}>
              <th className={clsx("text-xl", "font-normal", "text-left")}>
                name
              </th>
              <th className={clsx("text-xl", "font-normal", "text-left")}>
                pattern
              </th>
              <th className={clsx("text-xl", "font-normal", "w-20")}>type</th>
              <th className={clsx("text-xl", "font-normal", "w-20")}>on/off</th>
            </tr>
          </thead>

          <tbody>
            {options.map((option) => (
              <tr key={option.id} className={clsx("border-b", "leading-8")}>
                <td className={clsx("text-base")}>{option.name}</td>
                <td className={clsx("text-base")}>
                  {option.rule.condition.regexFilter}
                </td>
                <td className={clsx("text-base", "text-center")}>
                  {convertToType(
                    option.rule.action.requestHeaders?.[0].operation,
                  )}
                </td>
                <td className={clsx("text-base", "text-center")}>
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
