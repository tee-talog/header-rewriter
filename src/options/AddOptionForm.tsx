import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  ruleName: string
  regExp: string
  header: string
  value: string
}

const AddRuleForm: React.FC<{
  onSubmit: SubmitHandler<Inputs>
}> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        rule name
        <input type="text" {...register("ruleName", { required: true })} />
      </label>
      <label>
        regexp
        <input type="text" {...register("regExp", { required: true })} />
      </label>
      <ul>
        <li>
          <label>
            header
            <input type="text" {...register("header", { required: true })} />
          </label>
          <label>
            value
            <input type="text" {...register("value", { required: true })} />
          </label>
          <button type="button">+</button>
        </li>
      </ul>
      <button type="submit">add</button>
    </form>
  )
}

export default AddRuleForm
