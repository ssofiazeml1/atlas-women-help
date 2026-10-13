import { assembleChecklist } from '../src/features/checklists/checklistEngine'
import type { Answers } from '../src/features/checklists/checklistTypes'

interface Scenario {
  name: string
  category: string
  answers: Answers
  expected: string[]
}

const scenarios: Scenario[] = [
  { name: 'Разговор 1: рассказала, опасности нет', category: 'supportive_conversation', answers: { Q1_1: 'disclosed', Q1_2: 'no_immediate', Q1_4: 'safe_private', Q1_5: 'no' }, expected: ['B1_DISCLOSURE', 'B0_CORE'] },
  { name: 'Разговор 2: опасность, дети, небезопасный телефон', category: 'supportive_conversation', answers: { Q1_2: 'danger_now', Q1_4: 'unsafe_device', Q1_6: 'children' }, expected: ['B3_IMMEDIATE_DANGER', 'B5_UNSAFE_CHANNEL', 'B7_DEPENDENTS', 'B0_CORE'] },
  { name: 'Разговор 3: несовершеннолетняя и недавнее сексуализированное насилие', category: 'supportive_conversation', answers: { Q1_1: 'disclosed', Q1_3: 'minor', Q1_5: 'under_72h' }, expected: ['B4_MINOR', 'B6_SEXUAL_VIOLENCE', 'B1_DISCLOSURE', 'B0_CORE'] },

  { name: 'Опасность 1: агрессор рядом и говорить нельзя', category: 'immediate_danger', answers: { Q2_1: 'perpetrator_nearby' }, expected: ['B1_CHANNEL'] },
  { name: 'Опасность 2: нападение и тяжёлая травма', category: 'immediate_danger', answers: { Q2_1: 'safe_private', Q2_2: ['attack_now', 'serious_injury'] }, expected: ['B2_MEDICAL', 'B0_CORE', 'B9_FOLLOW_UP'] },
  { name: 'Опасность 3: оружие, хочет уйти, дети', category: 'immediate_danger', answers: { Q2_1: 'safe_private', Q2_2: ['weapon'], Q2_4: 'yes_needs_help', Q2_5: 'children_with_her' }, expected: ['B3_HIGH_RISK', 'B4_LEAVE', 'B6_DEPENDENTS', 'B0_CORE', 'B9_FOLLOW_UP'] },
  { name: 'Опасность 4: не может уйти, нужна связь', category: 'immediate_danger', answers: { Q2_1: 'safe_private', Q2_4: 'cannot_leave', Q2_6: ['stay_connected'] }, expected: ['B5_CANNOT_OR_NOT_READY', 'B0_CORE', 'B9_FOLLOW_UP'] },
  { name: 'Опасность 5: несовершеннолетняя и недавнее сексуальное насилие', category: 'immediate_danger', answers: { Q2_1: 'safe_private', Q2_7: 'minor', Q2_8: 'recent' }, expected: ['B7_MINOR', 'B8_SEXUAL_VIOLENCE', 'B0_CORE', 'B9_FOLLOW_UP'] },

  { name: 'Уход 1: опасность сейчас', category: 'safe_exit_and_place', answers: { Q3_1: 'yes_now' }, expected: ['B1_IMMEDIATE_ROUTE'] },
  { name: 'Уход 2: устройство проверяют, сегодня, места нет', category: 'safe_exit_and_place', answers: { Q3_1: 'no_immediate', Q3_2: 'device_may_be_checked', Q3_3: 'today', Q3_4: 'none' }, expected: ['B2_DISCREET_PLANNING', 'B3_DESTINATION', 'B4_TRANSPORT', 'B9_NO_PLACE_OR_MONEY', 'B0_CORE', 'B11_ARRIVAL_FOLLOWUP'] },
  { name: 'Уход 3: через несколько дней, дети и лекарства', category: 'safe_exit_and_place', answers: { Q3_1: 'no_immediate', Q3_2: 'safe_private', Q3_3: 'few_days', Q3_5: ['children', 'medicines'] }, expected: ['B5_ESSENTIALS', 'B6_CHILDREN_DEPENDENTS', 'B7_ACCESS_HEALTH', 'B0_CORE', 'B11_ARRIVAL_FOLLOWUP'] },
  { name: 'Уход 4: жильё есть, нет транспорта и денег', category: 'safe_exit_and_place', answers: { Q3_1: 'no_immediate', Q3_2: 'safe_private', Q3_4: 'trusted_place', Q3_5: ['transport', 'money'] }, expected: ['B4_TRANSPORT', 'B5_ESSENTIALS', 'B9_NO_PLACE_OR_MONEY', 'B0_CORE', 'B11_ARRIVAL_FOLLOWUP'] },
  { name: 'Уход 5: несовершеннолетняя, животное, место не подтверждено', category: 'safe_exit_and_place', answers: { Q3_1: 'no_immediate', Q3_2: 'safe_private', Q3_4: 'not_verified', Q3_5: ['pets'], Q3_8: 'minor' }, expected: ['B10_MINOR', 'B3_DESTINATION', 'B8_PETS', 'B0_CORE', 'B11_ARRIVAL_FOLLOWUP'] },

  { name: 'Медицина 1: потеря сознания или затруднённое дыхание', category: 'medical_care_after_violence', answers: { Q4_1: 'breathing_or_unconscious' }, expected: ['B1_EMERGENCY'] },
  { name: 'Медицина 2: удушение без внешних следов', category: 'medical_care_after_violence', answers: { Q4_1: 'no', Q4_2: 'safe', Q4_3: 'strangulation' }, expected: ['B3_STRANGULATION_HEAD', 'B0_CORE', 'B12_FOLLOWUP'] },
  { name: 'Медицина 3: сексуальное насилие менее 72 часов', category: 'medical_care_after_violence', answers: { Q4_1: 'no', Q4_2: 'safe', Q4_3: 'sexual_violence', Q4_4: 'under_72h' }, expected: ['B4_SEXUAL_UNDER_72', 'B7_FORENSIC_CHOICE', 'B0_CORE', 'B12_FOLLOWUP'] },
  { name: 'Медицина 4: более 120 часов, страх осмотра и стоимости', category: 'medical_care_after_violence', answers: { Q4_1: 'no', Q4_2: 'safe', Q4_3: 'sexual_violence', Q4_4: 'over_120h', Q4_5: ['fear_exam', 'cost'] }, expected: ['B6_SEXUAL_OVER_120', 'B9_BARRIERS', 'B0_CORE', 'B12_FOLLOWUP'] },
  { name: 'Медицина 5: несовершеннолетняя, переводчик и сопровождающий', category: 'medical_care_after_violence', answers: { Q4_1: 'no', Q4_2: 'safe', Q4_5: ['language'], Q4_6: 'yes_user', Q4_7: 'minor' }, expected: ['B10_MINOR', 'B9_BARRIERS', 'B11_ACCESS_SUPPORT', 'B0_CORE', 'B12_FOLLOWUP'] },
]

for (const scenario of scenarios) {
  const actual = assembleChecklist(scenario.category, scenario.answers).blocks.map((block) => block.id)
  if (JSON.stringify(actual) !== JSON.stringify(scenario.expected)) {
    throw new Error(`${scenario.name}\nexpected: ${scenario.expected.join(' → ')}\nactual:   ${actual.join(' → ')}`)
  }
  console.log(`✓ ${scenario.name}: ${actual.join(' → ')}`)
}

console.log(`\n${scenarios.length} сценариев проверено.`)
