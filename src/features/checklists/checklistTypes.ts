export type AnswerValue = string | string[] | null
export type Answers = Record<string, AnswerValue | undefined>

export interface ChecklistOption {
  id: string
  label: string
}

export interface ChecklistQuestion {
  id: string
  text: string
  multiple?: boolean
  options: ChecklistOption[]
}

export interface ContentBlock {
  id: string
  title: string
  items: string[]
  optional?: boolean
}

export interface ChecklistCategory {
  id: string
  title: string
  purpose: string
  intro: string
  questionnaireVersion: string
  questions: ChecklistQuestion[]
  blocks: Record<string, ContentBlock>
  avoidItems: string[]
}

export interface AssembledChecklist {
  blocks: ContentBlock[]
  shortMode: boolean
  routedCategoryId?: string
}
