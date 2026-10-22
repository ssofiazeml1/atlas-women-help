import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useStaticLocalizer } from '../../lib/staticLocalization'

const articleImage = '/images/digital-diplomacy-global-connectivity.jpg'

function LocalizedText({ children, lang }: { children: string; lang: string }) {
  const localize = useStaticLocalizer(lang)
  return <>{localize(children)}</>
}

const questions = [
  {
    title: 'Кто это опубликовал?',
    body: 'Проверьте не только название аккаунта, но и статус автора. Заявление посольства, личный комментарий дипломата и позиция правительства имеют разный вес. Найдите ссылку на аккаунт на официальном сайте учреждения; синяя отметка сама по себе не заменяет проверку.',
  },
  {
    title: 'Что именно произошло?',
    body: 'Отделите слова от оформленного решения. «Выражаем обеспокоенность», «призываем» и «рассматриваем меры» сообщают о позиции. «Подписали», «приняли», «ввели» или «выделили» указывают на действие, которое должно подтверждаться документом, датой и ответственным органом.',
  },
  {
    title: 'К кому обращаются?',
    body: 'Публикация может быть рассчитана на иностранное правительство, союзников, собственных граждан или международные СМИ. Адресат объясняет выбор языка и тона. Жёсткая фраза для внутренней аудитории не всегда означает изменение внешней политики.',
  },
  {
    title: 'Почему сообщение появилось сейчас?',
    body: 'Сопоставьте время публикации с переговорами, голосованием, кризисом или новым докладом. Совпадение по времени не доказывает причинную связь, но показывает контекст, в котором сообщение должно быть услышано.',
  },
  {
    title: 'Где первичный документ?',
    body: 'Ищите коммюнике, резолюцию, закон, стенограмму, соглашение или полный текст выступления. Если пост пересказывает решение без ссылки, откройте официальный сайт организации и найдите документ по дате и ключевой фразе. Скриншот без источника не годится для вывода.',
  },
]

const sources = [
  {
    title: 'DiploFoundation. Digital Diplomacy',
    url: 'https://www.diplomacy.edu/topics/digital-diplomacy/',
    desc: 'Определение цифровой дипломатии и разграничение цифровой, кибер- и технологической дипломатии.',
  },
  {
    title: 'European External Action Service. Digital Diplomacy',
    url: 'https://www.eeas.europa.eu/eeas/digital-diplomacy_en',
    desc: 'Официальное описание цифровой дипломатии Европейского союза, её задач и связи с международной цифровой политикой.',
  },
  {
    title: 'United Nations Department of Political and Peacebuilding Affairs. Innovation',
    url: 'https://dppa.un.org/en/node/103517',
    desc: 'Примеры применения цифровых платформ и искусственного интеллекта в консультациях, анализе и миротворческой работе ООН.',
  },
  {
    title: 'United Nations Peacemaker. Digital Technologies',
    url: 'https://peacemaker.un.org/en/thematic-areas/digital-technologies',
    desc: 'Материалы о возможностях и рисках цифровых технологий в посредничестве и мирных процессах.',
  },
]

