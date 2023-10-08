import { Consult } from "../model/consult";
import { Exam } from "../model/exam";

export interface ConsultListExamDTO{
    consultDTO: Consult,
    listExam: Exam[]
  }