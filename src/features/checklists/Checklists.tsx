import { useEffect, useMemo, useRef, useState } from 'react'
import { QuickExitButton } from '../../components/QuickExitButton'
import { checklistCategories, checklistCategoryById } from './checklistData'
import { assembleChecklist, getVisibleQuestions } from './checklistEngine'
import type { Answers, ChecklistQuestion } from './checklistTypes'

const secondaryButton = 'inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2'
const primaryButton = 'inline-flex min-h-11 items-center justify-center rounded-lg bg-safe-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2'

function QuestionField({ question, value, onChange, onSkip }: {
  question: ChecklistQuestion
  value: Answers[string]
  onChange: (value: string | string[]) => void
  onSkip: () => void
}) {
  const selectedValues = Array.isArray(value) ? value : []
  const inputType = question.multiple ? 'checkbox' : 'radio'

  return (
    <fieldset className="safe-card" data-question-id={question.id}>
      <legend className="px-1 text-base font-semibold text-slate-900">{question.text}</legend>
      <p className="mt-1 text-xs text-slate-500">Можно пропустить. Не указывайте имена, адреса или подробности произошедшего.</p>
      <div className="mt-4 space-y-2">
        {question.options.map((option) => {
          const checked = question.multiple ? selectedValues.includes(option.id) : value === option.id
          return (
            <label key={option.id} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2.5 hover:bg-slate-50">
              <input
                type={inputType}
                name={question.id}
                value={option.id}
                checked={checked}
                onChange={() => {
                  if (!question.multiple) {
                    onChange(option.id)
                    return
                  }
                  onChange(checked ? selectedValues.filter((id) => id !== option.id) : [...selectedValues, option.id])
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-teal-700"
              />
              <span className="text-sm text-slate-700">{option.label}</span>
            </label>
          )
        })}
      </div>
      <button type="button" onClick={onSkip} className="mt-3 text-sm text-slate-600 underline underline-offset-2 hover:text-slate-900">
        {value === null ? 'Вопрос пропущен' : 'Пропустить вопрос'}
      </button>
    </fieldset>
  )
}

export function Checklists() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResult, setShowResult] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const resultRef = useRef<HTMLDivElement>(null)
  const questionsRef = useRef<HTMLDivElement>(null)

  const category = selectedCategoryId ? checklistCategoryById[selectedCategoryId] : undefined
  const visibleQuestions = useMemo(() => category ? getVisibleQuestions(category, answers) : [], [category, answers])
  const assembled = useMemo(
    () => selectedCategoryId && showResult ? assembleChecklist(selectedCategoryId, answers) : null,
    [selectedCategoryId, answers, showResult],
  )

  useEffect(() => {
    document.title = 'Atlas — полезная информация'
  }, [])

  const chooseCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setAnswers({})
    setCheckedItems({})
    setShowResult(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateAnswer = (questionId: string, value: string | string[] | null) => {
    setAnswers((current) => ({ ...current, [questionId]: value }))
    setCheckedItems({})
  }

  const buildResult = () => {
    setShowResult(true)
    window.setTimeout(() => resultRef.current?.focus(), 0)
  }

  const editAnswers = () => {
    setShowResult(false)
    window.setTimeout(() => questionsRef.current?.focus(), 0)
  }

  const resetAnswers = () => {
    setAnswers({})
    setCheckedItems({})
    setShowResult(false)
    window.setTimeout(() => questionsRef.current?.focus(), 0)
  }

  const answeredCount = visibleQuestions.filter((question) => answers[question.id] !== undefined).length

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Чек-листы поддержки</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Выберите общую ситуацию и ответьте только на те вопросы, на которые безопасно отвечать. Ответы используются только в памяти этой страницы и не добавляются в адрес или аналитику.
          </p>
        </div>
        <QuickExitButton className="self-start sm:hidden" />
      </div>

      {!category && (
        <section aria-labelledby="category-heading">
          <h2 id="category-heading" className="text-xl font-semibold text-slate-900">Выберите ситуацию</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {checklistCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => chooseCategory(item.id)}
                className="safe-card min-h-40 text-left transition hover:border-safe-teal hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2"
                data-category-id={item.id}
              >
                <span className="block text-lg font-semibold text-slate-900">{item.title}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{item.purpose}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {category && !showResult && (
        <div ref={questionsRef} tabIndex={-1} className="focus:outline-none">
          <button type="button" onClick={() => setSelectedCategoryId(null)} className="mb-5 text-sm text-teal-800 underline underline-offset-2">
            ← Выбрать другую категорию
          </button>

          <section aria-labelledby="questionnaire-heading">
            <div className="safe-card border-teal-200 bg-teal-50">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">{category.id}</p>
              <h2 id="questionnaire-heading" className="mt-1 text-2xl font-semibold text-slate-900">{category.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{category.intro}</p>
              <p className="mt-3 text-xs text-slate-500">Ответы можно изменить. Любой вопрос можно пропустить.</p>
            </div>

            <div className="mt-6 space-y-4">
              {visibleQuestions.map((question) => (
                <QuestionField
                  key={question.id}
                  question={question}
                  value={answers[question.id]}
                  onChange={(value) => updateAnswer(question.id, value)}
                  onSkip={() => updateAnswer(question.id, null)}
                />
              ))}
            </div>

            <div className="sticky bottom-0 z-10 -mx-4 mt-6 border-t border-slate-200 bg-[var(--safe-bg)]/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:backdrop-blur-none">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" onClick={buildResult} className={primaryButton}>Собрать мой чек-лист</button>
                <button type="button" onClick={resetAnswers} className={secondaryButton}>Очистить ответы</button>
                <span className="text-xs text-slate-500" aria-live="polite">Отмечено или пропущено: {answeredCount} из {visibleQuestions.length}</span>
              </div>
            </div>
          </section>
        </div>
      )}

      {category && assembled && (
        <div ref={resultRef} tabIndex={-1} className="focus:outline-none" aria-live="polite">
          <div className="mb-5 flex flex-wrap gap-3">
            <button type="button" onClick={editAnswers} className={secondaryButton}>← Изменить ответы</button>
            <button type="button" onClick={() => setSelectedCategoryId(null)} className={secondaryButton}>Другая категория</button>
          </div>

          <section aria-labelledby="result-heading">
            <div className="safe-card border-teal-200 bg-teal-50">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">Адаптированный чек-лист</p>
              <h2 id="result-heading" className="mt-1 text-2xl font-semibold text-slate-900">{category.title}</h2>
              <p className="mt-2 text-sm text-slate-700">
                {assembled.shortMode
                  ? 'Показан короткий вариант: сейчас важны только ближайшие безопасные действия.'
                  : 'Блоки объединены по приоритету; совпадающие действия показаны один раз.'}
              </p>
              {assembled.shortMode && (
                <p className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900">
                  Проверенный местный номер экстренной помощи: {'{{EMERGENCY_NUMBER}}'}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-5">
              {assembled.blocks.map((contentBlock) => (
                <section key={contentBlock.id} className="safe-card" data-block-id={contentBlock.id} aria-labelledby={`block-${contentBlock.id}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 id={`block-${contentBlock.id}`} className="text-lg font-semibold text-slate-900">{contentBlock.title}</h3>
                    {contentBlock.optional && <span className="text-xs text-slate-500">По выбору девушки</span>}
                  </div>
                  <ul className="mt-4 space-y-3">
                    {contentBlock.items.map((item, index) => {
                      const itemId = `${contentBlock.id}:${index}`
                      return (
                        <li key={itemId} className="flex items-start gap-3">
                          <input
                            id={itemId}
                            type="checkbox"
                            checked={Boolean(checkedItems[itemId])}
                            onChange={() => setCheckedItems((current) => ({ ...current, [itemId]: !current[itemId] }))}
                            className="mt-1 h-4 w-4 shrink-0 accent-teal-700"
                          />
                          <label htmlFor={itemId} className={`cursor-pointer text-sm leading-6 ${checkedItems[itemId] ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                            {item}
                          </label>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              ))}
            </div>

            {assembled.routedCategoryId && assembled.routedCategoryId !== category.id && (
              <div className="safe-card mt-5 border-teal-200">
                <p className="text-sm text-slate-700">Для следующих срочных действий откройте категорию «Опасность прямо сейчас».</p>
                <button type="button" onClick={() => chooseCategory(assembled.routedCategoryId!)} className={`${primaryButton} mt-3`}>
                  Открыть срочный чек-лист
                </button>
              </div>
            )}

            <details className="safe-card mt-5">
              <summary className="cursor-pointer font-semibold text-slate-900">Чего нельзя делать</summary>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">
                {category.avoidItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </details>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={editAnswers} className={primaryButton}>Изменить ответы</button>
              <button type="button" onClick={resetAnswers} className={secondaryButton}>Начать заново</button>
              <QuickExitButton />
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Этот материал не заменяет экстренную, медицинскую, психологическую, юридическую или специализированную помощь. Контакты и правовые формулировки должны быть проверены для выбранной страны до публикации.
            </p>
          </section>
        </div>
      )}
    </main>
  )
}