export function DigitalDiplomacy() {
  const { i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  const lang = (i18n.language || 'ru').split('-')[0]
  const T = ({ children }: { children: string }) => <LocalizedText lang={lang}>{children}</LocalizedText>

  if (searchParams.get('article') !== 'reading-digital-diplomacy') {
    return (
      <main className="max-w-6xl mx-auto px-5 py-10">
        <header className="max-w-3xl mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-safe-900 mb-3">
            <T>Цифровая дипломатия</T>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            <T>Материалы о том, как технологии меняют международные отношения, публичную коммуникацию и способы проверки официальных сообщений.</T>
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="safe-card overflow-hidden bg-white flex flex-col">
            <img
              src={articleImage}
              alt=""
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <div className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-2">
                <T>Практическое чтение · 6 минут</T>
              </div>
              <h2 className="text-xl font-semibold text-safe-900 mb-3">
                <T>Как читать цифровую дипломатию</T>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-5 flex-1">
                <T>Пять вопросов, которые помогают понять официальный пост и не приписать ему лишнего.</T>
              </p>
              <Link
                to="/diplomacy?article=reading-digital-diplomacy"
                className="inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
              >
                <T>Читать статью</T> <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          <T>Изображение: Европейская служба внешних связей, © European Union, 2025.</T>
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <Link to="/diplomacy" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900 mb-5">
        <ArrowLeft size={16} aria-hidden="true" /> <T>Все статьи</T>
      </Link>
      <article className="safe-card bg-white p-6 md:p-10">
        <header className="max-w-3xl mb-9">
          <div className="text-xs uppercase tracking-widest text-teal-700 font-semibold mb-3">
            <T>Практическое чтение · 6 минут</T>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-safe-900 mb-3">
            <T>Как читать цифровую дипломатию</T>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            <T>Пять вопросов, которые помогают понять официальный пост и не приписать ему лишнего</T>
          </p>
        </header>

        <div className="space-y-5 text-[15px] md:text-base text-slate-700 leading-7">
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-safe-900 mb-4"><T>Дипломатия вышла из закрытых кабинетов</T></h2>
            <p><T>Ещё недавно внешняя политика ассоциировалась с закрытыми переговорами, официальными нотами и заявлениями для прессы. Теперь дипломатическое сообщение может появиться в социальной сети раньше, чем на сайте министерства, а реакция аудитории становится частью политического события.</T></p>
            <p>
              <strong className="text-safe-900"><T>Цифровая дипломатия</T></strong>{' — '}
              <T>это использование социальных сетей, онлайн-платформ, видеосвязи, данных и других технологий для достижения внешнеполитических целей. Но сводить её к ведению аккаунтов посольств было бы ошибкой.</T>
            </p>
            <p><T>Цифровая среда изменила не только способ публикации сообщений, но и сам ритм дипломатии. Государства могут обращаться напрямую к иностранной аудитории, объяснять свои решения, опровергать дезинформацию и поддерживать связь с гражданами во время кризиса. Международные организации используют цифровые инструменты для консультаций, анализа конфликтов и вовлечения людей, которые раньше почти не имели доступа к дипломатическим процессам.</T></p>
            <p>
              <strong className="text-safe-900"><T>Публичность создаёт новые риски.</T></strong>{' '}
              <T>Неосторожная формулировка способна вызвать международный конфликт, ложная информация распространяется быстрее официального опровержения, а цифровые платформы принадлежат частным компаниям, чьи правила могут меняться. Дипломатам приходится одновременно быть быстрыми, понятными и предельно точными — качества, которые не всегда легко совместить.</T>
            </p>
            <p>
              <strong className="text-safe-900"><T>Цифровая дипломатия не отменила личные встречи и конфиденциальные переговоры.</T></strong>{' '}
              <T>Скорее, вокруг традиционной дипломатии появился новый публичный слой. Теперь значение имеет не только то, о чём договорились за закрытыми дверями, но и то, как это объяснили миллионам людей по другую сторону экрана.</T>
            </p>
          </section>

          <p className="font-medium text-safe-900 pt-3">
            <T>Поэтому дипломатические публикации полезно читать не по эмоциональному тону, а по тому, кто говорит, какое действие действительно совершено и где это можно проверить.</T>
          </p>

          <section className="pt-4">
            <h2 className="text-2xl font-semibold text-safe-900 mb-5"><T>Пять вопросов к официальной публикации</T></h2>
            <ol className="space-y-5">
              {questions.map((question, index) => (
                <li key={question.title} className="pl-4 border-l-2 border-teal-600">
                  <p>
                    <strong className="text-safe-900">{index + 1}. <T>{question.title}</T></strong>{' '}
                    <T>{question.body}</T>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="pt-5 space-y-4">
            <h2 className="text-2xl font-semibold text-safe-900 mb-4"><T>Проверка за девяносто секунд</T></h2>
            <p>
              <strong className="text-safe-900"><T>Сохраните дату, точную формулировку и название официального аккаунта.</T></strong>{' '}
              <T>Затем откройте первичный документ и перескажите сообщение одним нейтральным предложением без оценочных слов.</T>
            </p>
            <p>
              <T>Например, фраза «мы глубоко обеспокоены развитием ситуации» означает, что ведомство публично обозначило позицию.</T>{' '}
              <strong className="text-safe-900"><T>Она не доказывает, что страна ввела санкции, направила помощь или начала переговоры.</T></strong>{' '}
              <T>Для каждого такого действия нужно отдельное подтверждение.</T>
            </p>
            <p>
              <T>После этого проверьте, ответил ли адресат и появились ли документы, которые меняют практические последствия сообщения.</T>{' '}
              <strong className="text-safe-900"><T>Если их нет, корректный вывод ограничивается самим заявлением.</T></strong>
            </p>
          </section>

          <section className="pt-5">
            <h2 className="text-2xl font-semibold text-safe-900 mb-4"><T>Что даёт этот навык</T></h2>
            <p><T>Такой разбор помогает не распространять преувеличенные заголовки, точнее понимать международные новости и замечать разницу между публичной риторикой и решением, которое уже вступило в силу. Эту же схему можно применять к публикациям министерств, посольств, международных организаций и политиков.</T></p>
          </section>

          <section className="pt-5 border-t border-slate-200">
            <h2 className="text-xl font-semibold text-safe-900 mb-4"><T>Источники</T></h2>
            <ul className="space-y-4">
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-teal-700 hover:underline">
                    {source.title} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                  <p className="text-sm text-slate-600 mt-1"><T>{source.desc}</T></p>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500 mt-5"><T>Дата обращения к источникам: 21 октября 2026 года.</T></p>
          </section>
        </div>
      </article>
    </main>
  )
}
