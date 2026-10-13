import { checklistCategoryById } from './checklistData'
import type { Answers, AssembledChecklist, ChecklistCategory, ChecklistQuestion, ContentBlock } from './checklistTypes'

function selected(answers: Answers, questionId: string, optionId: string): boolean {
  const value = answers[questionId]
  return Array.isArray(value) ? value.includes(optionId) : value === optionId
}

function anySelected(answers: Answers, questionId: string, optionIds: string[]): boolean {
  return optionIds.some((optionId) => selected(answers, questionId, optionId))
}

function cleanBlocks(blocks: ContentBlock[]): ContentBlock[] {
  const seen = new Set<string>()
  return blocks.map((contentBlock) => ({
    ...contentBlock,
    items: contentBlock.items.filter((item) => {
      const key = item.toLocaleLowerCase('ru').replace(/[«»“”„"'.,:;!?—–-]/g, '').replace(/\s+/g, ' ').trim()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }),
  })).filter((contentBlock) => contentBlock.items.length > 0)
}

function pick(category: ChecklistCategory, ids: string[]): ContentBlock[] {
  return cleanBlocks(ids.map((id) => category.blocks[id]).filter(Boolean))
}

export function getVisibleQuestions(category: ChecklistCategory, answers: Answers): ChecklistQuestion[] {
  if (category.id === 'medical_care_after_violence') {
    return category.questions.filter((question) => question.id !== 'Q4_4' || selected(answers, 'Q4_3', 'sexual_violence'))
  }
  return category.questions
}

export function assembleChecklist(categoryId: string, answers: Answers): AssembledChecklist {
  const category = checklistCategoryById[categoryId]
  if (!category) return { blocks: [], shortMode: false }

  if (categoryId === 'supportive_conversation') {
    const ids: string[] = []
    if (anySelected(answers, 'Q1_2', ['danger_now', 'urgent_medical', 'unknown'])) ids.push('B3_IMMEDIATE_DANGER')
    if (anySelected(answers, 'Q1_4', ['unsafe_device', 'person_nearby', 'unknown'])) ids.push('B5_UNSAFE_CHANNEL')
    if (selected(answers, 'Q1_3', 'minor')) ids.push('B4_MINOR')
    if (anySelected(answers, 'Q1_5', ['under_72h', 'h72_to_120', 'over_120h', 'possible_unknown_time'])) ids.push('B6_SEXUAL_VIOLENCE')
    if (anySelected(answers, 'Q1_6', ['children', 'dependent_person'])) ids.push('B7_DEPENDENTS')
    if (selected(answers, 'Q1_1', 'disclosed')) ids.push('B1_DISCLOSURE')
    if (anySelected(answers, 'Q1_1', ['feels_unsafe', 'signs_only', 'unknown'])) ids.push('B2_SUSPICION')
    if (selected(answers, 'Q1_7', 'not_ready')) ids.push('B8_NOT_READY')
    ids.push('B0_CORE')
    return { blocks: pick(category, ids), shortMode: false }
  }

  if (categoryId === 'immediate_danger') {
    const unsafeChannel = answers.Q2_1 !== undefined && answers.Q2_1 !== null && !selected(answers, 'Q2_1', 'safe_private')
    const shortMode = anySelected(answers, 'Q2_1', ['cannot_talk', 'perpetrator_nearby'])
    if (shortMode) return { blocks: pick(category, ['B1_CHANNEL']), shortMode: true }

    const ids: string[] = []
    if (unsafeChannel) ids.push('B1_CHANNEL')
    if (anySelected(answers, 'Q2_2', ['attack_now', 'serious_injury'])) ids.push('B2_MEDICAL')
    if (anySelected(answers, 'Q2_2', ['weapon', 'strangulation', 'threat_to_kill', 'forced_confinement', 'escalating'])) ids.push('B3_HIGH_RISK')
    if (anySelected(answers, 'Q2_4', ['yes_needs_help', 'yes_independent'])) ids.push('B4_LEAVE')
    if (anySelected(answers, 'Q2_4', ['cannot_leave', 'does_not_want', 'uncertain'])) ids.push('B5_CANNOT_OR_NOT_READY')
    if (anySelected(answers, 'Q2_5', ['children_with_her', 'children_elsewhere', 'dependent_adult'])) ids.push('B6_DEPENDENTS')
    if (selected(answers, 'Q2_7', 'minor')) ids.push('B7_MINOR')
    if (selected(answers, 'Q2_8', 'recent')) ids.push('B8_SEXUAL_VIOLENCE')
    ids.push('B0_CORE', 'B9_FOLLOW_UP')
    return { blocks: pick(category, ids), shortMode: false }
  }

  if (categoryId === 'safe_exit_and_place') {
    if (anySelected(answers, 'Q3_1', ['yes_now', 'serious_medical'])) {
      return { blocks: pick(category, ['B1_IMMEDIATE_ROUTE']), shortMode: true, routedCategoryId: 'immediate_danger' }
    }

    const shortMode = anySelected(answers, 'Q3_2', ['cannot_plan', 'perpetrator_nearby'])
    if (shortMode) return { blocks: pick(category, ['B2_DISCREET_PLANNING']), shortMode: true }

    const ids: string[] = []
    if (answers.Q3_2 !== undefined && answers.Q3_2 !== null && !selected(answers, 'Q3_2', 'safe_private')) ids.push('B2_DISCREET_PLANNING')
    // The examples place the child-protection block before destination and pet logistics.
    if (selected(answers, 'Q3_8', 'minor')) ids.push('B10_MINOR')
    if (anySelected(answers, 'Q3_4', ['none', 'not_verified', 'shelter'])) ids.push('B3_DESTINATION')
    if (selected(answers, 'Q3_3', 'today') || selected(answers, 'Q3_5', 'transport')) ids.push('B4_TRANSPORT')
    if (anySelected(answers, 'Q3_5', ['documents', 'medicines', 'money'])) ids.push('B5_ESSENTIALS')
    if (anySelected(answers, 'Q3_5', ['children', 'dependent_adult'])) ids.push('B6_CHILDREN_DEPENDENTS')
    if (anySelected(answers, 'Q3_5', ['medicines', 'accessibility'])) ids.push('B7_ACCESS_HEALTH')
    if (selected(answers, 'Q3_5', 'pets')) ids.push('B8_PETS')
    if (selected(answers, 'Q3_5', 'money') || selected(answers, 'Q3_4', 'none')) ids.push('B9_NO_PLACE_OR_MONEY')
    ids.push('B0_CORE', 'B11_ARRIVAL_FOLLOWUP')
    return { blocks: pick(category, ids), shortMode: false }
  }

  if (categoryId === 'medical_care_after_violence') {
    if (answers.Q4_1 !== undefined && answers.Q4_1 !== null && !selected(answers, 'Q4_1', 'no')) {
      return { blocks: pick(category, ['B1_EMERGENCY']), shortMode: true, routedCategoryId: 'immediate_danger' }
    }

    const ids: string[] = []
    if (answers.Q4_2 !== undefined && answers.Q4_2 !== null && !selected(answers, 'Q4_2', 'safe')) ids.push('B2_UNSAFE_ACCESS')
    // The worked example puts the minor-specific block before barriers and accompaniment.
    if (selected(answers, 'Q4_7', 'minor')) ids.push('B10_MINOR')
    if (anySelected(answers, 'Q4_3', ['strangulation', 'head_injury'])) ids.push('B3_STRANGULATION_HEAD')
    if (selected(answers, 'Q4_4', 'under_72h')) ids.push('B4_SEXUAL_UNDER_72', 'B7_FORENSIC_CHOICE')
    if (selected(answers, 'Q4_4', 'h72_to_120')) ids.push('B5_SEXUAL_72_TO_120', 'B7_FORENSIC_CHOICE')
    if (anySelected(answers, 'Q4_4', ['over_120h', 'unknown', 'prefer_not'])) ids.push('B6_SEXUAL_OVER_120')
    if (selected(answers, 'Q4_3', 'pregnancy')) ids.push('B8_PREGNANCY_POSTPARTUM')
    if (Array.isArray(answers.Q4_5) && answers.Q4_5.length > 0) ids.push('B9_BARRIERS')
    if (selected(answers, 'Q4_8', 'yes') || (answers.Q4_6 !== undefined && answers.Q4_6 !== null && !selected(answers, 'Q4_6', 'wants_private'))) ids.push('B11_ACCESS_SUPPORT')
    ids.push('B0_CORE', 'B12_FOLLOWUP')
    return { blocks: pick(category, ids), shortMode: false }
  }

  return { blocks: pick(category, ['B0_CORE']), shortMode: false }
}
