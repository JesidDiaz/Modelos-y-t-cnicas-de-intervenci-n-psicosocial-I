export type ModuleId = "ibc" | "empoderamiento" | "ecologico" | "redes" | "educacion-popular";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type LearningModule = {
  id: ModuleId;
  number: number;
  unit: number;
  unitTitle: string;
  title: string;
  shortTitle: string;
  accent: string;
  outcome: string;
  priorPrompt: string;
  concepts: { title: string; body: string }[];
  authors: { name: string; contribution: string }[];
  principles: { title: string; body: string }[];
  techniques: { title: string; purpose: string; steps: string[] }[];
  caseStudy: { title: string; context: string; analysis: string[]; decision: string };
  resource: {
    kind: "video" | "reading" | "external";
    title: string;
    prompt: string;
    url: string;
    embedUrl?: string;
    label: string;
  };
  activity: { title: string; instruction: string; prompts: string[] };
  summary: string[];
  quiz: QuizQuestion[];
  references: string[];
};

export const navigation = [
  { id: "inicio", label: "Inicio", unit: 0 },
  { id: "introduccion", label: "Comprender los modelos", unit: 0 },
  { id: "ibc", label: "1. Intervención comunitaria", unit: 1 },
  { id: "empoderamiento", label: "2. Empoderamiento", unit: 1 },
  { id: "ecologico", label: "3. Modelo ecológico", unit: 2 },
  { id: "redes", label: "4. Redes y capital social", unit: 2 },
  { id: "educacion-popular", label: "5. Educación Popular", unit: 3 },
  { id: "cierre", label: "Cierre integrador", unit: 4 },
] as const;

export const units = [
  {
    number: 1,
    title: "Modelos basados en la comunidad",
    description: "La comunidad como sujeto colectivo, productora de saber y agente de transformación.",
    modules: ["Intervención Basada en la Comunidad", "Modelo de Empoderamiento"],
  },
  {
    number: 2,
    title: "Relaciones con el contexto",
    description: "Lecturas multiescalares, vínculos, recursos y redes que sostienen la vida colectiva.",
    modules: ["Modelo ecológico", "Redes comunitarias y capital social"],
  },
  {
    number: 3,
    title: "Modelos basados en la educación",
    description: "Aprendizaje crítico, diálogo de saberes y acción transformadora situada.",
    modules: ["Educación Popular"],
  },
];

export const introduction = {
  question:
    "¿Cómo pueden los modelos y técnicas de intervención psicosocial contribuir a transformar problemáticas sociales de manera participativa, contextualizada y éticamente comprometida?",
  competence:
    "Evaluar fenómenos psicosociales desde un razonamiento científico, interdisciplinario y contextualizado, y convertir esa lectura en decisiones de intervención pertinentes.",
  outcome:
    "Al finalizar, podrás seleccionar, articular y aplicar modelos y técnicas para formular intervenciones que fortalezcan capacidades, vínculos, participación y transformación social.",
  distinctions: [
    {
      term: "Modelo",
      definition: "Marco conceptual, teórico y metodológico que orienta qué observar, cómo explicar una situación y con qué criterios intervenir.",
      question: "¿Desde qué comprensión actuamos?",
    },
    {
      term: "Estrategia",
      definition: "Ruta deliberada que coordina objetivos, actores, tiempos y recursos para avanzar hacia un cambio esperado.",
      question: "¿Cómo organizamos la acción?",
    },
    {
      term: "Técnica",
      definition: "Procedimiento concreto para producir información, facilitar diálogo, fortalecer habilidades o movilizar decisiones.",
      question: "¿Qué hacemos en una situación específica?",
    },
  ],
  interventionVsTraining: [
    {
      title: "Intervención psicosocial",
      text: "Proceso sostenido y situado que modifica relaciones, oportunidades, capacidades y estructuras de poder junto con los actores implicados.",
    },
    {
      title: "Capacitación",
      text: "Acción formativa centrada en adquirir conocimientos o habilidades. Puede ser una técnica dentro de una intervención, pero no la sustituye.",
    },
  ],
  facilitator:
    "El profesional no ocupa el lugar de quien «lleva» soluciones. Facilita análisis, conecta saberes, protege la participación, explicita relaciones de poder y acompaña a la comunidad para que tome decisiones informadas y sostenibles.",
};

