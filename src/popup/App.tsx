import { useEffect, useState } from "react"
import { HeaderRewriteOption } from "../types"
import { loadOptions, saveOptions } from "../hooks/storage"
import { addRules, removeRules } from "../hooks/rule"
import clsx from "clsx"
import OptionList from "./OptionList"

const App = () => {
  const [enabled, setEnabled] = useState(true)
  const [options, setOptions] = useState<HeaderRewriteOption[]>([])

  // ルール全体の ON/OFF を切り替える
  const handleChange = () => {
    const enabledOptions = options.filter((option) => option.enabled)
    if (enabled) {
      removeRules(enabledOptions.map(({ id }) => id))
    } else {
      addRules(enabledOptions.map(({ rule }) => rule))
    }

    setEnabled((val) => !val)
  }

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
        <div>
          <input type="checkbox" checked={enabled} onChange={handleChange} />
        </div>
        <OptionList options={options} onChange={changeEnabled} />
      </main>
    </div>
  )
}

export default App
