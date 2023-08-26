import { useEffect, useState } from "react"
import { HeaderRewriteOption } from "../types"
import { loadConfig, saveConfig } from "../modules/storage"
import { addRules, removeRules } from "../modules/rule"
import clsx from "clsx"
import OptionList from "./OptionList"

const App = () => {
  const [enabledAll, setEnabledAll] = useState(true)
  const [options, setOptions] = useState<HeaderRewriteOption[]>([])

  // ルール全体の ON/OFF を切り替える
  const handleChange = () => {
    const enabledOptions = options.filter((option) => option.enabled)
    if (enabledAll) {
      removeRules(enabledOptions.map(({ id }) => id))
    } else {
      addRules(enabledOptions.map(({ rule }) => rule))
    }

    saveConfig(options, !enabledAll)
    setEnabledAll((val) => !val)
  }

  // ルールの ON/OFF を切り替える
  const changeEnabled = (id: number, enabled: boolean) => {
    const items = options.map((option) =>
      option.id === id ? { ...option, enabled } : option,
    )
    setOptions(items)
    saveConfig(items, enabledAll)

    // 全体が OFF なら実際には切り替えない
    if (!enabledAll) {
      return
    }

    if (enabled) {
      const rules = options
        .filter((option) => option.id === id)
        .map((option) => option.rule)
      addRules(rules)
    } else {
      removeRules([id])
    }
  }

  const load = async () => {
    const { options, enabledAll: enabled } = await loadConfig()
    setOptions(options)
    setEnabledAll(enabled)
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <div className={clsx("min-w-[600px]", "min-h-[100px]", "m-4")}>
      <header>
        <h1 className={clsx("sr-only")}>オプション</h1>
      </header>

      <main className={clsx("w-full", "my-2")}>
        <section className={clsx("my-2")}>
          <label className={clsx("flex", "items-center")}>
            <input
              type="checkbox"
              checked={enabledAll}
              onChange={handleChange}
              className={clsx("mr-1")}
            />
            一括ON/OFF
          </label>
        </section>

        <section>
          <h2 className={clsx("sr-only")}>オプション</h2>
          <OptionList options={options} onChange={changeEnabled} />
        </section>
      </main>
    </div>
  )
}

export default App
