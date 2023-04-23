import { JsonValue } from "type-fest"
import { HeaderRewriteOption } from "../types"

const OptionFile: React.FC<{
  onImport: (options: HeaderRewriteOption[]) => void
  options: HeaderRewriteOption[]
}> = ({ onImport, options }) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) {
      return
    }
    // 同名ファイルを登録できるように、ファイルの選択を解除する
    event.currentTarget.value = null as any as string

    const text = await file.text()
    const json = JSON.parse(text) as JsonValue
    // TODO validation
    const importedOptions = json as unknown as HeaderRewriteOption[]
    onImport(importedOptions)
  }

  // ファイル書き出し
  const onExport = () => {
    const str = JSON.stringify(options)
    const blob = new Blob([str], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    chrome.downloads.download({ url, filename: "options.json", saveAs: true })
  }

  return (
    <>
      <label>
        Import
        <input type="file" accept="application/json" onChange={onChange} />
      </label>
      <button type="button" onClick={onExport}>
        Export
      </button>
    </>
  )
}

export default OptionFile