export const modules: LearningModule[] = [
  {
    id: "ibc",
    number: 1,
    unit: 1,
    unitTitle: "Modelos basados en la comunidad",
    title: "Intervención Basada en la Comunidad",
    shortTitle: "IBC",
    accent: "comunidad",
    outcome:
      "Aplicar los principios de la IBC para construir una lectura participativa del territorio y formular acciones con la comunidad, no sobre ella.",
    priorPrompt:
      "Piensa en una intervención que haya llegado a una comunidad con una solución ya definida. ¿Qué saberes, actores o relaciones pudo haber dejado fuera?",
    concepts: [
      {
        title: "Comunidad",
        body: "Colectivo dinámico que construye identidad, pertenencia, memoria, relaciones y capacidad de acción. No es solo un lugar: incluye vínculos, conflictos, recursos y proyectos compartidos.",
      },
      {
        title: "Intervención Basada en la Comunidad",
        body: "Proceso horizontal y participativo en el que la comunidad define problemas, produce conocimiento, decide prioridades y conduce transformaciones desde su territorio.",
      },
      {
        title: "Territorio y transformación",
        body: "El territorio es una trama de experiencias, instituciones, desigualdades y recursos. Intervenir supone comprender esa trama y ampliar la capacidad colectiva para actuar sobre ella.",
      },
      {
        title: "Participación sustantiva",
        body: "Participar no es asistir ni validar una decisión ajena. Implica influir en el diagnóstico, la distribución de recursos, la ejecución y la evaluación.",
      },
    ],
    authors: [
      {
        name: "Orlando Fals Borda",
        contribution: "La Investigación-Acción Participativa rompe la distancia entre quien investiga y quienes viven la situación. El sentipensar articula razón, experiencia, afectos y saber popular.",
      },
      {
        name: "Ignacio Martín-Baró",
        contribution: "La Psicología de la Liberación propone desideologizar la realidad, recuperar memoria histórica y orientar el conocimiento hacia las mayorías oprimidas.",
      },
      {
        name: "Maritza Montero",
        contribution: "La psicología social comunitaria latinoamericana enfatiza participación, familiarización, autogestión, fortalecimiento y transformación desde recursos colectivos.",
      },
      {
        name: "Construccionismo social",
        contribution: "Las definiciones de los «problemas» se producen en relaciones y lenguajes. Revisarlas colectivamente abre posibilidades de resignificación y acción.",
      },
    ],
    principles: [
      { title: "Agencia comunitaria", body: "La comunidad es sujeto de decisión y no población beneficiaria pasiva." },
      { title: "Horizontalidad", body: "El saber profesional dialoga con experiencias, memorias y conocimientos locales." },
      { title: "Reflexión–acción", body: "Conocer y transformar forman un ciclo continuo de diagnóstico, acción y aprendizaje." },
      { title: "Recursos colectivos", body: "La lectura incluye capacidades, activos y redes, además de necesidades y riesgos." },
      { title: "Concientización", body: "La experiencia cotidiana se conecta con causas históricas, institucionales y estructurales." },
      { title: "Sostenibilidad", body: "Los cambios se sostienen cuando existen apropiación, capacidades y acuerdos locales." },
    ],
    techniques: [
      {
        title: "Cartografía social",
        purpose: "Representar el territorio desde la percepción colectiva e identificar recursos, riesgos, actores, fronteras y significados.",
        steps: ["Definir el territorio y convocar voces diversas", "Ubicar lugares, relaciones, recursos y tensiones", "Interpretar patrones y ausencias", "Acordar prioridades y registrar hallazgos"],
      },
      {
        title: "Árbol de problemas",
        purpose: "Diferenciar causas directas e indirectas, problema central y consecuencias para evitar diagnósticos superficiales.",
        steps: ["Formular una situación negativa específica", "Rastrear causas y relaciones", "Identificar efectos", "Validar la lógica con actores afectados"],
      },
      {
        title: "Círculo de palabra",
        purpose: "Sostener un diálogo horizontal que ponga en común experiencias, emociones, memorias y acuerdos.",
        steps: ["Disponer un círculo sin barreras", "Acordar escucha y confidencialidad", "Plantear una pregunta detonante", "Cerrar con aprendizajes y compromisos"],
      },
    ],
    caseStudy: {
      title: "Recuperar el parque sin desplazar a quienes lo habitan",
      context: "En un barrio, residentes asocian el parque con consumo de sustancias, inseguridad y deterioro. Jóvenes señalan que es el único lugar de encuentro y que las decisiones se toman sin ellos.",
      analysis: [
        "Una cartografía ubica usos, horarios, actores, recursos y zonas de conflicto.",
        "Un círculo de palabra permite contrastar miedo, estigma, necesidades juveniles y responsabilidades institucionales.",
        "El árbol de problemas conecta iluminación deficiente, escasez de oferta cultural, estigmatización y baja coordinación institucional.",
      ],
      decision: "El plan combina recuperación física, programación juvenil, mediación comunitaria y evaluación participativa del uso del espacio.",
    },
    resource: {
      kind: "reading",
      title: "Lectura situada del territorio",
      prompt: "Antes de leer, identifica qué información solo podría producirse con la comunidad y no desde un escritorio.",
      url: "https://doi.org/10.26820/reciamuc/8.(3).sep.2024.123-132",
      label: "Consultar referencia del sílabo",
    },
    activity: {
      title: "Diseña una cartografía social",
      instruction: "Selecciona un territorio conocido y construye una guía de facilitación que evite hablar por la comunidad.",
      prompts: ["¿Quiénes deben estar representados?", "¿Qué recursos y barreras se mapearán?", "¿Qué pregunta abrirá la interpretación?", "¿Cómo se devolverán y validarán los hallazgos?"],
    },
    summary: [
      "La comunidad es sujeto y productora de conocimiento.",
      "El diagnóstico es participativo, histórico y orientado a recursos.",
      "La técnica debe sostener horizontalidad, diálogo y decisión colectiva.",
      "Pertinencia, cohesión social y sostenibilidad son resultados del modo de trabajar, no adornos finales.",
    ],
    quiz: [
      {
        id: "ibc-1",
        prompt: "¿Qué distingue un diagnóstico participativo?",
        options: ["La aplicación exclusiva de pruebas estandarizadas", "La comunidad interviene en la producción e interpretación de información", "El experto presenta su diagnóstico terminado", "La participación ocurre solo al final"],
        answer: 1,
        explanation: "La participación es sustantiva cuando los actores influyen en qué se pregunta, cómo se interpreta y qué se decide.",
      },
      {
        id: "ibc-2",
        prompt: "En un árbol de problemas, ¿dónde se ubica el desempleo juvenil si contribuye a una situación de violencia?",
        options: ["Como consecuencia", "Como criterio de evaluación", "Como causa", "Como solución"],
        answer: 2,
        explanation: "Si contribuye a producir o mantener el problema central, se analiza como causa y se exploran sus causas subyacentes.",
      },
      {
        id: "ibc-3",
        prompt: "¿Cuál acción es coherente con la IAP?",
        options: ["Investigar sin devolución", "Separar conocimiento y acción", "Definir preguntas y acciones con quienes viven la situación", "Evitar saberes no académicos"],
        answer: 2,
        explanation: "La IAP integra producción colectiva de conocimiento, acción transformadora y reflexión sobre lo realizado.",
      },
      {
        id: "ibc-4",
        prompt: "¿Qué expresa mejor el sentipensar?",
        options: ["Sustituir evidencia por emoción", "Articular análisis, experiencia, afectos y saber territorial", "Evitar el razonamiento técnico", "Tomar decisiones individuales"],
        answer: 1,
        explanation: "Sentipensar no opone razón y emoción; las integra para comprender realidades vividas y actuar con pertinencia.",
      },
      {
        id: "ibc-5",
        prompt: "¿Qué resultado sugiere mayor sostenibilidad?",
        options: ["Dependencia continua del equipo externo", "Actividades numerosas sin acuerdos", "Capacidades locales y mecanismos de decisión que permanecen", "Una campaña breve con alta asistencia"],
        answer: 2,
        explanation: "La sostenibilidad depende de apropiación, capacidades, organización y recursos que continúan después del acompañamiento externo.",
      },
    ],
    references: [
      "Montero, M. (2004). Introducción a la psicología comunitaria: Desarrollo, conceptos y procesos. Paidós.",
      "García Villacis, Z. A., Vidal Intriago, Y. T., Carrera Cuzme, C. E., & Intriago Freire, M. N. (2024). Intervenciones basadas en la comunidad para prevenir la obesidad infantil y la diabetes. RECIAMUC, 8(3), 123–132. https://doi.org/10.26820/reciamuc/8.(3).sep.2024.123-132",
      "Mazzeo, G., & Bendixen, R. (2023). Community-based interventions for childhood trauma: A scoping review. Journal of Child & Adolescent Trauma, 16(1), 1–14.",
    ],
  },
  {
    id: "empoderamiento",
    number: 2,
    unit: 1,
    unitTitle: "Modelos basados en la comunidad",
    title: "Modelo de Empoderamiento",
    shortTitle: "Empoderamiento",
    accent: "empoderamiento",
    outcome:
      "Diseñar una propuesta que amplíe control, opciones, capacidades y participación en los niveles individual, organizacional y comunitario.",
    priorPrompt: "¿Con qué asocias el poder? Distingue entre poder sobre otras personas, poder para actuar, poder con otras y poder interior.",
    concepts: [
      {
        title: "Potenciación",
        body: "Proceso por el que personas, organizaciones y comunidades aumentan control sobre decisiones, recursos y condiciones que afectan su vida.",
      },
      {
        title: "Derechos y opciones",
        body: "No se limita a sentirse capaz. Requiere oportunidades reales, información, derechos exigibles y acceso a espacios de decisión.",
      },
      {
        title: "Carácter multinivel",
        body: "Los cambios individuales dependen de organizaciones y entornos; los cambios comunitarios necesitan capacidades personales, liderazgo compartido y recursos.",
      },
      {
        title: "Proceso y resultado",
        body: "Importa tanto cómo se distribuye la participación durante la intervención como los cambios logrados en control, influencia y calidad de vida.",
      },
    ],
    authors: [
      {
        name: "Julian Rappaport",
        contribution: "Vincula fortalezas y conductas proactivas con cambio social y plantea una política de empoderamiento que reconoce derechos, diversidad de soluciones y control ciudadano.",
      },
      {
        name: "Marc Zimmerman",
        contribution: "Diferencia procesos y resultados de empoderamiento y propone componentes intrapersonal, interaccional y conductual sensibles al contexto y al tiempo.",
      },
      {
        name: "Stephen Fawcett y colaboradores",
        contribution: "Su modelo contextual-conductual conecta barreras y apoyos ambientales, recursos, acciones de influencia y cambios en condiciones de vida.",
      },
      {
        name: "Perspectiva ecológica",
        contribution: "El empoderamiento toma formas distintas según personas y contextos; no puede medirse ni promoverse como una receta universal.",
      },
    ],
    principles: [
      { title: "Autogestión", body: "Capacidad de organizar recursos y conducir acciones sin dependencia permanente del interventor." },
      { title: "Participación democrática", body: "Influencia real sobre reglas, prioridades, presupuesto y evaluación." },
      { title: "Compromiso", body: "Vínculo sostenido entre metas personales, proyecto colectivo y responsabilidades compartidas." },
      { title: "Motivación y eficacia", body: "Percepción fundada de que la acción propia y colectiva puede producir resultados." },
      { title: "Distribución del poder", body: "El proceso revisa quién decide, quién accede a información y quién controla recursos." },
      { title: "Sostenibilidad", body: "Se forman liderazgos, alianzas y capacidades para sostener logros y exigir compromisos." },
    ],
    techniques: [
      {
        title: "Diagnóstico y mapeo de activos",
        purpose: "Reconocer habilidades, organizaciones, espacios, recursos institucionales y conexiones disponibles.",
        steps: ["Inventariar capacidades individuales", "Mapear colectivos y organizaciones", "Identificar activos físicos e institucionales", "Conectar activos con desafíos priorizados"],
      },
      {
        title: "Mapeo de liderazgos",
        purpose: "Identificar liderazgos formales, naturales y de opinión según influencia y disposición frente al proyecto.",
        steps: ["Rastrear nominaciones y observar relaciones", "Estimar influencia sin confundirla con cargo", "Analizar postura: aliada, neutral o resistente", "Definir una estrategia de relación para cada cuadrante"],
      },
      {
        title: "Formación de líderes comunitarios",
        purpose: "Fortalecer gestión, facilitación, rendición de cuentas, relevo y trabajo colaborativo.",
        steps: ["Identificar competencias necesarias", "Aprender sobre problemas reales", "Acompañar la práctica", "Crear mecanismos de relevo y apoyo"],
      },
      {
        title: "Entrenamiento en habilidades sociales",
        purpose: "Desarrollar comunicación asertiva, negociación y defensa de necesidades sin promover adaptación pasiva.",
        steps: ["Elegir una situación diana", "Definir una meta asertiva", "Modelar y ensayar", "Retroalimentar y transferir a la vida cotidiana"],
      },
      {
        title: "Abogacía social",
        purpose: "Organizar acciones colectivas para exigir derechos, influir en decisiones y vigilar compromisos públicos.",
        steps: ["Precisar demanda y marco de derechos", "Mapear poder y aliados", "Construir un mensaje con evidencia", "Incidir, negociar y monitorear"],
      },
    ],
    caseStudy: {
      title: "Jóvenes rurales y acceso a oportunidades",
      context: "Una comunidad reporta deserción escolar y barreras para acceder a atención psicosocial. Existen apoyo mutuo, una biblioteca, docentes comprometidos y liderazgos juveniles informales.",
      analysis: [
        "El diagnóstico de activos evita reducir la comunidad a carencias.",
        "La matriz de liderazgos incorpora voces juveniles y ubica actores institucionales que controlan recursos.",
        "La formación combina gestión de proyectos, habilidades de incidencia y acuerdos de rendición de cuentas.",
      ],
      decision: "El grupo juvenil codiseña una red de mentoría y una agenda de incidencia; la intervención mide participación, acceso a recursos y capacidad de decisión.",
    },
    resource: {
      kind: "video",
      title: "Una experiencia para leer el poder en acción",
      prompt: "Mientras observas, identifica qué capacidades existían, qué barreras cambiaron y quién tomó las decisiones.",
      url: "https://www.youtube.com/watch?v=GYXlCpUX9Eo&ab_channel=TEDxTalks",
      embedUrl: "https://www.youtube-nocookie.com/embed/GYXlCpUX9Eo",
      label: "Abrir en YouTube",
    },
    activity: {
      title: "Matriz de liderazgos",
      instruction: "Ubica actores reales o hipotéticos según influencia y disposición. Después define cómo relacionarte con cada uno sin concentrar el poder.",
      prompts: ["¿Quién tiene legitimidad y quién tiene cargo?", "¿Qué voces influyen pero suelen quedar invisibles?", "¿Cómo dialogar con una resistencia legítima?", "¿Qué mecanismos previenen personalismos?"],
    },
    summary: [
      "Empoderamiento combina control personal con derechos, opciones y participación efectiva.",
      "Opera en niveles individual, organizacional y comunitario que se afectan mutuamente.",
      "Capacidades sin oportunidades estructurales no bastan; acceso sin agencia tampoco.",
      "La sostenibilidad exige liderazgo compartido, recursos, redes e incidencia.",
    ],
    quiz: [
      {
        id: "emp-1",
        prompt: "¿Cuál situación representa mejor empoderamiento comunitario?",
        options: ["El equipo externo decide y capacita", "La comunidad controla decisiones y accede a recursos para sostenerlas", "Las personas expresan satisfacción", "Un líder concentra toda la información"],
        answer: 1,
        explanation: "El empoderamiento requiere influencia real, acceso a recursos y capacidad colectiva para sostener decisiones.",
      },
      {
        id: "emp-2",
        prompt: "¿Qué añade Zimmerman a la comprensión del empoderamiento?",
        options: ["Una medida universal", "La separación del contexto", "Componentes intrapersonal, interaccional y conductual", "La eliminación del nivel organizacional"],
        answer: 2,
        explanation: "Zimmerman propone componentes relacionados y advierte que sus expresiones varían entre personas, contextos y momentos.",
      },
      {
        id: "emp-3",
        prompt: "Un actor tiene alta influencia y rechaza el proyecto. ¿Qué acción inicial es más adecuada?",
        options: ["Excluirlo", "Entregarle la dirección", "Abrir diálogo, comprender intereses y negociar condiciones transparentes", "Ignorar su influencia"],
        answer: 2,
        explanation: "La resistencia debe analizarse; el diálogo y la negociación reducen bloqueos sin ceder el control colectivo.",
      },
      {
        id: "emp-4",
        prompt: "¿Por qué el entrenamiento en habilidades sociales no debe presentarse como adaptación pasiva?",
        options: ["Porque evita toda norma", "Porque busca expresar necesidades, defender derechos y negociar con autonomía", "Porque reemplaza la organización", "Porque solo trabaja comunicación no verbal"],
        answer: 1,
        explanation: "Desde el empoderamiento, las habilidades amplían capacidad de acción y defensa de derechos, no obediencia.",
      },
      {
        id: "emp-5",
        prompt: "¿Qué indicador refleja sostenibilidad?",
        options: ["El profesional sigue tomando todas las decisiones", "La comunidad cuenta con relevo, reglas y alianzas para continuar", "Se realizaron muchos talleres", "Aumentó la visibilidad de un único líder"],
        answer: 1,
        explanation: "El relevo, las reglas compartidas, las alianzas y las capacidades distribuidas permiten sostener el proceso.",
      },
    ],
    references: [
      "Rappaport, J. (1981). In praise of paradox: A social policy of empowerment over prevention. American Journal of Community Psychology, 9(1), 1–25. https://doi.org/10.1007/BF00896357",
      "Zimmerman, M. A. (1995). Psychological empowerment: Issues and illustrations. American Journal of Community Psychology, 23(5), 581–599. https://doi.org/10.1007/BF02506983",
      "Fawcett, S. B., White, G. W., Balcazar, F. E., Suarez-Balcazar, Y., Mathews, R. M., Paine-Andrews, A., Seekins, T., & Smith, J. F. (1994). A contextual-behavioral model of empowerment. American Journal of Community Psychology, 22(4), 471–496. https://doi.org/10.1007/BF02506890",
      "Hombrados, M. I., & Gómez, L. (2001). Potenciación en la intervención comunitaria. Intervención Psicosocial, 10(1), 55–69.",
      "Banda, A., & Morales, M. (2015). Empoderamiento psicológico: Un modelo sistémico con componentes individuales y comunitarios. Revista de Psicología, 33(1), 1–18.",
    ],
  },
  {
    id: "ecologico",
    number: 3,
    unit: 2,
    unitTitle: "Relaciones con el contexto",
    title: "Modelo ecológico de Bronfenbrenner",
    shortTitle: "Modelo ecológico",
    accent: "ecologico",
    outcome:
      "Realizar una lectura persona–contexto que conecte factores de riesgo y protección en micro, meso, exo y macrosistemas para diseñar acciones multinivel.",
    priorPrompt: "Elige una problemática y pregunta: ¿qué explicación perderíamos si solo observáramos a la persona?",
    concepts: [
      { title: "Persona–contexto", body: "El desarrollo y el bienestar emergen de interacciones recíprocas entre personas, relaciones, instituciones, cultura y condiciones materiales." },
      { title: "Microsistema", body: "Entornos de interacción directa: hogar, pares, aula, equipo de trabajo o grupo cotidiano." },
      { title: "Mesosistema", body: "Relaciones entre microsistemas, por ejemplo, coordinación familia–escuela o articulación entre pares y servicios." },
      { title: "Exosistema", body: "Escenarios que afectan a la persona aunque no participe directamente: empleo de cuidadores, medios, decisiones administrativas o disponibilidad de servicios." },
      { title: "Macrosistema", body: "Valores, normas, políticas, desigualdades, imaginarios y estructuras económicas que organizan oportunidades y riesgos." },
      { title: "Cronosistema · ampliación", body: "Permite analizar transiciones vitales y cambios históricos. Complementa los cuatro niveles exigidos y hace visible que los sistemas cambian en el tiempo." },
    ],
    authors: [
      { name: "Urie Bronfenbrenner", contribution: "Propone comprender el desarrollo dentro de sistemas ambientales anidados y relaciones recíprocas, evitando explicaciones aisladas del individuo." },
      { name: "Perspectiva ecológica", contribution: "Un factor no pertenece de forma rígida a un nivel: se clasifica según dónde opera y cómo se conecta con otros sistemas en el caso analizado." },
      { name: "Lectura multiescalar", contribution: "Las problemáticas se mantienen por configuraciones de factores. La intervención busca puntos de cambio coordinados, no una causa única." },
    ],
    principles: [
      { title: "Interdependencia", body: "Un cambio en un sistema puede producir efectos o tensiones en otros." },
      { title: "Reciprocidad", body: "Las personas influyen en sus entornos y estos, a su vez, condicionan posibilidades de acción." },
      { title: "Riesgo y protección", body: "Se analizan exposiciones, recursos y relaciones que aumentan o amortiguan efectos." },
      { title: "Transiciones", body: "Cambios de rol, institución o etapa vital reconfiguran apoyos y demandas." },
      { title: "Equifinalidad", body: "Trayectorias diferentes pueden conducir a resultados semejantes; no existe una única explicación." },
      { title: "Coherencia multinivel", body: "Las acciones deben reforzarse entre sí y evitar mensajes o incentivos contradictorios." },
    ],
    techniques: [
      { title: "Entrevista ecológica", purpose: "Explorar relaciones, entornos, transiciones, barreras y recursos sin reducir la situación a rasgos individuales.", steps: ["Delimitar la situación", "Recorrer niveles y momentos", "Identificar conexiones", "Contrastar con otros actores"] },
      { title: "Mapa de sistemas", purpose: "Representar actores y condiciones por nivel, con flujos de influencia, apoyo y conflicto.", steps: ["Ubicar persona o colectivo", "Clasificar factores", "Trazar relaciones", "Priorizar palancas de cambio"] },
      { title: "Plan multinivel", purpose: "Coordinar acciones directas, relacionales, institucionales y de política o cultura.", steps: ["Definir resultado compartido", "Seleccionar acciones por nivel", "Asignar actores responsables", "Evaluar efectos cruzados"] },
    ],
    caseStudy: {
      title: "Deserción escolar y trabajo adolescente",
      context: "Una estudiante falta con frecuencia porque trabaja para apoyar a su familia. Tiene buen vínculo con una docente, pero horarios rígidos, transporte costoso y estigma hacia estudiantes que trabajan.",
      analysis: [
        "Micro: agotamiento, apoyo familiar y relación con la docente.",
        "Meso: poca coordinación entre familia, escuela y orientación.",
        "Exo: condiciones laborales del hogar, transporte y oferta de apoyos.",
        "Macro: desigualdad, normas escolares y representaciones sobre mérito y trabajo juvenil.",
      ],
      decision: "La respuesta combina acompañamiento, acuerdo familia–escuela, flexibilidad institucional, acceso a apoyos y revisión de prácticas estigmatizantes.",
    },
    resource: {
      kind: "reading",
      title: "Perspectiva ecológica y educación",
      prompt: "Localiza en la lectura un ejemplo de interacción entre niveles y formula una implicación para la intervención.",
      url: "https://dialnet.unirioja.es/servlet/articulo?codigo=3972894",
      label: "Consultar lectura de Gifre y Esteban",
    },
    activity: {
      title: "Clasifica y conecta factores",
      instruction: "Arrastra mentalmente —o selecciona en el explorador— cada factor del caso al nivel donde opera. Después explica al menos dos conexiones entre niveles.",
      prompts: ["¿Qué factor cambia de nivel según cómo se formule?", "¿Qué protección puede amortiguar varios riesgos?", "¿Qué acción aislada sería insuficiente?", "¿Cómo cambia el análisis al incorporar el tiempo?"],
    },
    summary: [
      "La unidad de análisis es la relación persona–contexto.",
      "Micro, meso, exo y macro describen ámbitos de interacción e influencia, no cajas independientes.",
      "Riesgos y protecciones se acumulan, interactúan y cambian con el tiempo.",
      "Una intervención ecológica coordina acciones en varios niveles y evalúa efectos cruzados.",
    ],
    quiz: [
      { id: "eco-1", prompt: "La coordinación entre familia y escuela pertenece principalmente al…", options: ["Microsistema", "Mesosistema", "Exosistema", "Macrosistema"], answer: 1, explanation: "El mesosistema comprende relaciones entre dos o más microsistemas de participación directa." },
      { id: "eco-2", prompt: "Una política de transporte que condiciona la asistencia escolar opera principalmente en el…", options: ["Microsistema", "Mesosistema", "Exosistema", "Solo cronosistema"], answer: 2, explanation: "La decisión administrativa afecta a la estudiante aunque ella no participe directamente en su diseño." },
      { id: "eco-3", prompt: "¿Cuál es una lectura ecológica adecuada?", options: ["Buscar un rasgo individual decisivo", "Sumar factores sin relaciones", "Analizar interacciones entre niveles y tiempo", "Elegir siempre el macrosistema"], answer: 2, explanation: "El enfoque se centra en configuraciones e interacciones, no en listas o determinismos de un solo nivel." },
      { id: "eco-4", prompt: "¿Qué es un factor protector?", options: ["Algo que elimina todo riesgo", "Un recurso o relación que reduce probabilidad o impacto de resultados adversos", "Una característica exclusivamente individual", "Una intervención terminada"], answer: 1, explanation: "Los factores protectores amortiguan riesgos o favorecen respuestas adaptativas; pueden existir en cualquier nivel." },
      { id: "eco-5", prompt: "¿Cómo debe incorporarse el cronosistema en este curso?", options: ["Como reemplazo de los cuatro niveles", "Como ampliación que analiza transiciones y cambios históricos", "Como sinónimo de macrosistema", "No debe aparecer"], answer: 1, explanation: "El cronosistema complementa los cuatro niveles exigidos al introducir la dimensión temporal." },
    ],
    references: [
      "Gifre, M., & Esteban, M. (2012). Consideraciones educativas de la perspectiva ecológica de Urie Bronfenbrenner. Contextos Educativos, 15, 79–92.",
      "Martínez, M., Robles, C., Utria, L., & Amar, J. (2014). Legitimación de la violencia en la infancia: Un abordaje desde el enfoque ecológico de Bronfenbrenner. Psicología desde el Caribe, 31(1), 133–160.",
      "Amar, J., & Martínez, M. (2011). El ambiente imperativo: Un enfoque integral del desarrollo infantil. Editorial Universidad del Norte.",
      "Kim, S., & Main, G. (2017). Comparing child subjective well-being in South Korea and the UK: Testing an ecological systems approach. Child Indicators Research, 10(1), 19–32.",
    ],
  },
  {
    id: "redes",
    number: 4,
    unit: 2,
    unitTitle: "Relaciones con el contexto",
    title: "Redes comunitarias y capital social",
    shortTitle: "Redes y capital social",
    accent: "redes",
    outcome:
      "Analizar vínculos, confianza, reciprocidad y posiciones en una red para fortalecer apoyos, alianzas y capacidad de acción colectiva.",
    priorPrompt: "Si una comunidad tiene muchos recursos, pero sus actores no se conocen ni cooperan, ¿qué capacidad está faltando?",
    concepts: [
      { title: "Red social", body: "Conjunto de actores y relaciones por las que circulan apoyo, información, recursos, normas e influencia." },
      { title: "Red comunitaria", body: "Trama de vínculos formales e informales que conecta personas, colectivos, organizaciones e instituciones alrededor de la vida del territorio." },
      { title: "Capital social", body: "Recursos actuales o potenciales disponibles a través de relaciones, pertenencias, confianza y cooperación. Su distribución puede ser desigual." },
      { title: "Vínculos de unión", body: "Relaciones cercanas que sostienen identidad, cuidado y apoyo cotidiano; pueden volverse cerradas si excluyen otras voces." },
      { title: "Vínculos puente", body: "Conexiones entre grupos distintos que amplían información, oportunidades y cooperación." },
      { title: "Vínculos con instituciones", body: "Relaciones verticales que permiten acceder a decisiones, derechos y recursos, y exigir rendición de cuentas." },
    ],
    authors: [
      { name: "Pierre Bourdieu", contribution: "Entiende el capital social como recursos asociados a la pertenencia a redes duraderas. Invita a preguntar quién accede a esas redes y cómo reproducen o disputan desigualdades." },
      { name: "Robert Putnam", contribution: "Destaca confianza, normas de reciprocidad y redes de participación cívica como condiciones que facilitan cooperación y acción colectiva." },
      { name: "Perspectiva crítica", contribution: "Más conexiones no siempre significan inclusión. Una red puede concentrar poder, bloquear información o reforzar fronteras entre grupos." },
    ],
    principles: [
      { title: "Confianza", body: "Expectativa razonable de cumplimiento, cuidado y previsibilidad construida mediante prácticas, no solo actitudes." },
      { title: "Reciprocidad", body: "Intercambio de apoyos y responsabilidades que puede ser directo o generalizado en el tiempo." },
      { title: "Cooperación", body: "Coordinación de acciones y recursos alrededor de un propósito compartido." },
      { title: "Participación", body: "Presencia e influencia de actores diversos en decisiones y vigilancia de acuerdos." },
      { title: "Redundancia útil", body: "Múltiples rutas de apoyo reducen dependencia de un único nodo." },
      { title: "Equidad relacional", body: "Se revisan centralidades, silencios, barreras de acceso y distribución de beneficios." },
    ],
    techniques: [
      { title: "Mapeo de redes y actores", purpose: "Representar actores, vínculos, flujos, intensidad, confianza y conflictos.", steps: ["Definir propósito y frontera de la red", "Identificar actores con voces diversas", "Caracterizar relaciones y flujos", "Validar el mapa y sus ausencias"] },
      { title: "Análisis de nodos y puentes", purpose: "Reconocer centralidades, actores aislados, intermediarios, cuellos de botella y conexiones potenciales.", steps: ["Ubicar nodos centrales", "Detectar componentes desconectados", "Examinar quién controla información", "Crear puentes sin sobrecargar actores"] },
      { title: "Mesa de alianzas", purpose: "Convertir el mapa en acuerdos concretos de cooperación, responsabilidades y seguimiento.", steps: ["Definir resultado común", "Negociar aportes y límites", "Establecer reglas de decisión", "Monitorear reciprocidad y beneficios"] },
    ],
    caseStudy: {
      title: "Seguridad alimentaria y recursos desconectados",
      context: "El territorio tiene huertas, un comedor comunitario, una escuela, pequeños comercios y un centro de salud, pero funcionan sin coordinación y varias familias no acceden a apoyos.",
      analysis: [
        "El mapa muestra recursos, pero también aislamiento entre la red institucional y liderazgos informales.",
        "Dos lideresas concentran derivaciones y están sobrecargadas: son nodos críticos, no recursos ilimitados.",
        "La escuela puede actuar como puente, mientras el centro de salud debe mejorar información y horarios de acceso.",
      ],
      decision: "La mesa de alianzas crea rutas múltiples de orientación, protocolos de derivación, un fondo de semillas y seguimiento público de compromisos.",
    },
    resource: {
      kind: "reading",
      title: "Capital y pertenencia a redes",
      prompt: "Compara la mirada de Bourdieu sobre acceso a recursos con la atención de Putnam a confianza y participación cívica.",
      url: "https://home.iitk.ac.in/~amman/soc748/bourdieu_forms_of_capital.pdf",
      label: "Abrir lectura de Bourdieu",
    },
    activity: {
      title: "Construye un mapa de red",
      instruction: "Representa una red alrededor de un problema y evita confundir organigrama con relaciones efectivas.",
      prompts: ["¿Qué circula por cada vínculo?", "¿Quién queda aislado o sobrecargado?", "¿Dónde existe confianza sin coordinación formal?", "¿Qué puente ampliaría oportunidades sin concentrar poder?"],
    },
    summary: [
      "Una red se analiza por relaciones y flujos, no solo por una lista de instituciones.",
      "El capital social puede abrir recursos y también reproducir exclusiones.",
      "Confianza, reciprocidad, cooperación y participación se construyen mediante prácticas verificables.",
      "Fortalecer tejido social implica crear puentes, distribuir cargas y acordar rendición de cuentas.",
    ],
    quiz: [
      { id: "red-1", prompt: "¿Qué diferencia un mapa de red de un directorio de actores?", options: ["Incluye más nombres", "Representa relaciones, flujos e intensidad entre actores", "Solo usa instituciones", "Elimina conflictos"], answer: 1, explanation: "La unidad analítica es el vínculo: qué circula, con qué intensidad, bajo qué confianza y con qué efectos." },
      { id: "red-2", prompt: "Un grupo muy unido, pero aislado de oportunidades externas, necesita fortalecer principalmente vínculos…", options: ["De unión", "Puente", "Inexistentes", "Solo familiares"], answer: 1, explanation: "Los vínculos puente conectan grupos diferentes y amplían acceso a información, recursos y alianzas." },
      { id: "red-3", prompt: "¿Qué advertencia aporta Bourdieu?", options: ["Toda red distribuye recursos por igual", "El capital social depende de acceso y pertenencia a redes que pueden reproducir desigualdad", "La confianza no importa", "Las instituciones no forman redes"], answer: 1, explanation: "La pertenencia a redes produce recursos, pero esos recursos y accesos están distribuidos de manera desigual." },
      { id: "red-4", prompt: "¿Qué indica fragilidad de una red?", options: ["Existen varias rutas de apoyo", "Un único nodo concentra información y derivaciones", "Hay vínculos formales e informales", "Se revisan acuerdos"], answer: 1, explanation: "La dependencia de un nodo crea un cuello de botella y aumenta el riesgo de interrupción o captura del proceso." },
      { id: "red-5", prompt: "¿Cuál acción fortalece capital social con equidad?", options: ["Trabajar solo con actores centrales", "Crear puentes, reglas transparentes y acceso de voces periféricas", "Aumentar reuniones sin propósito", "Ocultar conflictos"], answer: 1, explanation: "El fortalecimiento combina conexión, participación diversa, reglas y acceso a recursos; no solo densidad de vínculos." },
    ],
    references: [
      "Bourdieu, P. (1986). The forms of capital. En J. G. Richardson (Ed.), Handbook of theory and research for the sociology of education (pp. 241–258). Greenwood Press.",
      "Putnam, R. D. (2000). Bowling alone: The collapse and revival of American community. Simon & Schuster.",
      "Yin, D., Zhang, X., Zhao, H., & Tang, L. (2024). Predicting scholar potential: A deep learning model on social capital features. Scientometrics, 129, 7851–7879.",
    ],
  },
  {
    id: "educacion-popular",
    number: 5,
    unit: 3,
    unitTitle: "Modelos basados en la educación",
    title: "Educación Popular",
    shortTitle: "Educación Popular",
    accent: "educacion",
    outcome:
      "Aplicar principios y técnicas de Educación Popular para promover concientización, diálogo crítico y acción transformadora en una propuesta psicosocial situada.",
    priorPrompt: "Recuerda una experiencia educativa que haya cambiado la manera de interpretar una situación. ¿Qué la hizo distinta de recibir información?",
    concepts: [
      { title: "Antecedentes", body: "Surge en América Latina desde luchas contra desigualdad y exclusión, y construye herramientas educativas con sectores populares para leer y transformar su realidad." },
      { title: "Formal y no formal", body: "La Educación Popular no se define solo por ocurrir fuera de la escuela. Se distingue por su intencionalidad ético-política, su método dialógico y su vínculo con la acción colectiva." },
      { title: "Educación bancaria", body: "Freire critica la transferencia unilateral que trata a quien aprende como recipiente. Propone problematizar la realidad y producir conocimiento en diálogo." },
      { title: "Leer palabra y mundo", body: "La comprensión crítica conecta textos, lenguaje, experiencia y contexto; pregunta quién nombra la realidad y qué posibilidades de acción quedan abiertas." },
      { title: "Concientización", body: "Proceso de reconocer las raíces históricas y estructurales de la experiencia y asumirse como sujeto capaz de intervenir en ella." },
      { title: "Praxis", body: "Reflexión y acción se alimentan mutuamente: la práctica se analiza, se transforma y vuelve a evaluarse colectivamente." },
    ],
    authors: [
      { name: "Paulo Freire", contribution: "La pedagogía crítica convierte la educación en diálogo, problematización y praxis. Aprendices y educadores son sujetos políticos que leen y transforman el mundo." },
      { name: "Diálogo de saberes", contribution: "No yuxtapone opiniones: confronta experiencias, conocimientos y posiciones de poder para construir comprensiones y decisiones más rigurosas." },
      { name: "Tradición latinoamericana", contribution: "Afirma memoria, identidad y organización de sectores populares, y cuestiona fatalismo, colonialidad y reproducción de desigualdades." },
    ],
    principles: [
      { title: "Intencionalidad emancipadora", body: "La educación busca superar dominación, exclusión e inequidad." },
      { title: "Sujeto colectivo", body: "Los sectores populares fortalecen organización, voz y protagonismo político." },
      { title: "Diálogo crítico", body: "La experiencia se escucha y también se contrasta con evidencia, historia y otras perspectivas." },
      { title: "Construcción colectiva", body: "El conocimiento se produce con preguntas, investigación y sistematización compartida." },
      { title: "Acción transformadora", body: "El aprendizaje se traduce en alternativas, organización, implementación y evaluación." },
      { title: "Ciudadanía crítica", body: "Defensa de derechos, participación y responsabilidad frente al bien común." },
    ],
    techniques: [
      { title: "Codificación y decodificación", purpose: "Partir de una escena, relato o imagen cotidiana para revelar significados, contradicciones y causas.", steps: ["Presentar una situación familiar", "Describir sin explicar de inmediato", "Preguntar por causas y actores", "Reformular el problema y opciones de acción"] },
      { title: "Diálogo de saberes", purpose: "Poner en relación conocimiento experiencial, comunitario, técnico e histórico sin jerarquías automáticas.", steps: ["Explicitar saberes y posiciones", "Buscar acuerdos y tensiones", "Contrastar con evidencia", "Construir una síntesis orientada a la acción"] },
      { title: "Juego con valor pedagógico", purpose: "Ensayar decisiones, hacer visibles relaciones y producir reflexión; no funciona como pausa decorativa.", steps: ["Definir el aprendizaje", "Establecer reglas significativas", "Vivir la experiencia", "Debatir y transferir lo aprendido"] },
      { title: "Diseño metodológico", purpose: "Organizar una secuencia que va de experiencia y problematización a alternativas, planificación y evaluación.", steps: ["Crear confianza y compartir objetivos", "Expresar y priorizar problemas", "Analizar causas y saberes", "Planear, actuar y evaluar"] },
    ],
    caseStudy: {
      title: "Prevención comunitaria del dengue",
      context: "Una campaña informa cómo eliminar criaderos, pero la participación disminuye porque responsabiliza a familias sin analizar agua intermitente, recolección de residuos y capacidad institucional.",
      analysis: [
        "Una codificación parte de escenas cotidianas y evita culpabilizar.",
        "El diálogo conecta saber vecinal, datos sanitarios y decisiones de servicios públicos.",
        "La comunidad prioriza barreras, construye mensajes propios y define responsabilidades diferenciadas.",
      ],
      decision: "El proceso combina acción doméstica, vigilancia comunitaria, acuerdos con instituciones y evaluación de cambios en condiciones y participación.",
    },
    resource: {
      kind: "video",
      title: "¿Qué es Educación Popular?",
      prompt: "Escucha buscando tres rasgos: quién produce conocimiento, cómo se relaciona el aprendizaje con el contexto y qué lugar ocupa la acción.",
      url: "https://www.youtube.com/watch?v=UqxxILMEeX8",
      embedUrl: "https://www.youtube-nocookie.com/embed/UqxxILMEeX8",
      label: "Abrir en YouTube",
    },
    activity: {
      title: "Del relato a la acción",
      instruction: "Elige una situación cotidiana, formula una codificación breve y diseña preguntas que conduzcan de la descripción a la comprensión y la acción.",
      prompts: ["¿Qué está pasando y para quién?", "¿Qué explicaciones parecen naturales pero deben cuestionarse?", "¿Qué saberes necesitan dialogar?", "¿Qué alternativa colectiva puede ponerse a prueba?"],
    },
    summary: [
      "La Educación Popular es una corriente y una práctica intencionada, no una colección de dinámicas.",
      "La crítica a la educación bancaria desplaza la transferencia por problematización y diálogo.",
      "Concientización articula experiencia, historia, poder y capacidad de acción.",
      "La secuencia metodológica parte de la práctica, construye comprensión y regresa a una práctica transformada.",
    ],
    quiz: [
      { id: "ep-1", prompt: "¿Qué caracteriza la educación bancaria?", options: ["Diálogo de saberes", "Transferencia unilateral y memorización", "Acción colectiva", "Problematización del contexto"], answer: 1, explanation: "Freire critica el modelo que deposita contenidos y reduce a quienes aprenden a receptores." },
      { id: "ep-2", prompt: "¿Qué significa leer la palabra y el mundo?", options: ["Separar texto y contexto", "Relacionar lenguaje, experiencia, historia y condiciones sociales", "Abandonar la lectura", "Aceptar una única interpretación"], answer: 1, explanation: "La lectura crítica conecta lo escrito con la realidad en que se produce y con las posibilidades de transformarla." },
      { id: "ep-3", prompt: "¿Cuándo un juego tiene valor pedagógico?", options: ["Cuando entretiene", "Cuando se vincula a un objetivo, se reflexiona y se transfiere a la acción", "Cuando evita el conflicto", "Cuando reemplaza el análisis"], answer: 1, explanation: "La experiencia lúdica requiere intención, reflexión y conexión con la práctica; de lo contrario es decorativa." },
      { id: "ep-4", prompt: "¿Qué diferencia la concientización de recibir información?", options: ["La cantidad de datos", "La conexión entre experiencia, causas estructurales y agencia colectiva", "El uso de tecnología", "La presencia de un experto"], answer: 1, explanation: "Concientizar implica comprender críticamente la situación y asumirse como sujeto de acción, no solo conocer datos." },
      { id: "ep-5", prompt: "¿Cuál secuencia refleja praxis?", options: ["Explicar–memorizar–repetir", "Actuar sin analizar", "Experiencia–reflexión crítica–acción–evaluación", "Diagnóstico experto–instrucción"], answer: 2, explanation: "La praxis integra reflexión y acción en un ciclo donde la práctica se transforma y vuelve a analizarse." },
    ],
    references: [
      "Alforja, C., IMDEC, & Red Alforja. (1992). Técnicas participativas para la educación popular (Tomos I y II). Centro de Estudios y Publicaciones Alforja.",
      "Mejía, M. R. (2016). Diálogo-confrontación de saberes y negociación cultural: Ejes de las pedagogías de la educación popular. Educar em Revista, 61, 37–53.",
      "Sánchez, L., Pérez, D., Alfonso, L., Castro, M., Sánchez, L. M., Van der Stuyft, P., & Kourí, G. (2008). Estrategia de educación popular para promover la participación comunitaria en la prevención del dengue en Cuba. Revista Panamericana de Salud Pública, 24(1), 61–69.",
      "Mariño, G., & Cendales, L. (2004). Educación no formal y educación popular: Hacia una pedagogía del diálogo cultural. Federación Internacional de Fe y Alegría.",
      "Alcaide, J., Verdeja, M., & Inda-Caro, M. (2021). Paulo Freire y la educación popular: La oportunidad de re-pensar y transformar el mundo en el que vivimos. Educação em Foco, 26(especial).",
    ],
  },
];

