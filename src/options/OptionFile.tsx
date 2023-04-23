const OptionFile: React.FC<{
  onImport: () => void
  onExport: () => void
}> = ({ onImport, onExport }) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    onImport()
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
