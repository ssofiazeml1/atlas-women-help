export type LibrarySeedItem = {
  id: string
  title: string
  author?: string
  date?: string
  category?: string
  abstract?: string
  sourceUrl?: string
  translations?: Record<string, Record<string, string>>
  pdfUrls?: Record<string, string>
}

export const LIBRARY_ARTICLES: LibrarySeedItem[] = [
  {
    "id": "seed-library-1",
    "title": "УВАЖАТЬ женщин: предотвращение насилия в отношении женщин",
    "author": "WHO and UN partners · English",
    "date": "2019",
    "category": "Профилактика и безопасность",
    "abstract": "Практическая основа предотвращения насилия в отношении женщин. В нем освещаются действия, основанные на фактических данных: укрепление навыков взаимоотношений, улучшение услуг, сокращение бедности, повышение безопасности в общественных местах, предотвращение жестокого обращения с детьми и изменение вредных норм. Эффективная профилактика сочетает в себе несколько подходов и сосредотачивает права женщин.",
    "sourceUrl": "https://iris.who.int/bitstream/handle/10665/312261/WHO-RHR-18.19-eng.pdf?sequence=1",
    "translations": {
      "title": {
        "en": "RESPECT women: Preventing violence against women",
        "ru": "УВАЖАТЬ женщин: предотвращение насилия в отношении женщин",
        "fr": "RESPECTER les femmes : prévenir la violence à l'égard des femmes",
        "es": "RESPETAR A las mujeres: Prevenir la violencia contra las mujeres",
        "ar": "احترام المرأة: منع العنف ضد المرأة",
        "zh": "尊重妇女：防止暴力侵害妇女行为"
      },
      "category": {
        "en": "Prevention and safety",
        "ru": "Профилактика и безопасность",
        "fr": "Prévention et sécurité",
        "es": "Prevención y seguridad",
        "ar": "الوقاية والسلامة",
        "zh": "预防和安全"
      },
      "abstract": {
        "en": "A practical framework for preventing violence against women. It highlights evidence-based actions: strengthen relationship skills, improve services, reduce poverty, make public spaces safer, prevent child abuse and change harmful norms. Effective prevention combines several approaches and centres women’s rights.",
        "ru": "Практическая основа предотвращения насилия в отношении женщин. В нем освещаются действия, основанные на фактических данных: укрепление навыков взаимоотношений, улучшение услуг, сокращение бедности, повышение безопасности в общественных местах, предотвращение жестокого обращения с детьми и изменение вредных норм. Эффективная профилактика сочетает в себе несколько подходов и сосредотачивает права женщин.",
        "fr": "Un cadre pratique pour la prévention de la violence à l'égard des femmes. Il met en évidence des actions fondées sur des données probantes : renforcer les compétences relationnelles, améliorer les services, réduire la pauvreté, rendre les espaces publics plus sûrs, prévenir la maltraitance des enfants et modifier les normes néfastes. Une prévention efficace combine plusieurs approches et centre les droits des femmes.",
        "es": "Un marco práctico para prevenir la violencia contra las mujeres. Destaca las acciones basadas en la evidencia: fortalecer las habilidades de relación, mejorar los servicios, reducir la pobreza, hacer que los espacios públicos sean más seguros, prevenir el abuso infantil y cambiar las normas perjudiciales. La prevención efectiva combina varios enfoques y centra los derechos de las mujeres.",
        "ar": "إطار عملي لمنع العنف ضد المرأة. ويسلط الضوء على الإجراءات القائمة على الأدلة: تعزيز مهارات العلاقات، وتحسين الخدمات، والحد من الفقر، وجعل الأماكن العامة أكثر أمانًا، ومنع إساءة معاملة الأطفال، وتغيير المعايير الضارة. تجمع الوقاية الفعالة بين العديد من النهج والمراكز المعنية بحقوق المرأة.",
        "zh": "防止暴力侵害妇女行为的实用框架。 它强调以证据为基础的行动：加强关系技能、改善服务、减少贫困、使公共场所更安全、防止虐待儿童和改变有害规范。 有效的预防结合了几种方法，并以妇女权利为中心。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-01-en.pdf",
      "ru": "/library/library-01-ru.pdf",
      "fr": "/library/library-01-fr.pdf",
      "es": "/library/library-01-es.pdf",
      "ar": "/library/library-01-ar.pdf",
      "zh": "/library/library-01-zh.pdf"
    }
  },
  {
    "id": "seed-library-2",
    "title": "Уход за женщинами, подвергшимися насилию: учебная программа ВОЗ для подготовки медицинских работников",
    "author": "WHO · English",
    "date": "2019",
    "category": "Обучение в области здравоохранения",
    "abstract": "Учебная программа для медицинских работников, которые поддерживают женщин, подвергшихся насилию. Основное внимание уделяется уважительной поддержке первой линии, конфиденциальности, выслушиванию без суждения, оценке неотложных потребностей, безопасному документированию ухода и подключению женщин к услугам при уважении их решений.",
    "sourceUrl": "https://iris.who.int/bitstream/handle/10665/330084/9789241517102-eng.pdf",
    "translations": {
      "title": {
        "en": "Caring for women subjected to violence: a WHO curriculum for training health-care providers",
        "ru": "Уход за женщинами, подвергшимися насилию: учебная программа ВОЗ для подготовки медицинских работников",
        "fr": "Prendre soin des femmes victimes de violence : un programme de l'OMS pour la formation des prestataires de soins de santé",
        "es": "Atención a las mujeres víctimas de la violencia: un plan de estudios de la OMS para la formación de profesionales de la salud",
        "ar": "رعاية النساء المعرضات للعنف: منهج منظمة الصحة العالمية لتدريب مقدمي الرعاية الصحية",
        "zh": "照顾遭受暴力侵害的妇女： a世卫组织培训卫生保健提供者的课程"
      },
      "category": {
        "en": "Health care training",
        "ru": "Обучение в области здравоохранения",
        "fr": "Formation en soins de santé",
        "es": "Capacitación en atención médica",
        "ar": "التدريب على الرعاية الصحية",
        "zh": "医疗保健培训"
      },
      "abstract": {
        "en": "A training curriculum for health-care providers who support women subjected to violence. It focuses on respectful first-line support, privacy, listening without judgement, assessing immediate needs, documenting care safely and connecting women with services while respecting their decisions.",
        "ru": "Учебная программа для медицинских работников, которые поддерживают женщин, подвергшихся насилию. Основное внимание уделяется уважительной поддержке первой линии, конфиденциальности, выслушиванию без суждения, оценке неотложных потребностей, безопасному документированию ухода и подключению женщин к услугам при уважении их решений.",
        "fr": "Un programme de formation pour les prestataires de soins de santé qui soutiennent les femmes victimes de violence. Il se concentre sur le soutien de première ligne respectueux, la vie privée, l'écoute sans jugement, l'évaluation des besoins immédiats, la documentation des soins en toute sécurité et la mise en relation des femmes avec les services tout en respectant leurs décisions.",
        "es": "Un plan de estudios de capacitación para los proveedores de atención médica que apoyan a las mujeres sometidas a violencia. Se centra en el apoyo respetuoso de primera línea, la privacidad, escuchar sin juzgar, evaluar las necesidades inmediatas, documentar la atención de manera segura y conectar a las mujeres con los servicios respetando sus decisiones.",
        "ar": "منهج تدريبي لمقدمي الرعاية الصحية الذين يدعمون النساء اللواتي يتعرضن للعنف. ويركز على دعم الخط الأول المحترم، والخصوصية، والاستماع دون حكم، وتقييم الاحتياجات الفورية، وتوثيق الرعاية بأمان وربط النساء بالخدمات مع احترام قراراتهن.",
        "zh": "为支持受暴力侵害妇女的卫生保健提供者提供培训课程。 它侧重于尊重一线支持、隐私、不加判断地倾听、评估眼前需求、安全记录护理以及在尊重女性决策的同时将女性与服务联系起来。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-02-en.pdf",
      "ru": "/library/library-02-ru.pdf",
      "fr": "/library/library-02-fr.pdf",
      "es": "/library/library-02-es.pdf",
      "ar": "/library/library-02-ar.pdf",
      "zh": "/library/library-02-zh.pdf"
    }
  },
  {
    "id": "seed-library-3",
    "title": "Клиническое ведение жертв изнасилования и насилия со стороны интимного партнера",
    "author": "WHO, UNFPA and UNHCR · English",
    "date": "2020",
    "category": "Клиническая помощь",
    "abstract": "Клиническое руководство по уходу за жертвами изнасилования и насилия со стороны интимного партнера. Приоритеты включают безопасность, информированное согласие, сострадательную поддержку первой линии, своевременное медицинское обслуживание, конфиденциальную документацию и последующее наблюдение. Местные протоколы и обученные клиницисты должны направлять любое обследование или лечение.",
    "sourceUrl": "https://iris.who.int/bitstream/handle/10665/331535/9789240001411-eng.pdf",
    "translations": {
      "title": {
        "en": "Clinical management of rape and intimate partner violence survivors",
        "ru": "Клиническое ведение жертв изнасилования и насилия со стороны интимного партнера",
        "fr": "Prise en charge clinique des victimes de viol et de violence entre partenaires intimes",
        "es": "Manejo clínico de sobrevivientes de violación y violencia de pareja",
        "ar": "الإدارة السريرية للاغتصاب والناجين من عنف الشريك الحميم",
        "zh": "强奸和亲密伴侣暴力幸存者的临床管理"
      },
      "category": {
        "en": "Clinical care",
        "ru": "Клиническая помощь",
        "fr": "Soins cliniques",
        "es": "Atención clínica",
        "ar": "الرعاية السريرية",
        "zh": "临床护理"
      },
      "abstract": {
        "en": "Clinical guidance for caring for survivors of rape and intimate partner violence. Priorities include safety, informed consent, compassionate first-line support, timely medical care, confidential documentation and follow-up. Local protocols and trained clinicians must guide any examination or treatment.",
        "ru": "Клиническое руководство по уходу за жертвами изнасилования и насилия со стороны интимного партнера. Приоритеты включают безопасность, информированное согласие, сострадательную поддержку первой линии, своевременное медицинское обслуживание, конфиденциальную документацию и последующее наблюдение. Местные протоколы и обученные клиницисты должны направлять любое обследование или лечение.",
        "fr": "Conseils cliniques pour prendre soin des victimes de viol et de violence entre partenaires intimes. Les priorités comprennent la sécurité, le consentement éclairé, le soutien de première ligne compatissant, les soins médicaux en temps opportun, la documentation confidentielle et le suivi. Les protocoles locaux et les cliniciens formés doivent guider tout examen ou traitement.",
        "es": "Orientación clínica para el cuidado de sobrevivientes de violación y violencia de pareja. Las prioridades incluyen la seguridad, el consentimiento informado, el apoyo compasivo de primera línea, la atención médica oportuna, la documentación confidencial y el seguimiento. Los protocolos locales y los médicos capacitados deben guiar cualquier examen o tratamiento.",
        "ar": "إرشادات سريرية لرعاية الناجين من الاغتصاب وعنف الشريك الحميم. وتشمل الأولويات السلامة، والموافقة المستنيرة، ودعم الخط الأول الرحيم، والرعاية الطبية في الوقت المناسب، والتوثيق السري والمتابعة. يجب على البروتوكولات المحلية والأطباء المدربين توجيه أي فحص أو علاج.",
        "zh": "护理强奸和亲密伴侣暴力幸存者的临床指南。 优先事项包括安全、知情同意、富有同情心的一线支持、及时的医疗护理、机密文件和随访。 当地方案和训练有素的临床医生必须指导任何检查或治疗。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-03-en.pdf",
      "ru": "/library/library-03-ru.pdf",
      "fr": "/library/library-03-fr.pdf",
      "es": "/library/library-03-es.pdf",
      "ar": "/library/library-03-ar.pdf",
      "zh": "/library/library-03-zh.pdf"
    }
  },
  {
    "id": "seed-library-4",
    "title": "Укрепление мер реагирования системы здравоохранения на гендерное насилие в Восточной Европе и Центральной Азии",
    "author": "UNFPA and WAVE · English",
    "date": "2014",
    "category": "Реакция системы здравоохранения",
    "abstract": "Ресурсный пакет для усиления мер реагирования системы здравоохранения на гендерное насилие в Восточной Европе и Центральной Азии. Он охватывает уход, ориентированный на выживших, обучение персонала, безопасную идентификацию, документацию, пути направления, оценку рисков и координацию между службами здравоохранения и поддержки.",
    "sourceUrl": "https://eeca.unfpa.org/sites/default/files/pub-pdf/WAVE-UNFPA-Report-EN.pdf",
    "translations": {
      "title": {
        "en": "Strengthening Health System Responses to Gender-based Violence in Eastern Europe and Central Asia",
        "ru": "Укрепление мер реагирования системы здравоохранения на гендерное насилие в Восточной Европе и Центральной Азии",
        "fr": "Renforcer les réponses du système de santé à la violence sexiste en Europe de l'Est et en Asie centrale",
        "es": "Fortalecimiento de las respuestas del sistema de salud a la violencia de género en Europa del Este y Asia Central",
        "ar": "تعزيز استجابات النظام الصحي للعنف القائم على النوع الاجتماعي في أوروبا الشرقية وآسيا الوسطى",
        "zh": "加强东欧和中亚应对性别暴力的卫生系统"
      },
      "category": {
        "en": "Health-system response",
        "ru": "Реакция системы здравоохранения",
        "fr": "Réponse du système de santé",
        "es": "Respuesta del sistema de salud",
        "ar": "استجابة النظام الصحي",
        "zh": "卫生系统响应"
      },
      "abstract": {
        "en": "A resource package for strengthening health-system responses to gender-based violence in Eastern Europe and Central Asia. It covers survivor-centred care, staff training, safe identification, documentation, referral pathways, risk assessment and coordination between health and support services.",
        "ru": "Ресурсный пакет для усиления мер реагирования системы здравоохранения на гендерное насилие в Восточной Европе и Центральной Азии. Он охватывает уход, ориентированный на выживших, обучение персонала, безопасную идентификацию, документацию, пути направления, оценку рисков и координацию между службами здравоохранения и поддержки.",
        "fr": "Un ensemble de ressources pour renforcer les réponses du système de santé à la violence sexiste en Europe de l'Est et en Asie centrale. Il couvre les soins centrés sur les survivants, la formation du personnel, l'identification sûre, la documentation, les voies d'orientation, l'évaluation des risques et la coordination entre les services de santé et de soutien.",
        "es": "Un paquete de recursos para fortalecer las respuestas del sistema de salud a la violencia de género en Europa Oriental y Asia Central. Cubre la atención centrada en el sobreviviente, la capacitación del personal, la identificación segura, la documentación, las vías de referencia, la evaluación de riesgos y la coordinación entre los servicios de salud y de apoyo.",
        "ar": "حزمة موارد لتعزيز استجابات النظام الصحي للعنف القائم على النوع الاجتماعي في أوروبا الشرقية وآسيا الوسطى. وهو يغطي الرعاية التي تركز على الناجين، وتدريب الموظفين، وتحديد الهوية الآمنة، والتوثيق، ومسارات الإحالة، وتقييم المخاطر والتنسيق بين الخدمات الصحية وخدمات الدعم.",
        "zh": "东欧和中亚加强卫生系统应对基于性别的暴力的资源包。 它涵盖以幸存者为中心的护理、员工培训、安全识别、文件、转诊途径、风险评估以及卫生和支持服务之间的协调。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-04-en.pdf",
      "ru": "/library/library-04-ru.pdf",
      "fr": "/library/library-04-fr.pdf",
      "es": "/library/library-04-es.pdf",
      "ar": "/library/library-04-ar.pdf",
      "zh": "/library/library-04-zh.pdf"
    }
  },
  {
    "id": "seed-library-5",
    "title": "Гендерное насилие в чрезвычайных ситуациях: оперативное руководство",
    "author": "UNICEF · English",
    "date": "2019",
    "category": "Чрезвычайные ситуации",
    "abstract": "Руководство по снижению риска гендерного насилия во время гуманитарных кризисов. Помощь должна быть доступной и конфиденциальной, учитывать мнение женщин и девочек и не зависеть от раскрытия факта насилия.",
    "sourceUrl": "https://www.unicef.org/sites/default/files/2020-05/Gender-Based-Violence-in-Emergencies-Operational-Guide-May-2019.pdf",
    "translations": {
      "title": {
        "en": "Gender-Based Violence in Emergencies: Operational Guide",
        "ru": "Гендерное насилие в чрезвычайных ситуациях: оперативное руководство",
        "fr": "Violence fondée sur le genre en situation d’urgence : guide opérationnel",
        "es": "Violencia de género en emergencias: guía operativa",
        "ar": "العنف القائم على النوع الاجتماعي في حالات الطوارئ: دليل تشغيلي",
        "zh": "紧急情况下的性别暴力：行动指南"
      },
      "category": {
        "en": "Emergencies",
        "ru": "Чрезвычайные ситуации",
        "fr": "Situations d’urgence",
        "es": "Emergencias",
        "ar": "حالات الطوارئ",
        "zh": "紧急情况"
      },
      "abstract": {
        "en": "Guidance for reducing gender-based violence risks in humanitarian emergencies. Services should be accessible, confidential and shaped with women and girls; assistance must never depend on disclosing violence.",
        "ru": "Руководство по снижению риска гендерного насилия во время гуманитарных кризисов. Помощь должна быть доступной и конфиденциальной, учитывать мнение женщин и девочек и не зависеть от раскрытия факта насилия.",
        "fr": "Guide pour réduire les risques de violence fondée sur le genre pendant les crises humanitaires. Les services doivent être accessibles, confidentiels et conçus avec les femmes et les filles ; l’aide ne doit jamais dépendre de la révélation de violences.",
        "es": "Guía para reducir los riesgos de violencia de género durante crisis humanitarias. Los servicios deben ser accesibles, confidenciales y diseñados con mujeres y niñas; la ayuda nunca debe depender de revelar la violencia.",
        "ar": "دليل للحد من مخاطر العنف القائم على النوع الاجتماعي أثناء الأزمات الإنسانية. يجب أن تكون الخدمات متاحة وسرية وأن تُصمَّم بمشاركة النساء والفتيات، وألا تعتمد المساعدة أبداً على الإفصاح عن العنف.",
        "zh": "本指南说明如何在人道危机中降低性别暴力风险。服务应当便捷、保密，并让妇女和女童参与设计；获得援助绝不能以披露暴力经历为条件。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-05-en.pdf",
      "ru": "/library/library-05-ru.pdf",
      "fr": "/library/library-05-fr.pdf",
      "es": "/library/library-05-es.pdf",
      "ar": "/library/library-05-ar.pdf",
      "zh": "/library/library-05-zh.pdf"
    }
  },
  {
    "id": "seed-library-6",
    "title": "Пакет основных услуг для женщин и девочек, переживших насилие",
    "author": "UN Women, UNFPA, WHO, UNDP and UNODC · English",
    "date": "2015",
    "category": "Основные услуги",
    "abstract": "Система согласованной работы медицинских, социальных, полицейских и судебных служб. Качественная помощь должна быть доступной, конфиденциальной и ориентированной на пострадавшую, защищать её достоинство и выбор.",
    "sourceUrl": "https://www.unwomen.org/sites/default/files/Headquarters/Attachments/Sections/Library/Publications/2015/Essential-Services-Package-en.pdf",
    "translations": {
      "title": {
        "en": "Essential Services Package for Women and Girls Subject to Violence",
        "ru": "Пакет основных услуг для женщин и девочек, переживших насилие",
        "fr": "Ensemble de services essentiels pour les femmes et les filles victimes de violence",
        "es": "Paquete de servicios esenciales para mujeres y niñas que sufren violencia",
        "ar": "حزمة الخدمات الأساسية للنساء والفتيات اللواتي يتعرضن للعنف",
        "zh": "面向遭受暴力妇女和女童的基本服务包"
      },
      "category": {
        "en": "Essential services",
        "ru": "Основные услуги",
        "fr": "Services essentiels",
        "es": "Servicios esenciales",
        "ar": "الخدمات الأساسية",
        "zh": "基本服务"
      },
      "abstract": {
        "en": "A framework for coordinated health, social, police and justice services. Quality support should be accessible, confidential and survivor-centred, protect dignity and choice, and use clear referral and accountability arrangements.",
        "ru": "Система согласованной работы медицинских, социальных, полицейских и судебных служб. Качественная помощь должна быть доступной, конфиденциальной и ориентированной на пострадавшую, защищать её достоинство и выбор.",
        "fr": "Cadre de coordination des services de santé, sociaux, policiers et judiciaires. Une aide de qualité doit être accessible, confidentielle et centrée sur la survivante, tout en protégeant sa dignité et ses choix.",
        "es": "Marco de coordinación de los servicios sanitarios, sociales, policiales y judiciales. La atención de calidad debe ser accesible, confidencial y centrada en la sobreviviente, protegiendo su dignidad y sus decisiones.",
        "ar": "إطار لتنسيق الخدمات الصحية والاجتماعية والشرطية والقضائية. يجب أن يكون الدعم الجيد متاحاً وسرياً ومتمحوراً حول الناجية، وأن يحمي كرامتها وخياراتها.",
        "zh": "用于协调医疗、社会、警务和司法服务的框架。高质量支持应当便捷、保密、以幸存者为中心，并保护其尊严与自主选择。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-06-en.pdf",
      "ru": "/library/library-06-ru.pdf",
      "fr": "/library/library-06-fr.pdf",
      "es": "/library/library-06-es.pdf",
      "ar": "/library/library-06-ar.pdf",
      "zh": "/library/library-06-zh.pdf"
    }
  },
  {
    "id": "seed-library-7",
    "title": "Усиление мер по искоренению насилия в отношении женщин и девочек",
    "author": "UN Secretary-General · English",
    "date": "2024",
    "category": "Глобальная политика",
    "abstract": "Обзор ООН достигнутого прогресса и сохраняющихся пробелов. Необходимы более сильная профилактика, законы, услуги для пострадавших, достоверные данные, устойчивое финансирование и ответственность с учётом множественной дискриминации.",
    "sourceUrl": "https://knowledge.unwomen.org/sites/default/files/2024-10/a-79-500-sg-report-ending-violence-against-women-and-girls-2024-en.pdf",
    "translations": {
      "title": {
        "en": "Intensifying efforts to eliminate violence against women and girls",
        "ru": "Усиление мер по искоренению насилия в отношении женщин и девочек",
        "fr": "Intensifier les efforts pour éliminer la violence à l’égard des femmes et des filles",
        "es": "Intensificación de los esfuerzos para eliminar la violencia contra las mujeres y las niñas",
        "ar": "تكثيف الجهود للقضاء على جميع أشكال العنف ضد النساء والفتيات",
        "zh": "加大力度消除一切形式的暴力侵害妇女和女童行为"
      },
      "category": {
        "en": "Global policy",
        "ru": "Глобальная политика",
        "fr": "Politique mondiale",
        "es": "Política mundial",
        "ar": "السياسة العالمية",
        "zh": "全球政策"
      },
      "abstract": {
        "en": "A United Nations review of progress and continuing gaps. It calls for stronger prevention, laws, survivor services, reliable data, sustainable financing and accountability, with attention to women facing multiple forms of discrimination.",
        "ru": "Обзор ООН достигнутого прогресса и сохраняющихся пробелов. Необходимы более сильная профилактика, законы, услуги для пострадавших, достоверные данные, устойчивое финансирование и ответственность с учётом множественной дискриминации.",
        "fr": "Examen des Nations Unies sur les progrès et les lacunes persistantes. Il appelle à renforcer la prévention, les lois, les services aux survivantes, les données fiables, le financement durable et la responsabilité.",
        "es": "Revisión de las Naciones Unidas sobre los avances y las brechas persistentes. Pide reforzar la prevención, las leyes, los servicios para sobrevivientes, los datos fiables, la financiación sostenible y la rendición de cuentas.",
        "ar": "استعراض للأمم المتحدة للتقدم المحرز والفجوات المستمرة. يدعو إلى تعزيز الوقاية والقوانين وخدمات الناجيات والبيانات الموثوقة والتمويل المستدام والمساءلة.",
        "zh": "联合国对现有进展和持续缺口的审查。报告呼吁加强预防、法律、幸存者服务、可靠数据、可持续资金和问责，并关注遭受多重歧视的妇女。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-07-en.pdf",
      "ru": "/library/library-07-ru.pdf",
      "fr": "/library/library-07-fr.pdf",
      "es": "/library/library-07-es.pdf",
      "ar": "/library/library-07-ar.pdf",
      "zh": "/library/library-07-zh.pdf"
    }
  },
  {
    "id": "seed-library-8",
    "title": "Общая рекомендация № 35 о гендерном насилии в отношении женщин",
    "author": "UN Committee on the Elimination of Discrimination against Women · English",
    "date": "2017",
    "category": "Права человека",
    "abstract": "Комитет CEDAW рассматривает гендерное насилие как дискриминацию и нарушение прав человека. Государства должны предотвращать насилие, защищать пострадавших, расследовать нарушения и устранять вредные стереотипы.",
    "sourceUrl": "https://docstore.ohchr.org/SelfServices/FilesHandler.ashx?enc=kLFc7rxtnu51TFh%2BKGEprdNPKFxWmTuNtgahYpRIGhiOW39gItQasN4QdLL0ya1ZR8dOUp%2FDeeRwbA%2FnkwVcsg%3D%3D",
    "translations": {
      "title": {
        "en": "General recommendation No. 35 on gender-based violence against women",
        "ru": "Общая рекомендация № 35 о гендерном насилии в отношении женщин",
        "fr": "Recommandation générale no 35 sur la violence fondée sur le genre à l’égard des femmes",
        "es": "Recomendación general núm. 35 sobre la violencia de género contra la mujer",
        "ar": "التوصية العامة رقم 35 بشأن العنف القائم على النوع الاجتماعي ضد المرأة",
        "zh": "关于基于性别的暴力侵害妇女行为的第35号一般性建议"
      },
      "category": {
        "en": "Human rights",
        "ru": "Права человека",
        "fr": "Droits humains",
        "es": "Derechos humanos",
        "ar": "حقوق الإنسان",
        "zh": "人权"
      },
      "abstract": {
        "en": "CEDAW explains gender-based violence as discrimination and a human-rights violation. States should prevent violence, protect and support survivors, investigate violations, provide remedies and address harmful stereotypes and structural inequality.",
        "ru": "Комитет CEDAW рассматривает гендерное насилие как дискриминацию и нарушение прав человека. Государства должны предотвращать насилие, защищать пострадавших, расследовать нарушения и устранять вредные стереотипы.",
        "fr": "Le Comité CEDAW qualifie la violence fondée sur le genre de discrimination et de violation des droits humains. Les États doivent prévenir la violence, protéger les survivantes, enquêter et combattre les stéréotypes nuisibles.",
        "es": "El Comité CEDAW considera la violencia de género una forma de discriminación y una violación de derechos humanos. Los Estados deben prevenirla, proteger a las sobrevivientes, investigar y combatir los estereotipos dañinos.",
        "ar": "تعتبر لجنة سيداو العنف القائم على النوع الاجتماعي شكلاً من أشكال التمييز وانتهاكاً لحقوق الإنسان. على الدول منع العنف وحماية الناجيات والتحقيق في الانتهاكات ومعالجة القوالب النمطية الضارة.",
        "zh": "消除对妇女歧视委员会将性别暴力视为歧视和侵犯人权。国家应预防暴力、保护和支持幸存者、调查侵害、提供补救并消除有害刻板印象。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-08-en.pdf",
      "ru": "/library/library-08-ru.pdf",
      "fr": "/library/library-08-fr.pdf",
      "es": "/library/library-08-es.pdf",
      "ar": "/library/library-08-ar.pdf",
      "zh": "/library/library-08-zh.pdf"
    }
  },
  {
    "id": "seed-library-9",
    "title": "Как поддержать пострадавшую, если рядом нет специалиста",
    "author": "UNICEF and IASC partners · English",
    "date": "2018",
    "category": "Поддержка пострадавших",
    "abstract": "Слушайте без давления, верьте женщине, защищайте её конфиденциальность, спросите, что ей нужно, и предложите точные варианты помощи. Не расследуйте случившееся, не требуйте подробностей и не направляйте туда, где риск может возрасти.",
    "sourceUrl": "https://www.unicef.org/ukraine/media/22126/file/GBV_PocketGuide021718.pdf",
    "translations": {
      "title": {
        "en": "How to support survivors when a specialist is unavailable",
        "ru": "Как поддержать пострадавшую, если рядом нет специалиста",
        "fr": "Soutenir une survivante lorsqu’aucun spécialiste n’est disponible",
        "es": "Cómo apoyar a una sobreviviente cuando no hay especialistas disponibles",
        "ar": "كيفية دعم الناجيات عند عدم توفر مختص",
        "zh": "在没有专业人员时如何支持幸存者"
      },
      "category": {
        "en": "Supporting survivors",
        "ru": "Поддержка пострадавших",
        "fr": "Soutien aux survivantes",
        "es": "Apoyo a sobrevivientes",
        "ar": "دعم الناجيات",
        "zh": "支持幸存者"
      },
      "abstract": {
        "en": "Listen without pressure, believe the survivor, protect privacy, ask what she needs and share accurate options. Do not investigate, demand details, promise secrecy you cannot keep or refer her to a service that may increase danger.",
        "ru": "Слушайте без давления, верьте женщине, защищайте её конфиденциальность, спросите, что ей нужно, и предложите точные варианты помощи. Не расследуйте случившееся, не требуйте подробностей и не направляйте туда, где риск может возрасти.",
        "fr": "Écoutez sans pression, croyez la survivante, protégez sa vie privée, demandez-lui ce dont elle a besoin et présentez des options fiables. N’enquêtez pas, n’exigez pas de détails et ne l’orientez pas vers un service susceptible d’accroître le danger.",
        "es": "Escuche sin presionar, crea a la sobreviviente, proteja su privacidad, pregunte qué necesita y comparta opciones fiables. No investigue, no exija detalles ni la derive a servicios que puedan aumentar el peligro.",
        "ar": "استمع من دون ضغط، وصدّق الناجية، واحمِ خصوصيتها، واسأل عما تحتاج إليه وقدّم خيارات دقيقة. لا تحقق في الواقعة، ولا تطلب التفاصيل، ولا تحلها إلى خدمة قد تزيد الخطر.",
        "zh": "倾听但不要施压，相信幸存者，保护隐私，询问她需要什么，并提供准确选项。不要自行调查、索要细节、作出无法兑现的保密承诺，也不要转介到可能增加危险的服务。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-09-en.pdf",
      "ru": "/library/library-09-ru.pdf",
      "fr": "/library/library-09-fr.pdf",
      "es": "/library/library-09-es.pdf",
      "ar": "/library/library-09-ar.pdf",
      "zh": "/library/library-09-zh.pdf"
    }
  },
  {
    "id": "seed-library-10",
    "title": "Новые подходы к помощи при гендерном насилии в чрезвычайных ситуациях",
    "author": "UNICEF · English",
    "date": "2020",
    "category": "Экстренные услуги",
    "abstract": "Примеры адаптации помощи во время кризисов и ограничений передвижения. Дистанционная поддержка и незаметное направление к службам могут помочь, но необходимо оценивать цифровые риски, конфиденциальность, доступность и согласие пострадавшей.",
    "sourceUrl": "https://www.unicef.org/media/83381/file/Innovative-GBV-Service-Provision-Emergencies%20.pdf",
    "translations": {
      "title": {
        "en": "Innovative approaches to GBV service provision in emergencies",
        "ru": "Новые подходы к помощи при гендерном насилии в чрезвычайных ситуациях",
        "fr": "Approches innovantes des services liés à la violence fondée sur le genre en situation d’urgence",
        "es": "Enfoques innovadores para prestar servicios sobre violencia de género en emergencias",
        "ar": "أساليب مبتكرة لتقديم خدمات العنف القائم على النوع الاجتماعي في الطوارئ",
        "zh": "紧急情况下提供性别暴力服务的创新方法"
      },
      "category": {
        "en": "Emergency services",
        "ru": "Экстренные услуги",
        "fr": "Services d’urgence",
        "es": "Servicios de emergencia",
        "ar": "خدمات الطوارئ",
        "zh": "紧急服务"
      },
      "abstract": {
        "en": "Examples of adapting gender-based violence services during emergencies and movement restrictions. Remote support, discreet referrals and outreach can help, but every approach must assess digital risks, confidentiality, accessibility and survivor consent.",
        "ru": "Примеры адаптации помощи во время кризисов и ограничений передвижения. Дистанционная поддержка и незаметное направление к службам могут помочь, но необходимо оценивать цифровые риски, конфиденциальность, доступность и согласие пострадавшей.",
        "fr": "Exemples d’adaptation des services pendant les crises et les restrictions de déplacement. Le soutien à distance et les orientations discrètes peuvent aider, mais il faut évaluer les risques numériques, la confidentialité, l’accessibilité et le consentement.",
        "es": "Ejemplos de adaptación de servicios durante crisis y restricciones de movimiento. El apoyo remoto y las derivaciones discretas pueden ayudar, pero deben evaluarse los riesgos digitales, la confidencialidad, la accesibilidad y el consentimiento.",
        "ar": "أمثلة على تكييف الخدمات أثناء الأزمات وقيود الحركة. قد يفيد الدعم عن بُعد والإحالات السرية، لكن يجب تقييم المخاطر الرقمية والسرية وإمكانية الوصول وموافقة الناجية.",
        "zh": "介绍在危机和出行受限期间调整服务的实例。远程支持和谨慎转介可能有帮助，但必须评估数字风险、保密性、可及性和幸存者同意。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-10-en.pdf",
      "ru": "/library/library-10-ru.pdf",
      "fr": "/library/library-10-fr.pdf",
      "es": "/library/library-10-es.pdf",
      "ar": "/library/library-10-ar.pdf",
      "zh": "/library/library-10-zh.pdf"
    }
  },
  {
    "id": "seed-library-11",
    "title": "Виртуальные безопасные пространства для женщин и девочек",
    "author": "UNICEF · English",
    "date": "2023",
    "category": "Цифровая безопасность",
    "abstract": "Виртуальные пространства дают информацию, связь с другими женщинами и направление к службам, когда очная помощь ограничена. Они должны собирать минимум данных, защищать личность, иметь безопасный выход и учитывать контроль устройств.",
    "sourceUrl": "https://www.unicef.org/media/149576/file/Laaha_Infographic.pdf",
    "translations": {
      "title": {
        "en": "Virtual safe spaces for women and girls",
        "ru": "Виртуальные безопасные пространства для женщин и девочек",
        "fr": "Espaces sûrs virtuels pour les femmes et les filles",
        "es": "Espacios seguros virtuales para mujeres y niñas",
        "ar": "مساحات آمنة افتراضية للنساء والفتيات",
        "zh": "妇女和女童的虚拟安全空间"
      },
      "category": {
        "en": "Digital safety",
        "ru": "Цифровая безопасность",
        "fr": "Sécurité numérique",
        "es": "Seguridad digital",
        "ar": "السلامة الرقمية",
        "zh": "数字安全"
      },
      "abstract": {
        "en": "Virtual safe spaces can provide information, peer connection and referrals when physical services are limited. They should minimise data collection, protect identity, offer safe-exit options and account for device monitoring and unequal internet access.",
        "ru": "Виртуальные пространства дают информацию, связь с другими женщинами и направление к службам, когда очная помощь ограничена. Они должны собирать минимум данных, защищать личность, иметь безопасный выход и учитывать контроль устройств.",
        "fr": "Les espaces virtuels peuvent offrir information, soutien entre pairs et orientations lorsque les services en personne sont limités. Ils doivent limiter la collecte de données, protéger l’identité, proposer une sortie sûre et tenir compte de la surveillance des appareils.",
        "es": "Los espacios virtuales pueden ofrecer información, apoyo entre pares y derivaciones cuando los servicios presenciales son limitados. Deben recopilar pocos datos, proteger la identidad, ofrecer una salida segura y considerar la vigilancia de los dispositivos.",
        "ar": "يمكن للمساحات الافتراضية توفير المعلومات والتواصل والإحالات عندما تكون الخدمات الحضورية محدودة. ينبغي تقليل جمع البيانات وحماية الهوية وتوفير خروج آمن ومراعاة مراقبة الأجهزة وعدم تكافؤ الوصول إلى الإنترنت.",
        "zh": "当线下服务受限时，虚拟安全空间可提供信息、同伴联系和转介。设计应尽量少收集数据、保护身份、提供安全退出，并考虑设备监控和互联网接入不平等。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-11-en.pdf",
      "ru": "/library/library-11-ru.pdf",
      "fr": "/library/library-11-fr.pdf",
      "es": "/library/library-11-es.pdf",
      "ar": "/library/library-11-ar.pdf",
      "zh": "/library/library-11-zh.pdf"
    }
  },
  {
    "id": "seed-library-12",
    "title": "Стамбульская конвенция: вопросы и ответы",
    "author": "Council of Europe · English",
    "date": "2019",
    "category": "Правовая основа",
    "abstract": "Конвенция направлена на предотвращение насилия, защиту пострадавших, преследование виновных и согласование государственной политики. Она признаёт насилие в отношении женщин нарушением прав человека и требует недискриминационной помощи.",
    "sourceUrl": "https://rm.coe.int/questions-answers-on-istanbul-convention-eng/16809e40cd",
    "translations": {
      "title": {
        "en": "Istanbul Convention: Questions and Answers",
        "ru": "Стамбульская конвенция: вопросы и ответы",
        "fr": "Convention d’Istanbul : questions et réponses",
        "es": "Convenio de Estambul: preguntas y respuestas",
        "ar": "اتفاقية إسطنبول: أسئلة وأجوبة",
        "zh": "《伊斯坦布尔公约》：问答"
      },
      "category": {
        "en": "Legal framework",
        "ru": "Правовая основа",
        "fr": "Cadre juridique",
        "es": "Marco jurídico",
        "ar": "الإطار القانوني",
        "zh": "法律框架"
      },
      "abstract": {
        "en": "The treaty aims to prevent violence, protect survivors, prosecute perpetrators and coordinate policy. It recognises violence against women as a human-rights issue and requires support without discrimination, while allowing services for all victims of domestic violence.",
        "ru": "Конвенция направлена на предотвращение насилия, защиту пострадавших, преследование виновных и согласование государственной политики. Она признаёт насилие в отношении женщин нарушением прав человека и требует недискриминационной помощи.",
        "fr": "La convention vise à prévenir la violence, protéger les survivantes, poursuivre les auteurs et coordonner les politiques. Elle reconnaît la violence à l’égard des femmes comme une question de droits humains et exige une aide sans discrimination.",
        "es": "El convenio busca prevenir la violencia, proteger a las sobrevivientes, enjuiciar a los agresores y coordinar las políticas. Reconoce la violencia contra las mujeres como una cuestión de derechos humanos y exige apoyo sin discriminación.",
        "ar": "تهدف الاتفاقية إلى منع العنف وحماية الناجيات وملاحقة الجناة وتنسيق السياسات. وتعتبر العنف ضد المرأة قضية حقوق إنسان، وتلزم بتقديم الدعم من دون تمييز.",
        "zh": "该公约旨在预防暴力、保护幸存者、追究施暴者责任并协调政策。它将暴力侵害妇女视为人权问题，并要求提供不受歧视的支持。"
      }
    },
    "pdfUrls": {
      "en": "/library/library-12-en.pdf",
      "ru": "/library/library-12-ru.pdf",
      "fr": "/library/library-12-fr.pdf",
      "es": "/library/library-12-es.pdf",
      "ar": "/library/library-12-ar.pdf",
      "zh": "/library/library-12-zh.pdf"
    }
  }
]