export const comparisonRows = [
  ["Punto de partida", "El experto define el problema", "El problema se construye y valida colectivamente"],
  ["Conocimiento", "Se privilegia el saber técnico", "Dialogan saber técnico, experiencia y memoria territorial"],
  ["Participantes", "Beneficiarios o receptores", "Actores con capacidad de decisión"],
  ["Solución", "Diseñada antes de entrar al territorio", "Construida, probada y ajustada con la comunidad"],
  ["Evaluación", "Mide cumplimiento externo", "Valora resultados, apropiación, poder y aprendizaje compartido"],
];

export const interventionPhases = [
  { title: "Familiarización", text: "Construir presencia, confianza y comprensión inicial sin prometer soluciones prematuras." },
  { title: "Diagnóstico participativo", text: "Producir e interpretar información con actores diversos, incluyendo recursos y relaciones de poder." },
  { title: "Planificación", text: "Priorizar objetivos, acciones, responsabilidades, recursos e indicadores negociados." },
  { title: "Ejecución", text: "Actuar, documentar decisiones y ajustar la estrategia a partir de retroalimentación." },
  { title: "Evaluación y continuidad", text: "Valorar cambios, efectos no previstos, apropiación, sostenibilidad y nuevos ciclos de acción." },
];

export const ecologicalLevels = [
  { id: "micro", title: "Microsistema", example: "Familia, pares, aula y relaciones cara a cara.", action: "Acompañamiento, habilidades, apoyo cotidiano y cambios en dinámicas directas." },
  { id: "meso", title: "Mesosistema", example: "Relación familia–escuela o coordinación entre grupo y servicio.", action: "Acuerdos interinstitucionales, rutas de comunicación y trabajo entre entornos." },
  { id: "exo", title: "Exosistema", example: "Horarios laborales, transporte, medios y decisiones administrativas.", action: "Gestión de acceso, ajuste de servicios, incidencia organizacional y articulación territorial." },
  { id: "macro", title: "Macrosistema", example: "Normas, políticas, desigualdad, estigma y valores culturales.", action: "Incidencia pública, cambio normativo, comunicación social y transformación de imaginarios." },
];

