import Input from '../input/input'

export default function FormControl (props: { [x: string]: any; control: any }) {
  const { control, ...rest } = props
  switch (control) {
    case 'input':
      return <Input label={''} name={''}  errorMessage={''} {...rest} />
    /*case 'textarea':
      return <Textarea {...rest} />
    case 'select':
      return <Select {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'date':
      return <DatePicker {...rest} />
    case 'chakraInput':
      return <ChakraInput {...rest} />*/
    default:
      return null
  }
}