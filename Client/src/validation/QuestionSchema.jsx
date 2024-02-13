import * as Yup from "yup";

export const addQuestionSchema = Yup.object({
    title : Yup.string().required("Title Required"),
    problemStatement : Yup.string().required("this is a required field"),
    testCases : Yup.string().required("this is a required field"),
    output : Yup.string().required("this is a required field"),
})