export const finalQuiz: QuizQuestion[] = [
  {
    id: "final-1",
    prompt: "Una comunidad quiere comprender usos y conflictos de un espacio público desde múltiples voces. ¿Qué combinación es más pertinente para iniciar?",
    options: ["Capacitación y examen", "Cartografía social y círculo de palabra", "Campaña masiva", "Entrevista clínica individual"],
    answer: 1,
    explanation: "La cartografía produce una lectura territorial y el círculo profundiza experiencias y significados en diálogo.",
  },
  {
    id: "final-2",
    prompt: "Un problema depende de relaciones familiares, coordinación escolar, transporte y normas institucionales. ¿Qué modelo organiza mejor la lectura inicial?",
    options: ["Modelo ecológico", "Solo Educación Popular", "Solo habilidades sociales", "Capacitación técnica"],
    answer: 0,
    explanation: "El modelo ecológico permite ubicar influencias en varios niveles y diseñar acciones coordinadas.",
  },
  {
    id: "final-3",
    prompt: "¿Cuándo conviene integrar empoderamiento y redes?",
    options: ["Cuando basta aumentar autoestima", "Cuando se necesitan capacidades, acceso a recursos, alianzas e influencia en decisiones", "Cuando no existen actores colectivos", "Para evitar analizar poder"],
    answer: 1,
    explanation: "Empoderamiento aporta control y agencia; redes muestra relaciones y recursos necesarios para ejercerlos.",
  },
  {
    id: "final-4",
    prompt: "¿Qué principio ético atraviesa los cinco modelos?",
    options: ["Sustituir decisiones comunitarias", "Reconocer dignidad, diversidad, participación y efectos del poder profesional", "Priorizar rapidez sobre consentimiento", "Ocultar conflictos"],
    answer: 1,
    explanation: "Los modelos convergen en participación informada, respeto, justicia y reflexión sobre poder y consecuencias.",
  },
  {
    id: "final-5",
    prompt: "¿Qué diferencia una intervención de una colección de actividades?",
    options: ["La cantidad de talleres", "Una teoría de cambio, secuencia coherente, participación, evaluación y sostenibilidad", "El uso de videos", "La duración de cada sesión"],
    answer: 1,
    explanation: "Las actividades adquieren sentido cuando responden a una lectura, objetivos, relaciones de cambio y criterios de evaluación.",
  },
];

