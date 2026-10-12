// Hardcoded seed stories exported so the admin can read & override them.
export interface SeedStoryRaw {
  id: number
  published: boolean
  title: Record<string, string>
  situation: Record<string, string>
  actions: Record<string, string>
  outcome: Record<string, string>
  tags?: string[]
}

export const PUBLISHED_STORIES: SeedStoryRaw[] = [
  {
    id: 1,
    published: true,
    title: {
      en: 'Escaping with small children',
      ru: 'Побег с маленькими детьми',
      fr: 'Fuir avec de jeunes enfants',
      ar: 'الهروب مع الأطفال الصغار',
      es: 'Escapar con niños pequeños',
      zh: '带着年幼的孩子逃离',
    },
    situation: {
      en: 'My partner became violent after we moved abroad. I had no local friends or access to money and was afraid to leave with two toddlers.',
      ru: 'После переезда за границу партнёр стал агрессивным. Друзей не было, доступа к деньгам тоже, у меня было двое малышей.',
      fr: 'Mon partenaire est devenu violent après notre déménagement à l’étranger. J’avais peur de partir avec deux tout-petits sans amis ni argent local.',
      ar: 'أصبح شريكي عنيفاً بعد انتقالنا للخارج. لم يكن لدي أصدقاء محليون أو مال، وكان لدي طفلان صغيران.',
      es: 'Mi pareja se volvió violenta después de que nos mudamos al extranjero. No tenía amistades locales ni acceso al dinero y temía marcharme con dos niños pequeños.',
      zh: '搬到国外后，我的伴侣开始使用暴力。我在当地没有朋友，也无法支配钱财，还害怕带着两个年幼的孩子离开。',
    },
    actions: {
      en: 'I contacted a shelter from a safe device at a library. It took weeks to arrange a safe exit plan. I copied important papers to a cloud account shared with no one else.',
      ru: 'Связалась с приютом с безопасного устройства в библиотеке. Несколько недель ушло на план побега. Скопировала важные документы в защищённое облако.',
      fr: 'J’ai contacté un refuge depuis un ordinateur de bibliothèque. Il m’a fallu des semaines pour organiser une sortie sûre. J’ai archivé les documents importants sur un cloud anonyme.',
      ar: 'اتصلت بمأوى من جهاز آمن في المكتبة. استغرق الأمر أسابيع لتنظيم خروج آمن. نسخت الوثائق المهمة إلى حساب سحابي آمن.',
      es: 'Contacté con un refugio desde un dispositivo seguro en una biblioteca. Tardé varias semanas en preparar una salida segura y guardé copias de los documentos importantes en una cuenta privada en la nube.',
      zh: '我用图书馆里的安全设备联系了庇护所。制定安全离开的计划花了几周，我还把重要文件复制到只有自己能访问的云端账户中。',
    },
    outcome: {
      en: 'The women’s shelter in Paris provided immediate housing and helped me with legal aid. After six months I found work and stable housing for us.',
      ru: 'Приют в Париже дал жильё и помог с юристом. Через полгода я нашла работу и жильё для нас.',
      fr: 'Le refuge à Paris m’a offert un logement et de l’aide juridique. Six mois plus tard j’avais un emploi et un logement stable.',
      ar: 'قدم المأوى في باريس السكن الفوري والمساعدة القانونية. بعد ستة أشهر وجدت عملاً ومسكناً مستقراً.',
      es: 'El refugio para mujeres de París me dio alojamiento inmediato y asistencia jurídica. Seis meses después encontré trabajo y una vivienda estable para nosotras.',
      zh: '巴黎的妇女庇护所立即为我提供了住所和法律援助。六个月后，我找到了工作，也为我们找到了稳定的住处。',
    },
    tags: ['shelter', 'legal', 'children'],
  },
  {
    id: 2,
    published: true,
    title: {
      en: 'Getting legal protection as an immigrant',
      ru: 'Получение судебной защиты как иммигрантка',
      fr: 'Obtenir une protection juridique en tant qu’immigrante',
      ar: 'الحصول على حماية قانونية كمهاجرة',
      es: 'Obtener protección legal como inmigrante',
      zh: '作为移民获得法律保护',
    },
    situation: {
      en: 'My husband controlled my immigration papers and threatened to have me deported if I reported the violence.',
      ru: 'Муж контролировал мои миграционные документы и угрожал депортацией, если я расскажу о насилии.',
      fr: 'Mon mari contrôlait mes papiers d’immigration et menaçait de me dénoncer si je parlais des violences.',
      ar: 'سيطر زوجي على أوراقي الهجرية وهدد بترحيلي إذا أبلغت عن العنف.',
      es: 'Mi marido controlaba mis documentos de inmigración y amenazaba con hacer que me deportaran si denunciaba la violencia.',
      zh: '丈夫控制着我的移民文件，并威胁说如果我举报暴力行为，就会让我被驱逐出境。',
    },
    actions: {
      en: 'I called a women’s legal help line anonymously from a cafe. They helped me apply for an emergency protection order and a special visa for victims of domestic violence.',
      ru: 'Анонимно позвонила с телефона в кафе в юридическую линию для женщин. Помогли подать на защитный ордер и визу для жертв насилия.',
      fr: 'J’ai appelé anonymement une permanence juridique féminine depuis un café. Ils m’ont aidée à obtenir une ordonnance d’urgence et un visa spécial.',
      ar: 'اتصلت بخط مساعدة قانونية للنساء من مقهى بشكل مجهول. ساعدوني في تقديم طلب أمر حماية طارئ وتأشيرة خاصة لضحايا العنف.',
      es: 'Llamé de forma anónima desde una cafetería a una línea de asistencia jurídica para mujeres. Me ayudaron a solicitar una orden de protección urgente y un visado especial para víctimas de violencia doméstica.',
      zh: '我在一家咖啡馆匿名拨打了妇女法律援助热线。他们帮助我申请紧急保护令和面向家庭暴力受害者的特殊签证。',
    },
    outcome: {
      en: 'I obtained a protection order and independent residency status. With legal support I started divorce proceedings safely.',
      ru: 'Получила защитный ордер и самостоятельный статус резидента. С юридической помощью safely начала развод.',
      fr: 'J’ai obtenu une ordonnance de protection et un titre de séjour indépendant. J’ai pu engager la procédure de divorce.',
      ar: 'حصلت على أمر حماية وإقامة مستقلة. بدأت إجراءات الطلاق بأمان مع الدعم القانوني.',
      es: 'Obtuve una orden de protección y un permiso de residencia independiente. Con apoyo jurídico pude iniciar el divorcio de forma segura.',
      zh: '我获得了保护令和独立居留身份。在法律支持下，我安全地启动了离婚程序。',
    },
    tags: ['legal', 'immigration'],
  },
  {
    id: 3,
    published: true,
    title: {
      en: 'Finding safety when family becomes the threat',
      ru: 'Найти безопасность, когда угрожает семья',
      fr: 'Trouver la sécurité quand la famille devient une menace',
      ar: 'إيجاد الأمان عندما تتحول العائلة إلى تهديد',
      es: 'Encontrar seguridad cuando la familia se convierte en una amenaza',
      zh: '当家人成为威胁时寻找安全',
    },
    situation: {
      en: 'After refusing an arranged marriage my brothers locked me at home and took my phone and passport.',
      ru: 'После отказа от навязанного брака братья заперли меня дома, забрали телефон и паспорт.',
      fr: 'Après avoir refusé un mariage arrangé mes frères m’ont enfermée et pris mon téléphone et mon passeport.',
      ar: 'بعد رفضي لزواج مرتّب، حبسني إخوتي في المنزل وأخذوا هاتفي وجواز سفري.',
      es: 'Después de negarme a un matrimonio concertado, mis hermanos me encerraron en casa y me quitaron el teléfono y el pasaporte.',
      zh: '我拒绝包办婚姻后，兄弟们把我锁在家里，并拿走了我的手机和护照。',
    },
    actions: {
      en: 'I used a neighbour’s phone once to call a crisis line taught in school. They arranged a discreet pickup and temporary safe housing while working with social services and police.',
      ru: 'Однажды позвонила по телефону соседей на горячую линию. Организовали незаметный вывоз и временное безопасное жильё, работали с полицией.',
      fr: 'J’ai utilisé le téléphone d’une voisine pour appeler une ligne d’urgence vue à l’école. Ils ont organisé un ramassage discret et un logement sûr temporaire.',
      ar: 'استخدمت هاتف جارة للاتصال بخط أزمة تعلمته في المدرسة. رتبوا إخراجاً هادئاً وسكناً مؤقتاً آمناً وتعاونوا مع الخدمات الاجتماعية.',
      es: 'Usé una vez el teléfono de una vecina para llamar a una línea de crisis que conocía por la escuela. Organizaron una salida discreta y un alojamiento temporal seguro, en coordinación con los servicios sociales y la policía.',
      zh: '我借用邻居的电话，拨打了学校介绍过的危机热线。他们安排我秘密离开，并提供临时安全住所，同时与社会服务机构和警方合作。',
    },
    outcome: {
      en: 'I was placed in a dedicated shelter for young women at risk and later received educational support and a new ID. Three years later I’m studying and living independently.',
      ru: 'Поместили в специальный приют для девушек в опасности. Получила поддержку в образовании и новые документы. Спустя три года учусь и живу самостоятельно.',
      fr: 'J’ai été placée dans un refuge spécialisé. J’ai reçu une aide éducative et de nouveaux papiers. Trois ans plus tard j’étudie et vis indépendamment.',
      ar: 'وُضعت في مأوى متخصص للشابات المعرضات للخطر. حصلت على دعم تعليمي ووثائق جديدة. بعد ثلاث سنوات أدرس وأعيش باستقلالية.',
      es: 'Me acogieron en un refugio especializado para jóvenes en riesgo y después recibí apoyo educativo y una nueva documentación. Tres años más tarde estudio y vivo de forma independiente.',
      zh: '我被安置在专门帮助处于危险中的年轻女性的庇护所，后来获得了教育支持和新的身份证件。三年后，我正在学习并独立生活。',
    },
    tags: ['psychological', 'shelter'],
  },
]
