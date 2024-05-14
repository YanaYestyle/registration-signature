import { Formik, Form as FormContainer } from "formik";
import FormControl from "./form-control";
import { FormSchema } from "@/types/form-schema";
import Button from "../button/button";

export default function Form(props: { formSchema: FormSchema<Object> }) {
  return (
    <>
      <Formik
        initialValues={props.formSchema.initialValues}
        validationSchema={props.formSchema.validationSchema}
        onSubmit={props.formSchema.onSubmit}
      >
        {(formik) => {
          return (
            <FormContainer>
              {props.formSchema.formConfig.map((key, index) => (
                <FormControl
                  key={index}
                  id={key.id}
                  control={key.control}
                  type={key.inputType}
                  label={key.label ? key.label : key.name}
                  name={key.name}
                />
              ))}
              <Button
                type="submit"
                disabled={!formik.isValid || !formik.dirty}
                onClick={props.formSchema.onClick}
              >
                Submit
              </Button>
            </FormContainer>
          );
        }}
      </Formik>
    </>
  );
}
