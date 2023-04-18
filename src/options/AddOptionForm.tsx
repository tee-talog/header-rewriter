const AddRuleForm = () => (
  <form>
    <label>
      rule name
      <input type="text" />
    </label>
    <label>
      regexp
      <input type="text" />
    </label>
    <ul>
      <li>
        <label>
          header
          <input type="text" />
        </label>
        <label>
          value
          <input type="text" />
        </label>
        <button type="button">+</button>
      </li>
    </ul>
    <button type="submit">add</button>
  </form>
)

export default AddRuleForm
