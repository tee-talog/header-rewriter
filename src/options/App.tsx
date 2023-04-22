import "./App.css"
import RuleList from "./RuleList"
import AddRuleForm from "./AddRuleForm"

const App = () => {
  const onRemove = () => {}
  const onSubmit = () => {}

  return (
    <>
      <header>
        <h1>options</h1>
      </header>

      <main>
        <section>
          <h2>options</h2>
          <RuleList rules={[]} onRemove={onRemove} />
        </section>

        <section>
          <h2>add option</h2>
          <AddRuleForm onSubmit={onSubmit} />
        </section>
      </main>
    </>
  )
}

export default App
