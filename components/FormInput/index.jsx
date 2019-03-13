import { useChangeHandler } from "../Form/FormUtils";

export default function FormInput(props) {
  const { onChange, value } = useChangeHandler(props);

  return <input {...props} onChange={onChange} value={value} />;
}
