import { JsonValue } from "type-fest"
import { HeaderRewriteOption } from "../types"

const OptionFile: React.FC<{
  onImport: (options: HeaderRewriteOption[]) => void
  onExport: () => void
}> = ({ onImport, onExport }) => {
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
    const options = json as unknown as HeaderRewriteOption[]
    onImport(options)
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