export const modelComparison = [
  { model: "IBC", question: "¿Cómo construimos el cambio con la comunidad?", bestFor: "Diagnóstico participativo, apropiación territorial y acción colectiva.", caution: "Evitar participación simbólica." },
  { model: "Empoderamiento", question: "¿Quién controla decisiones, recursos y opciones?", bestFor: "Agencia, liderazgo compartido, derechos e incidencia.", caution: "No individualizar barreras estructurales." },
  { model: "Ecológico", question: "¿Qué sistemas interactúan en la situación?", bestFor: "Problemas multicausales y planes multinivel.", caution: "No convertir niveles en una lista sin relaciones." },
  { model: "Redes", question: "¿Cómo circulan apoyo, información y poder?", bestFor: "Alianzas, acceso a recursos y tejido social.", caution: "No asumir que toda red es inclusiva." },
  { model: "Educación Popular", question: "¿Cómo leemos y transformamos críticamente la realidad?", bestFor: "Concientización, diálogo de saberes y praxis.", caution: "No reducirla a dinámicas o juegos." },
];

export const glossary = [
  ["Agencia", "Capacidad situada para tomar decisiones y actuar con otros sobre condiciones relevantes."],
  ["Capital social", "Recursos accesibles mediante redes, pertenencias, confianza y cooperación."],
  ["Concientización", "Comprensión crítica de la experiencia, sus raíces históricas y la posibilidad de transformarla."],
  ["Contexto", "Trama dinámica de relaciones, instituciones, cultura, historia y condiciones materiales."],
  ["Empoderamiento", "Proceso y resultado de ampliar control, opciones, recursos, derechos y participación."],
  ["Horizontalidad", "Relación que reconoce saberes diversos y distribuye la capacidad de influir en decisiones."],
  ["Intervención psicosocial", "Proceso situado que articula sujetos, relaciones y estructuras para producir cambio social y bienestar colectivo."],
  ["Praxis", "Ciclo de reflexión y acción transformadora."],
  ["Red comunitaria", "Conjunto de vínculos formales e informales que movilizan apoyo, información, recursos e influencia."],
  ["Sentipensar", "Integración de razón, experiencia, afectos y saber territorial en la comprensión y la acción."],
];
